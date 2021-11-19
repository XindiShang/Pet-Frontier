let images = [];

function image_select() {
    let image = document.getElementById('image').files; //returns an array
    for (let i = 0; i < image.length; i++) {
        images = [{
            'name': image[i].name,
            'url': URL.createObjectURL(image[i]),
            'file': image[i],
        }]

        document.getElementById('avatarPreviewContainer').innerHTML = image_show();
    }
}


function image_show() {
    let image = "";
    image += `<img src="` + images[0].url + `" alt="Image Preview" class="image-preview__image" id="avatarPreview">`

    return image;
}

function image_reset() {
    let avatar = document.getElementById('avatarPreviewContainer');
    if (avatar.innerHTML === `<img src="` + user.avatar.url.replace('/upload', '/upload/w_100,h_100,c_thumb,g_face,r_max') + `" alt="Image Preview" class="image-preview__image" id="avatarPreview">`) {
        alert('已恢复为初始头像')
    }
    avatar.innerHTML = `<img src="` + user.avatar.url.replace('/upload', '/upload/w_100,h_100,c_thumb,g_face,r_max') + `" alt="Image Preview" class="image-preview__image" id="avatarPreview">`
}