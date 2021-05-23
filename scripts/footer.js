const $footer = document.querySelector('footer');
$footer.classList.add('footer');
$footer.innerHTML = `
<div class="footer__content">
    <div class="footer__brandInfo">
        <img class="footer__icon" src="../.../../resources/icons/jordan-icon.png">
        <p class="footer__descriptionBrand">
            Air Jordan (sometimes abbreviated AJ) is an American brand of basketball shoes, athletic, casual,
            and style clothing produced by Nike. Founded in Chicago, Air Jordan was created for Hall of Fame
            basketball player and six-time NBA Finals MVP Michael Jordan during his time with the Chicago Bulls.
        </p>
    </div>

    <nav class="footer__navBar">

    <a href="./index.html">Home</a>
    <a href="./products.html?newReleases=Yes">New Releases</a>
    <a href="./products.html">Products</a>
   
    </nav>

</div>

<div class="footer__socialMedia">

    <a target="_blank" href="">
        <img class="footer__socialIcon" src="./resources/icons/facebook-icon.png" alt="">
    </a>
    <a target="_blank" href="">
        <img class="footer__socialIcon" src="./resources/icons/instagram-icon.png" alt="">
    </a>
    <a target="_blank" href="">
        <img class="footer__socialIcon" src="./resources/icons/spotify-icon.png" alt="">
    </a>
    <a target="_blank" href="">
        <img class="footer__socialIcon" src="./resources/icons/youtube-icon.png" alt="">
    </a>


</div>
<p class="footer__copyright">
    Copyright 2021, Jordan Corporation. All rights reserved.
</p>
`