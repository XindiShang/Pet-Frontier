
// 1 创建二维数组
const provinces = [];
provinces['安徽省'] = ["合肥市", "安庆市", "蚌埠市", "亳州市", "池州市", "滁州市", "阜阳市", "淮北市", "淮南市", "宿州市", "黄山市", "六安市", "马鞍山市", "铜陵市", "芜湖市", "宣城市"]
provinces['北京'] = ['北京市']
provinces['重庆'] = ['重庆市']
provinces['福建省'] = ['福州市', '龙岩市', '南平市', '宁德市', '莆田市', '泉州市', '三明市', '厦门市', '漳州市']
provinces['甘肃省'] = ["兰州市", "嘉峪关市", "白银市", "天水市", "武威市", "酒泉市", "张掖市", "庆阳市", "平凉市", "定西市", "陇南市", "临夏州", "甘南州"]
provinces['广东省'] = ["广州市", "深圳市", "清远市", "韶关市", "河源市", "梅州市", "潮州市", "汕头市", "揭阳市", "汕尾市", "惠州市", "东莞市", "珠海市", "中山市", "江门市", "佛山市", "肇庆市", "云浮市", "阳江市", "茂名市", "湛江市"]
provinces['广西壮族自治区'] = ["南宁市", "桂林市", "柳州市", "梧州市", "贵港市", "玉林市", "钦州市", "北海市", "防城港市", "崇左市", "百色市", "河池市", "来宾市", "贺州市"]
provinces['贵州省'] = ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节地区", "铜仁地区", "黔东南州", "黔南州", "黔西南州"]
provinces['海南省'] = ["海口市", "三亚市", "三沙市", "儋州市"]
provinces['河北省'] = ["石家庄市", "张家口市", "承德市", "秦皇岛市", "唐山市", "廊坊市", "保定市", "衡水市", "沧州市", "邢台市", "邯郸市"]
provinces['河南省'] = ["郑州市", "开封市", "三门峡市", "洛阳市", "焦作市", "新乡市", "鹤壁市", "安阳市", "濮阳市", "商丘市", "许昌市", "漯河市", "平顶山市", "南阳市", "信阳市", "周口市", "驻马店市", "济源市"]
provinces['黑龙江省'] = ["哈尔滨市", "齐齐哈尔市", "七台河市", "黑河市", "大庆市", "鹤岗市", "伊春市", "佳木斯市", "双鸭山市", "鸡西市", "牡丹江市", "绥化市", "大兴安岭地区"]
provinces['湖北省'] = ["武汉市", "十堰市", "襄樊市", "荆门市", "孝感市", "黄冈市", "鄂州市", "黄石市", "咸宁市", "荆州市", "宜昌市", "随州市", "恩施土家族苗族自治州"]
provinces['湖南省'] = ["长沙市", "张家界市", "常德市", "益阳市", "岳阳市", "株洲市", "湘潭市", "衡阳市", "郴州市", "永州市", "邵阳市", "怀化市", "娄底市", "湘西州"]
provinces['吉林省'] = ["长春市", "白城市", "松原市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "延边州"]
provinces['江苏省'] = ["南京市", "徐州市", "连云港市", "宿迁市", "淮安市", "盐城市", "扬州市", "泰州市", "南通市", "镇江市", "常州市", "无锡市", "苏州市"]
provinces['江西省'] = ["南昌市", "九江市", "景德镇市", "鹰潭市", "新余市", "萍乡市", "赣州市", "上饶市", "抚州市", "宜春市", "吉安市"]
provinces['辽宁省'] = ["沈阳市", "朝阳市", "阜新市", "铁岭市", "抚顺市", "本溪市", "辽阳市", "鞍山市", "丹东市", "大连市", "营口市", "盘锦市", "锦州市", "葫芦岛市"]
provinces['内蒙古自治区'] = ["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "呼伦贝尔市", "鄂尔多斯市", "乌兰察布市", "巴彦淖尔市", "兴安盟", "锡林郭勒盟", "阿拉善盟"]
provinces['宁夏回族自治区'] = ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"]
provinces['青海省'] = ["西宁市", "海东地区", "海北州", "海南州", "黄南州", "果洛州", "玉树州", "海西州"]
provinces['山东省'] = ["济南市", "青岛市", "聊城市", "德州市", "东营市", "淄博市", "潍坊市", "烟台市", "威海市", "日照市", "临沂市", "枣庄市", "济宁市", "泰安市", "莱芜市", "滨州市", "菏泽市"]
provinces['山西省'] = ["太原市", "朔州市", "大同市", "阳泉市", "长治市", "晋城市", "忻州市", "晋中市", "临汾市", "吕梁市", "运城市"]
provinces['陕西省'] = ["西安市", "延安市", "铜川市", "渭南市", "咸阳市", "宝鸡市", "汉中市", "榆林市", "安康市", "商洛市"]
provinces['上海'] = ['上海市']
provinces['四川省'] = ["成都市", "广元市", "绵阳市", "德阳市", "南充市", "广安市", "遂宁市", "内江市", "乐山市", "自贡市", "泸州市", "宜宾市", "攀枝花市", "巴中市", "达州市", "资阳市", "眉山市", "雅安市", "阿坝州", "甘孜州", "凉山州"]
provinces['天津'] = ['天津市']
provinces['西藏自治区'] = ["拉萨市", "那曲地区", "昌都地区", "林芝地区", "山南地区", "日喀则地区", "阿里地区"]
provinces['新疆维吾尔自治区'] = ["乌鲁木齐市", "克拉玛依市", "喀什地区", "阿克苏地区", "和田地区", "吐鲁番地区", "哈密地区", "克孜勒苏柯州", "博尔塔拉州", "昌吉州", "巴音郭楞州", "伊犁州", "塔城地区", "阿勒泰地区"]
provinces['云南省'] = ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "思茅市", "临沧市", "德宏州", "怒江州", "迪庆州", "大理州", "楚雄州", "红河州", "文山州", "西双版纳州"]
provinces['浙江省'] = ["杭州市", "湖州市", "嘉兴市", "舟山市", "宁波市", "绍兴市", "衢州市", "金华市", "台州市", "温州市", "丽水市"]


// 2 获取元素
const provinceVal = document.querySelector('#province')
const cityVal = document.querySelector('#city')


// 3 省份菜单添加选项
if (provinceVal.options.length < 1) {
    provinceVal.add(new Option('请选择', '请选择'))
    for (let province of provinceVal.options) {
        if (province.value === '请选择') {
            province.value = ''
            province.selected = true
            province.disabled = true
        }
    }
}

if (cityVal.options.length < 1) {
    cityVal.add(new Option('请选择', '请选择'))
    for (let city of cityVal.options) {
        if (city.value === '请选择') {
            city.value = ''
            city.selected = true
            city.disabled = true
        }
    }
}

for (let province in provinces) {
    provinceVal.add(new Option(province, province))
}


// 4 根据省份选择城市
provinceVal.onchange = function () {
    const selectedProvince = provinceVal.value
    for (let province in provinces) {
        if (province === selectedProvince) {
            cityVal.options.length = 0
            cityVal.add(new Option('请选择', '请选择'))
            for (let city in provinces[province]) {
                const cityName = provinces[province][city]
                cityVal.add(new Option(cityName, cityName))
            }
            for (let city of cityVal.options) {
                if (city.value === '请选择') {
                    city.value = ''
                    city.disabled = true
                }
            }
        }
    }
}


// map setup
var map = new AMap.Map("container", {
    resizeEnable: true,
    mapStyle: 'amap://styles/macaron',
});

var geocoder = new AMap.Geocoder({
    city: cityVal, 
});

var marker = new AMap.Marker();

const locRes = document.querySelector('#location')
const shopLng = document.querySelector('#hiddenLng')
const shopLat = document.querySelector('#hiddenLat')


function geoCode() {
    var address = locRes.value;
    geocoder.getLocation(address, function (status, result) {
        if (status === 'complete' && result.geocodes.length) {
            var lnglat = result.geocodes[0].location
            marker.setPosition(lnglat);
            map.add(marker);
            map.setFitView(marker);
        } else {
            log.error('根据地址查询位置失败');
        }
    });
}

locRes.onkeydown = function (e) {
    if (e.keyCode === 13) {
        geoCode();
        return false;
    }
    return true;
};

cityVal.addEventListener('change', function (e) {
    geocoder.getLocation(cityVal.value, function (status, result) {
        if (status === 'complete' && result.geocodes.length) {
            var lnglat = result.geocodes[0].location
            map.setCenter(lnglat);
            autoFn()
        } else {
            console.log('根据地址查询位置失败');
        }
    });
})

const autoFn = function () {
     AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
        var autoOptions = {
            city: cityVal.value,
            input: "location"
        }
        var autocomplete = new AMap.Autocomplete(autoOptions)

        var placeSearch = new AMap.PlaceSearch({
            city: cityVal.value,
            map: map
        })
        AMap.event.addListener(autocomplete, 'select', function (e) {
            placeSearch.search(e.poi.name, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    map.clearMap();
                    placeSearch_CallBack(result);
                }
            })
        })
    })
    
}

autoFn();

function placeSearch_CallBack(data) {
    var poiArr = data.poiList.pois;

    shopLng.value = poiArr[0].location.lng
    shopLat.value = poiArr[0].location.lat
    var marker = new AMap.Marker({
        map: map,
        position: poiArr[0].location
    });
    map.setCenter(marker.getPosition());
    var infoWindow = new AMap.InfoWindow({
        isCustom: true, 
        content: createInfoWindow(createTitle(poiArr[0]), createContent(poiArr[0])),
        offset: new AMap.Pixel(16, -45)
    });
    infoWindow.open(map, marker.getPosition());
    marker.on('click', function (e) {
        infoWindow.open(map, marker.getPosition());
    })
}

//实例化信息窗体
function createTitle(poi) { 
    var title = poi.name
    return title;
}

function createContent(poi) { 
    content = [];
    content.push("地址：" + poi.address);
    content.push("电话：" + poi.tel);
    return content.join("<br>");
}

function createInfoWindow(title, content) {
    var info = document.createElement("div");
    info.className = "custom-info input-card content-window-card";
    info.style.width = '100%'

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

