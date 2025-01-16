let toogle = document.querySelector(".tax-toggle");
let tax = document.getElementsByClassName("tax");

toogle.addEventListener("click", () => {
    //console.log(tax);
    //console.log(tax[0].style.display);
    for (e of tax) {
        if (e.style.display != "inline") {
            e.style.display = "inline"
        }
        else {
            e.style.display = "none";
        }
    }
})
