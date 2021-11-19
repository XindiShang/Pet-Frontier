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
    shop.images.forEach(function (img, i) {
        image += `<div class="d-flex mixContainer1 mb-2">
                                    <div class="image_container1 ">
                                        <img src="${img.url.replace('/upload', '/upload/w_200,c_scale')}" class="" alt="">
                                    </div>
                                    <div class="deleteLabel">
                                        <input type="checkbox" id="image-${i}" name="deleteImages[]"
                                            value="${img.filename}">
                                            <label for="image-${i}">删除</label>
                                    </div>  
                        </div>`
    })

    images.forEach((i) => {
        image += `<div class="d-flex mixContainer1 mb-2"><div class="image_container1">
            <img src="`+ i.url + `" alt="image">
      </div><span>`+ i.name + `</span></div>`;
    })

    return image;
}