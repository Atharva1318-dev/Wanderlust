let div = document.querySelector(".edit");
const imgUrl = div.getAttribute('data-bg');
div.style.backgroundImage = `url(${imgUrl})`;