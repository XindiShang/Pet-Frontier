//date footer
document.getElementById("year").innerHTML = new Date().getFullYear();

//submit load spinner
const form = document.querySelector('.validated-form')
const spinner = document.querySelector('#spinnerBox')
if (form) {
    form.addEventListener('submit', function (e) {
        if (form.reportValidity()) {
            spinner.classList.remove('d-none')
        }
    })
}

$(window).on('load', function () {
    $('.loader-wrapper').fadeOut('slow');
})


//lazyload
const lazyImages = document.querySelectorAll('.lazy-load-image')

let imageOptions = {};

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const image = entry.target
        const newURL = image.getAttribute('data-src')
        image.src = newURL
        observer.unobserve(image)

    })
}, imageOptions)


lazyImages.forEach(image => {
    observer.observe(image)
})

$(window).on('load', function () {
    $('.loader-wrapper').fadeOut('slow');
})

// Back to top btn
let topBtn = document.querySelector(".top-btn");
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
window.onscroll = () => window.scrollY > 500 ? topBtn.style.opacity = 1 : topBtn.style.opacity = 0