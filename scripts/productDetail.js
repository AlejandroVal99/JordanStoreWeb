

const params = new URLSearchParams(location.search);
const productId = params.get('id');
 const $productSection = document.querySelector('.productDetail');
/*const $productPrice = document.querySelector('.productDetail__price');
const $productBrand = document.querySelector('.productDetail__brand');
const $productReference = document.querySelector('.productDetail__reference');
const $productDescription= document.querySelector('.productDetail__description'); */



if (!productId) {
    location.href = './products.html';
}

const handleProductResult = (doc) => {
    const data = doc.data();
    if (!data) {
        location.href = './products.html';
    }
    const productImgArray = data.images;
    console.log(productImgArray[0].imgURL);
    $productSection.innerHTML = `
        <div class="productDetail__gallery">
            <img class="productDetail__main" src="${productImgArray[0].imgURL}" alt="">
            <div class="productDetail__slides">
                <img class="productDetail__slide" src="${productImgArray[0].imgURL}" alt="">
                <img class="productDetail__slide" src="${productImgArray[1].imgURL}" alt="">
                <img class="productDetail__slide" src="${productImgArray[2].imgURL}" alt="">
                <img class="productDetail__slide" src="${productImgArray[3].imgURL}" alt="">
            </div>
        </div>
        <div class="productDetail__information">
            <h2 class="productDetail__brand">${data.name}</h2>
            <h3 class="productDetail__reference">${data.model}</h3>
            <h2 class="productDetail__price">$${data.price}.00</h2>
            <p class="productDetail__description">${data.description}</p>
            <p>Select your size:</p>
            <form class="productDetail__selectSize">
               

            </form>
            <button class="productDetail__button hideLoggedAdmin btnAddToCart" >ADD TO CART</button>
            <button class="productDetail__button btnDeleteProductDetail showLoggedAdmin hidden" >DELETE PRODUCT</button>
        </div>
    `
    const $sizesContainer = document.querySelector('.productDetail__selectSize');
    $sizesContainer.innerHTML = '';

    data.sizes.forEach((size,index)=>{
        const sizeCard = document.createElement('div');
        sizeCard.classList.add('sizeCard');

        if(index==0){
            sizeCard.innerHTML=`
          <label class="sizeCard__label">
            <input class="sizeCard__checkbox" checked value="${size}" type="radio" name="sizes" id="">
            <div class="sizeCard__title checkedSize">
              <p>${size}</p>
            </div>
          </label>
        `;
        }else{
            sizeCard.innerHTML=`
            <label class="sizeCard__label">
              <input class="sizeCard__checkbox" checked value="${size}" type="radio" name="sizes" id="">
              <div class="sizeCard__title checkedSize">
                <p>${size}</p>
              </div>
            </label>`
        }
        
        $sizesContainer.appendChild(sizeCard);
    })

    const $btnAddToCart = document.querySelector('.btnAddToCart');
    const $btnDeleteDetail = document.querySelector('.btnDeleteProductDetail');
    

    const $mainImage = document.querySelector(".productDetail__main");
    const $otherImages = document.querySelectorAll(".productDetail__slide");

    $otherImages.forEach(img => {
    const handle_imgGallery = () => {
        console.log('changeImg');
        const imgSrc = img.getAttribute('src');
        console.log(img.getAttribute('src'));
        $mainImage.setAttribute('src', imgSrc);
    }
    img.addEventListener('click', handle_imgGallery);
    });

    $btnAddToCart.addEventListener('click',function(){
        console.log('add to cart')
        if(loggedUser){
            if($sizesContainer.sizes.value){
                let productToCart = {
                    img: productImgArray[0].imgURL,
                    price: data.price,
                    name: data.name,
                    size: $sizesContainer.sizes.value,
                }

                addToMyCart({
                    ...productToCart,
                    id: doc.id,
                  });
            }else{
                //Feedback here
            }
        }else{
            handle_btnOpenModal();
        }
    });

    $btnDeleteDetail.addEventListener('click',function(){
        let productCollection = db.collection('products');
        productCollection.doc(doc.id).delete().then(
            ()=>{
                window.location='./products.html';
            }
        )
    });




};
db.collection('products')
    .doc(productId)
    .get()
    .then(handleProductResult);




//Slides gallery 
