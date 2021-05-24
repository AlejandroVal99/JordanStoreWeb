const $goToReleases = document.querySelector('.newReleases__container');
const $goToModel = document.querySelectorAll('.modelCard');


$goToReleases.addEventListener('click',function(){
    console.log('entre');
    window.location = "./products.html?newReleases=Yes";
})

$goToModel.forEach((elem)=>{

    elem.addEventListener('click',function(){
        let dataModel = elem.getAttribute('data-gomodel');
        
        window.location = `./products.html?model=${dataModel}`;
    })
})