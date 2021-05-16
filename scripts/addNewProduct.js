const $productForm = document.querySelector('.productForm__form');
const $imagesContainer = document.querySelector('.productForm__imagesContainer');

const imagesFiles = [];

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
    console.log($productForm.images.files);
});


$productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const product = {
        name: $productForm.name.value,
        price: parseInt($productForm.price.value),
        description: $productForm.description.value,
        model: $productForm.model.value,
        year: $productForm.year.value
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

    db.collection('products').add(product)
        .then((docRef) => {

            const  imgUploadPromises = [];
            const imgDownloadUrlPromises = [];

            imagesFiles.forEach(function (file) {

                let modelImgPath = product.model;
                let idProductImg = docRef.id;
                let fileNamePath = fiel.name;

                const storageRef = firebase.storage().ref();
                const imageRef = storageRef.child(`products/${modelImgPath}/${idProductImg}/${fileNamePath}`);
                //Obetner imagen
                imgUploadPromises.push(imageRef.put(file));
            });

            Promise.all(imgUploadPromises).then(function(){
                
            })

            /* 
                .then(function (downloadURL) {
                        product.imgeUrl = downloadURL;
                        product.imgRef = snapshot.ref.fullPath;

                    }); 
            */
        })
        .catch((error) => {
            console.log(error);
        })

    console.log(imagesFiles);

    return;




});