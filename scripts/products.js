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
    $btnShowFilters.innerHTML = 'SHOW FILTERS'
}


$btnCloseFiltersMob.addEventListener('click', hanlde_closeFiltersMob);
$btnShowFilters.addEventListener('click', handle_btnShowFilters);
window.addEventListener('resize', handle_reSizeWindow);




//Product list and Filters firebase logic
const $productsList = document.querySelector('.productList');

const handleCollectionResult = (querySnapshot) => {
    
    $productsList.innerHTML = '';
    
    const addProductCard = document.createElement('a');
    addProductCard.classList.add('addNewProductCard');
    addProductCard.classList.add('hidden');
    addProductCard.classList.add('showLoggedAdmin');
    addProductCard.setAttribute('href','./addNewProduct.html');
    addProductCard.innerHTML=`
     <img src="./resources/icons/plus-icon-big.png" alt="">
    <p>ADD NEW PRODUCT</p>
    `
    console.log(addProductCard);
    $productsList.appendChild(addProductCard);
    querySnapshot.forEach(element => {
        
        const data = element.data();
        const productCard = document.createElement('div');
        productCard.classList.add('productCard');

        productCard.innerHTML = `
        <a href="./productDetail.html?id=${element.id}&name=${data.name}">
        <div class="productCard__img">
          <img src="${data.images[0].imgURL}" alt="" class="productCard__image">
        </div>
        <div class="productCard__info">
          <p class="productCard__model">${data.model}</p>
          <h2 class="productCard__name">${data.name}</h2>
          <h3 class="productCard__price">$${data.price}.00</h3>
        </div>
        </a>
        <div class="productCard__adminBar hidden showLoggedAdmin">
            <button class="productCard__btnDeleteProduct">REMOVE</button>
        </div>
        `;

        
        $productsList.appendChild(productCard);

    
        const btnRemoveProduct = productCard.querySelector('.productCard__btnDeleteProduct');

        btnRemoveProduct.addEventListener('click',function(){
            let productCollection = db.collection('products');
            productCollection.doc(element.id).delete().then(()=>{
                location.reload();
            });
            
        })
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
       
    }
 
    if( $filterForm.filterBynewReleases.checked){
        
        productCollection = productCollection.where('newReleases', '==', 'Yes');
    }

    if($filterForm.orderByPriceLow.checked){
        if($filterForm.orderByPriceHigh.checked){
            $filterForm.orderByPriceHigh.checked = false;
            
            productCollection = productCollection.orderBy('price', 'asc');
        }else{
          productCollection = productCollection.orderBy('price', 'asc')  
        };
    }
    if($filterForm.orderByPriceHigh.checked){
        if($filterForm.orderByPriceLow.checked){
            $filterForm.orderByPriceLow.checked= false;
           
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

$btnSubmitFilter.addEventListener('click', function () {
    let productCollection = db.collection('products');
    
    
    //const colors = [];

    const models = [];
    
    $sortFormMob.filterByMode.forEach(function (element) {
        
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
    $btnShowFilters.innerHTML = 'SHOW FILTERS'
});
const params = new URLSearchParams(location.search);
let productCollection = db.collection('products');



if(params.get('newReleases')){
  productCollection = productCollection.where('newReleases', '==', 'Yes');
  $filterForm.filterBynewReleases.checked = true;
  $sortFormMob.filterBynewReleases.checked = true;
}

if(params.get('model')){
    let modelArray = [];
    switch(params.get('model')){
        case 'airjordani':
            modelArray.push("Air Jordan I");
            let input =  $filterForm.filterByModel[0].checked = true;
            
            productCollection = productCollection.where('model', 'in', modelArray);
        break;

        case 'airjordaniii':
            modelArray.push("Air Jordan III");
            $filterForm.filterByModel[1].checked = true;
            productCollection = productCollection.where('model', 'in', modelArray);
        break;

        case 'airjordaniv':
            modelArray.push("Air Jordan IV");
            $filterForm.filterByModel[2].checked = true;
            productCollection = productCollection.where('model', 'in', modelArray);
        break;

        case 'airjordanv':
            modelArray.push("Air Jordan V");
            $filterForm.filterByModel[3].checked = true;
            productCollection = productCollection.where('model', 'in', modelArray);
        break;

    }

  }

productCollection.get().then(handleCollectionResult); 