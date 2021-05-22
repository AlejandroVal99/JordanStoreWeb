console.log('hello');

const params = new URLSearchParams(location.search);
const productId = params.get('id');
const $productSection = document.querySelector('.productDetail');

console.log(params.get('id'), params.get('name'));
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
            <button class="productDetail__button" href="#">ADD TO CART</button>
        </div>
    `
    const $sizesContainer = document.querySelector('.productDetail__selectSize');
    $sizesContainer.innerHTML = '';

    data.sizes.forEach(size=>{
        console.log(size);

        const sizeCard = document.createElement('div');
        sizeCard.classList.add('sizeCard');
        sizeCard.innerHTML=`
          <label class="sizeCard__label">
            <input class="sizeCard__checkbox" value="${size}" type="radio" name="sizes" id="">
            <div class="sizeCard__title checkedSize">
              <p>${size}</p>
            </div>
          </label>
        `;
        $sizesContainer.appendChild(sizeCard);
    })


    const $mainImage = document.querySelector(".productDetail__main");
    const $otherImages = document.querySelectorAll(".productDetail__slide");
    $otherImages.forEach(img => {
    const handle_imgGallery = () => {
        const imgSrc = img.getAttribute('src');
        console.log(img.getAttribute('src'));
        $mainImage.setAttribute('src', imgSrc);
    }

    img.addEventListener('click', handle_imgGallery);
});


};
db.collection('products')
    .doc(productId)
    .get()
    .then(handleProductResult);




//Slides gallery 
