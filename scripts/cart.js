const $cardProductsList = document.querySelector('.myCartProductCard__productContainer');
const $totalSummary = document.querySelector('.myCart__totalProducts span');
const $subTotalSummary = document.querySelector('.myCart__totalProducts span');


let totalCart = 0;

const handleCartResult = (querySnapshot) => {

    $cardProductsList.innerHTML = '';
    querySnapshot.forEach(element => {

        const data = element.data();
        let img = data.img.imgURL;
        const myCartCard = document.createElement('div');
        myCartCard.classList.add('myCartProductCard');

        myCartCard.innerHTML = `
            <div class="myCartProductCard__productContainer">
                <div class="myCartProductCard__containerImg">
                    <img src="${img}" alt="">
                </div>
                <div class="myCartProductCard__containerInfo">
                    <p class="myCartProductCard__name">
                        ${data.name}
                    </p>
                    <p class="myCartProductCard__size">
                        SIZE ${data.size}
                    </p>
                    <p class="myCartProductCard__price">
                        $${data.price}.00
                    </p>
                </div>
            </div>
            <div class="myCartProductCard__editBar">
            
                <button class="myCart__totalProducts">
                    REMOVE
                </button>
            </div>
        `;

        $cardProductsList.appendChild(productCard);

        totalCart += data.price;
        $totalSummary.innerHTML=totalCart;
        $subTotalSummary.innerHTML=totalCart;

        const $btnMyCartRemove = myCartCard.querySelector('.myCart__totalProducts');

        $btnMyCartRemove.addEventListener('click', function(){

        })
    });

}