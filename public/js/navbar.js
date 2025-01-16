let navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.remove('rounded-pill', 'mx-1', 'my-3');
    } else {
        navbar.classList.add('rounded-pill', 'mx-1', 'my-3');
    }
});