const $productForm = document.querySelector('.productForm__form');
const $imagesContainer = document.querySelector('.productForm__imagesContainer');

let imagesFiles = [];

$productForm.images.addEventListener('change', function () {
    let file = $productForm.images.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = function (img) {
        const $newImgPreview = document.createElement('img');
        $newImgPreview.setAttribute('src', img.target.result);
        $imagesContainer.appendChild($newImgPreview);
    }
    reader.readAsDataURL(file);
    imagesFiles.push(file);
   
});

function cleanForm(){
    $productForm.name.value = '';
    $productForm.price.value = '';
    $productForm.description.value = '';
    $productForm.model.value = '';
    $productForm.year.value = '';
    
    $productForm.color.forEach(element => {
        element.checked = false;
    });

    $productForm.size.forEach(element => {
        element.checked = false;
    });
    $productForm.images.value='';
    $imagesContainer.innerHTML='';
    imagesFiles=[];
} 

$productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const product = {
        name: $productForm.name.value,
        price: parseInt($productForm.price.value),
        description: $productForm.description.value,
        model: $productForm.model.value,
        year: $productForm.year.value,
        newReleases: $productForm.newReleases.value,
    }
    product.colors = [];

    $productForm.color.forEach(element => {

        if (element.checked) {
            let colorInfo = element.getAttribute('data-color');
            product.colors.push(colorInfo);
        }
    });
    product.sizes = [];
    $productForm.size.forEach(element => {
        if (element.checked) {
            let sizeInfo = element.getAttribute('data-size');
            product.sizes.push(sizeInfo);
        }
    });
    console.log($productForm);
    
    //Feedback of loader right here
   
    db.collection('products').add(product)
        .then((docRef) => {

            const imgUploadPromises = [];
            const imgDownloadUrlPromises = [];

            imagesFiles.forEach(function (file) {

                let modelImgPath = product.model;
                let idProductImg = docRef.id;
                let fileNamePath = file.name;

                const storageRef = firebase.storage().ref();
                const imageRef = storageRef.child(`products/${modelImgPath}/${idProductImg}/${fileNamePath}`);
                //Obetner imagen
                imgUploadPromises.push(imageRef.put(file));
            });

            Promise.all(imgUploadPromises).then((snapshots) => {
                //URL de descarga

                snapshots.forEach(function (snapshot) {

                    imgDownloadUrlPromises.push(snapshot.ref.getDownloadURL());

                })

                Promise.all(imgDownloadUrlPromises).then(function (downloadURLs) {

                    const images = [];

                    downloadURLs.forEach(function (downloadURL, index) {
                        const imgInfo = {
                            imgURL : downloadURL,
                            imgRef : snapshots[index].ref.fullPath,
                        }

                        images.push(imgInfo);
                    });

                    console.log(downloadURLs);

                    db.collection('products').doc(docRef.id).update({
                        images: images,
                    }).then(function () {
                        //End process feedback here
                        console.log("creates products ready");
                        cleanForm();
                    });
                });
            });
        })
        .catch((error) => {
            console.log(error);
        })

    ;

   
});