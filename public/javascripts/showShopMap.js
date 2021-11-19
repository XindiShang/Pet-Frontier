var map = new AMap.Map("container", {
    resizeEnable: true,
    mapStyle: 'amap://styles/macaron',
});

const icon = new AMap.Icon({
    size: new AMap.Size(40, 40),
    image: '../assets/paw.png',
    imageSize: new AMap.Size(40, 40) 
});


const position = [shop.lng, shop.lat];

const marker = new AMap.Marker({
    icon: icon,
    position: position
});

map.setZoomAndCenter(14, position);
map.add(marker)
map.setFitView(marker);




var infoWindow = new AMap.InfoWindow({
    isCustom: true,  
    content: createInfoWindow(createTitle(shop), createContent(shop)),
    offset: new AMap.Pixel(16, -45)
});

infoWindow.open(map, marker.getPosition());

marker.on('click', function (e) {
    infoWindow.open(map, marker.getPosition());
})


function createTitle(shop) {  
    var title = shop.name
    return title;
}

function createContent(shop) {  
    content = [];
    content.push("地址：" + shop.location);
    content.push("电话：" + shop.tel);
    return content.join("<br>");
}


function createInfoWindow(title, content) {
    var info = document.createElement("div");
    info.className = "custom-info input-card content-window-card";

    var top = document.createElement("div");
    var titleD = document.createElement("div");
    var closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;
    closeX.src = "https://webapi.amap.com/images/close2.gif";
    closeX.onclick = closeInfoWindow;

    top.appendChild(titleD);
    top.appendChild(closeX);
    info.appendChild(top);

    var middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    var bottom = document.createElement("div");
    bottom.className = "info-bottom";
    bottom.style.position = 'relative';
    bottom.style.top = '0px';
    bottom.style.margin = '0 auto';
    var sharp = document.createElement("img");
    sharp.src = "https://webapi.amap.com/images/sharp.png";
    bottom.appendChild(sharp);
    info.appendChild(bottom);
    return info;
}


function closeInfoWindow() {
    map.clearInfoWindow();
}


