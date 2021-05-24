console.log('hello');

const $ordersList = document.querySelector('.orders__products');

const handleOrdersResult = (querySnapshot) => {
    
    $ordersList.innerHTML = '';
    console.log(querySnapshot);
    querySnapshot.forEach(element => {
        
        const data = element.data();
        const orderCard = document.createElement('div');
        orderCard.classList.add('orderCard');
        
        orderCard.innerHTML = `
            <div class="orderCard__infoOrder">
                <h2 class="orderCard__id">ID: ${element.id}</h2>
                <p class="orderCard__nProducts">${data.nproducts} PRODUCTS</p>
            </div>
            <div class="orderCard__userInfo">
                <div>
                    <p class="orderCard__userName">
                        UID:${data.uid}
                    </p>
                    <p class="orderCard__userPhone">
                        ${data.phone}
                    </p>
                </div>
                <p class="orderCard__price">
                    $${data.total}.00
                </p>
            </div>
        `;

        
        $ordersList.appendChild(orderCard);

    
       
    });

}

orderCollection.get().then(handleOrdersResult);