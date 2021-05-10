$btnShowFilters = document.querySelector(".products__btnFilters");
$asideFilters = document.querySelector(".filterSort");
$divProductList=document.querySelector(".productList");

let isOpenFilters=false;
$asideFilters.style.display="none";
function handle_btnShowFilters() {
    if(isOpenFilters){
    $asideFilters.style.display='none';
    $divProductList.style.width='100%';
    }else{
    $asideFilters.style.display='block';
    $divProductList.style.width='75%';
    }
    isOpenFilters=!isOpenFilters;
}

$btnShowFilters.addEventListener('click',handle_btnShowFilters);