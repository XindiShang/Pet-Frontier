
var map = new AMap.Map("container", {
    resizeEnable: true,
    center: [117.27386497563683, 31.872103957545715],
    zoom: 12,
    mapStyle: 'amap://styles/macaron',
});

var style = {
    url: 'assets/paw.png',
    anchor: new AMap.Pixel(6, 6),
    size: new AMap.Size(30, 30)
}

const data = []

for (let shop of shops) {
    data.push({
        lnglat: [shop.lng, shop.lat],
        name: shop.name,
        id: shop._id,
        location: shop.location,
    })
}

var mass = new AMap.MassMarks(data, {
    opacity: 0.8,
    zIndex: 111,
    cursor: 'pointer',
    style: style
});

var marker = new AMap.Marker({content: ' ', map: map});

mass.on('mouseover', function (e) {
    marker.setPosition(e.data.lnglat);

    marker.setLabel({
        offset: new AMap.Pixel(20, 20),  
        content: `<div class='info p-3'>
        <p><strong>${e.data.name}</strong></p>
        <p>地址：${e.data.location}</p>
        <a href="/petshops/${e.data.id}" target="_blank">详情</a>
        </div>` ,
        direction: 'right' 
    })
});

mass.on('click', function (e) {
    marker.setPosition(e.data.lnglat);

    marker.setLabel({
        offset: new AMap.Pixel(20, 20),  
        content: `<div class='info p-3'>
        <p><strong>${e.data.name}</strong></p>
        <p>地址：${e.data.location}</p>
        <a href="/petshops/${e.data.id}" target="_blank">详情</a>
        </div>` ,
        direction: 'right' 
    })
});

map.on('mouseout', function (e) {
    marker.setLabel(null)
})

mass.setMap(map);