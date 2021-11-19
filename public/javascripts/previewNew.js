let images = [];

function image_select() {
    let image = document.getElementById('image').files;
    images = [];
    for (let i = 0; i < image.length; i++) {
        images.push({
            "name": image[i].name,
            "url": URL.createObjectURL(image[i]),
            "file": image[i],
        })
        document.getElementById('imagePreviewContainer1').innerHTML = image_show();
    }

}

function image_show() {
    let image = "";

    images.forEach((i) => {

        image += `<div class="d-flex mixContainer1 mb-2"><div class="image_container1">
             <img src="`+ i.url + `" alt="image">
       </div><span>`+ i.name + `</span></div>`;
    })

    return image;
}


