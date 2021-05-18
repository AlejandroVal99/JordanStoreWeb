//Product list
$productsList = document.querySelector('.productList');

db.collection('products').get()
    .then((querySnapshot) => {
        querySnapshot.forEach(element => {
           
            const data = element.data();
            const productCard = document.createElement('div');
            productCard.classList.add('productCard');

            productCard.innerHTML = `
                <div class="productCard__img">
                    <img src="${data.images[0].imgURL}" alt="" class="productCard__image">
                </div>
                <div class="productCard__info">
                    <p class="productCard__model">${data.model}</p>
                    <h2 class="productCard__name">${data.name}</h2>
                    <h3 class="productCard__price">$${data.price}.00</h3>
                </div>
            `;

            $productsList.appendChild(productCard);
        });
    })


//Filters aside, show, close, firebase logic

$btnShowFilters = document.querySelector(".products__btnFilters");
$asideFilters = document.querySelector(".filterSort");
$asideFiltersMob = document.querySelector(".filterSort--mobile");
$divProductList = document.querySelector(".productList");

let isOpenFilters = false;
let isOpenFiltersMob = false;
$asideFilters.style.display = "none";
$asideFiltersMob.style.display = "none";

function handle_btnShowFilters() {

    if (window.innerWidth <= 600) {

        $asideFilters.style.display = "none";
        $divProductList.style.width = '100%';

        if (!isOpenFiltersMob) {
            $asideFiltersMob.style.display = 'flex';
            $asideFiltersMob.style.position = 'fixed';

        }
    } else {
        if (isOpenFilters) {
            $asideFilters.style.display = 'none';
            $divProductList.style.width = '100%';
            $btnShowFilters.innerHTML='SHOW FILTERS'
        } else {
            $asideFilters.style.display = 'block';
            $divProductList.style.width = '75%';
            $btnShowFilters.innerHTML='HIDE FILTERS'
        }
        isOpenFilters = !isOpenFilters;
    }


    console.log(window.innerWidth);
}

//Handle close mob filters

function handle_reSizeWindow() {

    if (window.innerWidth > 600) {
        $asideFiltersMob.style.display = 'none';
    }

}

$btnShowFilters.addEventListener('click', handle_btnShowFilters);
window.addEventListener('resize', handle_reSizeWindow);