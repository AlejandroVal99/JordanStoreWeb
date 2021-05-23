const $cardProductsList = document.querySelector('.myCart__products');
const $totalSummary = document.querySelector('.myCart__totalProducts span');
const $subTotalSummary = document.querySelector('.myCart__subtotal span');
const $btnGoToCheckout = document.querySelector('.myCart__btnCheckout');


let totalCart = 0;

renderCart = () => {

    $cardProductsList.innerHTML = '';
    if (cart.length == 0) {
        $cardProductsList.innerText = 'No products yet';
    }
    totalCart = 0;
    cart.forEach((data) => {
        console.log(data.id);
        let img = data.img;
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
                   
                    <button class="myCartProductCard__btnRemove">
                        REMOVE
                    </button>
            </div>
        `;

        $cardProductsList.appendChild(myCartCard);

        totalCart += data.price;
        $totalSummary.innerText = totalCart;
        $subTotalSummary.innerText = totalCart;

        const $btnMyCartRemove = myCartCard.querySelector('.myCartProductCard__btnRemove');

        $btnMyCartRemove.addEventListener('click', function () {
            console.log('funciono', data.id);
            cart.splice(cart.indexOf(data), 1);
            changedCard();
            
            $totalSummary.innerText = totalCart;
            $subTotalSummary.innerText = totalCart;
            console.log(totalCart);
        });

    });

}

$btnGoToCheckout.addEventListener('click',function(){

    if(cart.length==0){

        console.log('Agregar Carrito');
    }else{
        window.location='./checkout.html';

    }
} )