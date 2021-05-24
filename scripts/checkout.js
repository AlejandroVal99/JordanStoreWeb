const $checkoutProductsList = document.querySelector('.checkout__summaryList');
const $checkOutSubtotal = document.querySelector('.checkout__totalProducts span');
const $checkOutTotal = document.querySelector('.checkout__total span');
const $checkOutShippingCost = document.querySelector('.checkout__shippingCost span');
const $checkoutForm = document.querySelector('.checkout__form');
const $btnCheckoutConfirm=document.querySelector('.checkout__btnConfirm');
const $checkoutFeedbackMsg = document.querySelector('.checkout__feedbackMsg');

let subtotalCheckout= 0;
let totalCheckout = 0;

renderCart = () => {

    $checkoutProductsList.innerHTML = '';
    
    totalCheckout = 0;
    cart.forEach((data) => {
        
        let img = data.img;
        const checkoutCard = document.createElement('div');
        checkoutCard.classList.add('checkoutCard');

        checkoutCard.innerHTML = `
            <div class="checkoutCard__img">
                <img src="${img}" alt="" class="checkoutCard__image">
            </div>
            <div class="checkoutCard__info">
                <p class="checkoutCard__name">${data.name}</p>
                <h2 class="checkoutCard__size">SIZE ${data.size}</h2>
                <h3 class="checkoutCard__price">$${data.price}.00</h3>
            </div>
        `;

        $checkoutProductsList.appendChild(checkoutCard);

        subtotalCheckout += data.price;
        totalCheckout = subtotalCheckout;
        $checkOutSubtotal.innerText = subtotalCheckout;
        

    });

}

$checkoutForm.addEventListener('change',function(){
    if($checkoutForm.shipping.value){
        totalCheckout = subtotalCheckout;
        switch($checkoutForm.shipping.value){
            case '32':
                totalCheckout += 32;
                $checkOutShippingCost.innerText='32';
                $checkOutTotal.innerText=totalCheckout;
            break;
            case '0':
                $checkOutShippingCost.innerText='0';
                $checkOutTotal.innerText=totalCheckout;
            break;
        }
    }else{

    }
});

$btnCheckoutConfirm.addEventListener('click',function(){

    let address= $checkoutForm.address.value;
    let zipcode=  $checkoutForm.zipCode.value;
    let city= $checkoutForm.city.value;
    let phone=$checkoutForm.phone.value;

    if(address==''  || zipcode=='' || city=='' || phone==''){
        $checkoutFeedbackMsg.style.color='var(--second-red)';
        $checkoutFeedbackMsg.innerText='Fill out all the fields';
        setTimeout(function(){
            $checkoutFeedbackMsg.style.color='var(--main-black)';
            $checkoutFeedbackMsg.innerText = "";
        },2000)
        return;  
    }
  

    const order = {
       
        address: $checkoutForm.address.value,
        zipcode:  $checkoutForm.zipCode.value,
        city: $checkoutForm.city.value,
        phone:$checkoutForm.phone.value,
        total: totalCheckout,
        nproducts: cart.length,
        uid: loggedUser.uid,
      };
  
      orderCollection.add(order)
        .then(function (docRef) {
          console.log(docRef.id);
  
          cartCollection.doc(loggedUser.uid).set({
            cart: [],
          });
  
          window.location = './products.html';
        });
  
      console.log(order);
});