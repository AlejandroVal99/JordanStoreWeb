$btnShowFilters = document.querySelector(".products__btnFilters");
$asideFilters = document.querySelector(".filterSort");
$asideFiltersMob=document.querySelector(".filterSort--mobile");
$divProductList = document.querySelector(".productList");

let isOpenFilters = false;
let isOpenFiltersMob= false;
$asideFilters.style.display = "none";
$asideFiltersMob.style.display="none";

function handle_btnShowFilters() {

    if (window.innerWidth <= 600) {

        $asideFilters.style.display = "none";
        $divProductList.style.width = '100%';

        if(!isOpenFiltersMob){
            $asideFiltersMob.style.display = 'flex';
            $asideFiltersMob.style.position='fixed';
        }
    } else {
        if (isOpenFilters) {
            $asideFilters.style.display = 'none';
            $divProductList.style.width = '100%';
        } else {
            $asideFilters.style.display = 'block';
            $divProductList.style.width = '75%';
        }
        isOpenFilters = !isOpenFilters;
    }


    console.log(window.innerWidth);
}

$btnShowFilters.addEventListener('click', handle_btnShowFilters);