//Filters aside, show, close

const $btnShowFilters = document.querySelector(".products__btnFilters");
const $btnCloseFiltersMob = document.querySelector(".filterSort__btnClose");
const $asideFilters = document.querySelector(".filterSort");
const $asideFiltersMob = document.querySelector(".filterSort--mobile");
const $divProductList = document.querySelector(".productList");

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
            //$asideFiltersMob.style.overflow = 'scroll';
            //document.body.style.overflowY='hidden';
        }
    } else {
        if (isOpenFilters) {
            $asideFilters.style.display = 'none';
            $divProductList.style.width = '100%';
            $btnShowFilters.innerHTML = 'SHOW FILTERS'
        } else {
            $asideFilters.style.display = 'block';
            $divProductList.style.width = '75%';
            $btnShowFilters.innerHTML = 'HIDE FILTERS'
        }
        isOpenFilters = !isOpenFilters;
    }


    console.log(window.innerWidth);
}

//Handle close mob filters

function handle_reSizeWindow() {

    if (window.innerWidth > 600) {
        $asideFiltersMob.style.display = 'none';
        //document.body.style.overflowY='scroll';
    }

}

function hanlde_closeFiltersMob() {
    $asideFiltersMob.style.display = 'none';
}


$btnCloseFiltersMob.addEventListener('click', hanlde_closeFiltersMob);
$btnShowFilters.addEventListener('click', handle_btnShowFilters);
window.addEventListener('resize', handle_reSizeWindow);




//Product list and Filters firebase logic
const $productsList = document.querySelector('.productList');

const handleCollectionResult = (querySnapshot) => {
    console.log(querySnapshot);
    $productsList.innerHTML = '';
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

}


const $filterForm = document.querySelector('.filterForm');
const $sortFormMob = document.querySelector('#sortFormMobile');
const $btnSubmitFilter=document.querySelector('.btn_mobileFormSubmit');



let inputChecked = '';
//console.log($filterFormMob.filterByModel);

//Return default inputs radio
    
$filterForm.filterByColor.forEach(function (element) {
        
        
            
    element.addEventListener('mousedown', function(ev){
        console.log('click', element.value, $filterForm.filterByColor.value, ev.target);
        
        if(element.value == $filterForm.filterByColor.value){
            console.log('false')
            
            setTimeout(() => element.checked = false, 100);
            $filterForm.filterByColor.value='';
        }
    });


});

$filterForm.addEventListener('change', function () {

    let productCollection = db.collection('products');
    const models = [];
    //const colors = [];


    $filterForm.filterByModel.forEach(function (element) {
        
        if (element.checked) {

            models.push(element.getAttribute('data-model'));
          
        }
    })

    console.log($filterForm.filterByModel);
    
    if (models.length > 0) {

        console.log(models);
        productCollection = productCollection.where('model' , 'in' , models);
    }
    
    console.log($filterForm.filterByColor.value);
    if($filterForm.filterByColor.value != ''){
        let colorFilter =  $filterForm.filterByColor.value;
        
        productCollection = productCollection.where('colors', 'array-contains', colorFilter);
    }else{
        productCollection = db.collection('products');
    }
 
    if( $filterForm.filterBynewReleases.checked){
        
        productCollection = productCollection.where('newReleases', '==', 'Yes');
    }

    if($filterForm.orderByPriceLow.checked){
        if($filterForm.orderByPriceHigh.checked){
            $filterForm.orderByPriceHigh.checked = false;
            productCollection = db.collection('products');
            productCollection = productCollection.orderBy('price', 'asc');
        }else{
          productCollection = productCollection.orderBy('price', 'asc')  
        };
    }
    if($filterForm.orderByPriceHigh.checked){
        if($filterForm.orderByPriceLow.checked){
            $filterForm.orderByPriceLow.checked= false;
            productCollection = db.collection('products');
            productCollection = productCollection.orderBy('price', 'desc');
        }else{
             productCollection = productCollection.orderBy('price', 'desc');
        }
       
    }
    if($filterForm.orderByYear.checked){
        productCollection = productCollection.orderBy('year', 'desc');
    }

    productCollection.get().then(handleCollectionResult);
});


//Return default inputs radio
$sortFormMob.filterByColor.forEach(function (element) {
        
        
            
    element.addEventListener('mousedown', function(ev){
        console.log('click', element.value, $sortFormMob.filterByColor.value, ev.target);
        
        if(element.value == $sortFormMob.filterByColor.value){
            console.log('false')
            
            setTimeout(() => element.checked = false, 100);
            $sortFormMob.filterByColor.value='';
        }
    });


});

$sortFormMob.addEventListener('change', function () {
    
}); 

$btnSubmitFilter.addEventListener('click', function () {D
    let productCollection = db.collection('products');
    
    //const colors = [];

    const models = [];
    
    $sortFormMob.filterByModel.forEach(function (element) {
        
        if (element.checked) {

            models.push(element.getAttribute('data-model'));
            console.log(element);
        }
    })
    if (models.length > 0) {
       
        productCollection = productCollection.where('model', 'in', models);
        console.log(models);
    }
    
    
    
    if($sortFormMob.filterByColor.value != ''){
        let colorFilter =  $sortFormMob.filterByColor.value;
        console.log(colorFilter);
        productCollection = productCollection.where('colors', 'array-contains', colorFilter);
    }else{
        productCollection = db.collection('products');
    }
   
 
    if( $sortFormMob.filterBynewReleases.checked){
        
        productCollection = productCollection.where('newReleases', '==', 'Yes');
    }

    if($sortFormMob.orderByPriceLow.checked){
          productCollection = productCollection.orderBy('price', 'asc')  
    }
    if($sortFormMob.orderByPriceHigh.checked){
        
            productCollection = productCollection.orderBy('price', 'desc');
       
    }
    if($sortFormMob.orderByYear.checked){
        productCollection = productCollection.orderBy('year', 'desc');
    }

    productCollection.get().then(handleCollectionResult);
    $asideFiltersMob.style.display = 'none';
});

let productCollection = db.collection('products');
productCollection.get().then(handleCollectionResult);