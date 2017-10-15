import { Links } from '/imports/api/links/links.js';
import { TOKEN, MultiData, Config } from '/imports/api/links/collections.js';
import { Meteor } from 'meteor/meteor';
import './info.html';

let configTime;
let quota;
let images;
let style;
let data;

const second = 1000;
let timeShowData;
let timeNextImage;
let showMoreDataInterval = [];
let timeShowQuota = []; //minute

let totalTime;
let slideIndex = 0;
let quotaIndex = 0;
let timeSlide= null;
let timeQuota= null;
let timeData = null;

let flag = 0;

Template.info.onCreated(() => {
    Meteor.subscribe('links.all');
    Meteor.subscribe('config.all');
    Meteor.subscribe('multiData.all');
    Meteor.call('get.multiData');
});
Template.info.helpers({
    init() {

        const TIME_CONST = 4; // 4second
        let dataDb = MultiData.find().fetch();
        let configTimeDb = Config.find({ name: 'time' }).fetch();
        let quotaDb = Config.find({ name: 'quotation' }).fetch();
        let imagesDb = Config.find({ name: 'image' }).fetch();
        let styleDb = Config.find({ name: 'background' }).fetch();



        if (configTimeDb.length !== 0 &&
            quotaDb.length !== 0 &&
            imagesDb.length !== 0 &&
            styleDb.length !== 0 &&
            dataDb.length !== 0 ){

            configTime = configTimeDb[0].query;
            quota = quotaDb[0].query;
            images = imagesDb[0].query;
            style = styleDb[0].query;
            data = dataDb[0];

            let minute = configTime.time[0].timeShowData;
            let timeNextSlide = configTime.time[0].timeNextSlide; // second
            totalTime = totalTime1(images, configTime, quota) - TIME_CONST; // seconds;
            // console.log(totalTime);
            if (style.fimoIcon) document.getElementById('fimoLogo').src = style.fimoIcon;
            if (style.backgroundImage) {
                configColor(configTime.changeColor, style.backgroundImage);
            }
            else {
                configColor(configTime.changeColor);
            }
            images.info.forEach((item, index) => {
                if(item)
                    createImage(item);
            });
            quota.quotation.forEach((item, index) => {
                if(item){
                    createQuota(item);
                    timeShowQuota[index] = item.timeShow; // minute
                    // console.log(item.timeShow);
                }
            });

            timeShowData = minute*60*second;
            timeNextImage = timeNextSlide*second;

            showData();


            data.data.sort((a,b) => {
                let aStart = new Date(a.start).getTime();
                let bStart = new Date(b.start).getTime();
                let aEnd = new Date(a.end).getTime();
                let bEnd = new Date(b.end).getTime();
                return aStart - bStart || aEnd - bEnd;
            });
            loadDoc(data);

            // console.log(configTime.changeColor);
            let timeCurrent = new Date().getTime();
            document.addEventListener("mousemove",(e)=> {
                timeCurrent = new Date().getTime();
                // console.log(timeCurrent);
            });
            // console.log(window.location);
            function refresh() {
                if(new Date().getTime() - timeCurrent >= totalTime*second - 5*second){
                    window.location.href = `${window.location.origin}`;
                    // console.log("refresh");
                }
                else
                    setTimeout(refresh, 5*second);
            }
            setTimeout(refresh, 5*second);
        }
    },
});

Template.info.onRendered(() => {
    document.title = "Home";
    initLocalClocks();
    let monday = new Date();
    monday = new Date(monday.setDate(monday.getDate() - monday.getDay() + 1));
    let saturday = new Date();
    saturday = new Date(saturday.setDate(saturday.getDate() - saturday.getDay() + 7));
    let html = '<span class="glyphicon glyphicon-calendar"></span> LỊCH CÔNG TÁC: (Tuần ' + monday.getDate() + '/' + (monday.getMonth()+1) + '~'+ saturday.getDate() + '/' + (saturday.getMonth()+1) + '/' + saturday.getFullYear() + ')';
    document.getElementById('titleContent').innerHTML = html;

});

function formatDateToHour(d){
    let minute = d.getMinutes();
    let hour = d.getHours();
    return (hour >= 10 ? hour: ("0" + hour)) + ":" + (minute >= 10 ? minute: ("0" + minute));
}
function appendHtml(el, str) {
    let div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
    }
}
function setVal(el, str){
    el.textContent = str;
}
function createRow(data) {
    // let marquee = document.createElement('marquee');
    let date_start = new Date(data.start);
    let date_end = new Date(data.end);
    let content = data.title;
    let place = (data.place ? data.place: "") ;
    let row = document.createElement('tr');
    let col_day = document.createElement('td'),
        col_content = document.createElement('td'),
        col_time_start = document.createElement('td'),
        col_time_end = document.createElement('td'),
        col_place = document.createElement('td');

    col_day.className += ' col-day col-sm-1 col-lg-1';
    col_time_start.className += ' col-hour-start col-sm-1 col-lg-1';
    col_time_end.className += ' col-hour-end col-sm-1 col-lg-1';
    col_content.className += ' col-sm-4 col-lg-4';
    col_place.className += ' col-sm-2 col-lg-2';

    row.appendChild(col_day); row.appendChild(col_content); row.appendChild(col_time_start);
    row.appendChild(col_time_end); row.appendChild(col_place);

    // col_day.innerHTML = (date_start.getDate() == date_end.getDate() ?
    // 	(date_start.getDate() + '/' + (date_start.getMonth()+1) + '/' + date_start.getFullYear()) :
    // 	(date_start.getDate() + '/' + (date_start.getMonth()+1) + '/' + date_start.getFullYear() + '\n' +
    // 		date_start.getDate() + '/' + (date_start.getMonth()+1) + '/' + date_start.getFullYear())
    // );

    col_day.innerHTML = (date_start.getDate() == date_end.getDate() ?
            (date_start.getDate() + '/' + (date_start.getMonth()+1)) :
            (date_start.getDate() + '/' + (date_start.getMonth()+1) + '~' +
                date_end.getDate() + '/' + (date_end.getMonth()+1))
    );
    col_content.innerHTML = content;
    col_time_start.innerHTML = formatDateToHour(date_start);
    col_time_end.innerHTML = formatDateToHour(date_end);
    col_place.innerHTML = place;
    let table = document.getElementById("contentTable");
    // marquee.appendChild(row)
    // marquee.direction = "up";
    table.appendChild(row);
}

function showMoreData(data, showMoreDataInterval) {
    showMoreDataInterval = [];
    let i = -1;
    let moreData = [];
    data.data.forEach((item, index) => {
        if(index%7 === 0) {
            i++;
            moreData[i] = [];
        }
        moreData[i].push(item);
    });
    moreData.forEach((item, index) => {
        if(index === 0){
            item.forEach((it) => {
                createRow(it);
            });
        }
        setTimeout(() => {
            let interval = setInterval(() => {
                document.getElementById("contentTable").innerHTML = '';
                item.forEach((it) => {
                    createRow(it);
                });
            }, 5000*moreData.length);
            showMoreDataInterval.push(interval);
        }, 5000*index
        );
    });
}

function clearShowMoreDataInterval(){
    showMoreDataInterval.forEach((item, index) => {
        clearInterval(showMoreDataInterval[index]);
    })
}

function loadDoc(data, showMoreDataInterval) {
    setVal(document.getElementById("temp"), `Hà Nội ${data.info.temp}°C`);
    setVal(document.getElementById("hum"), `Độ ẩm ${data.info.hum}`);
    setVal(document.getElementById("wind"), `Tốc độ gió ${data.info.wind}`);
    appendHtml(document.getElementById("iconWeather"), `<img src="http:${data.info.imgLink}">`);
//		data.data.forEach((item, index) => {
//			if(item)
//				createRow(item);
//		});
    showMoreData(data, showMoreDataInterval);
    document.getElementById("focus").innerHTML = data.focus;

    // document.body.style.backgroundColor = "#1f2f5f";
    // document.getElementById("focus").style.backgroundColor = "#1f2f5f";
}

// JS slide full screen
function showData(){
    let data = document.getElementsByClassName("container-fluid");
    data[0].style.display = "block";
    flag++;

    timeData = setTimeout(showData, timeShowData);
    if(flag === 2){
        clearTimeout(timeData);
        flag = 0;
        data[0].style.display = "none";
        showSlides();
    }
}
function createImage(image) {

    let div = document.createElement('div');
    let divContent = document.createElement('div');
    let p = document.createElement('p');

    divContent.id = "contentImage";

    div.className += " mySlides";
    div.id = "mySlide";

    div.style.backgroundImage = `url(${image.url})`;
    p.innerHTML = `${image.title}`;
    // h.style.textAlign = "center";
    // div.style.backgroundPosition = `50% 50%`;
    // div.style.width = "100vw";
    // div.style.height = "100vh";

    divContent.appendChild(p);
    div.appendChild(divContent);
    let slide_container = document.getElementsByClassName("slideshow-container"); // find table to append to
    slide_container[0].appendChild(div);
}
function showSlides() {
    clearShowMoreDataInterval();
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let idSlide = document.getElementById("mySlide");
    let data = document.getElementsByClassName("container-fluid");
    let quota = document.getElementsByClassName('contentQuota');
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;

    if (slideIndex> slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].className = "mySlides";
    setTimeout(()=> {
        let rand = getRandomInt(0,1);
        // console.log(rand);
        if(rand)
            slides[slideIndex-1].className += " active";
    },500);


    timeSlide = setTimeout(showSlides, timeNextImage); // Change image every 2 seconds
    if(slideIndex === slides.length){
        clearTimeout(timeSlide);
        timeSlide = null;
        setTimeout(function() {
            slides[slideIndex-1].style.display = "none";
            if (quota) {
                showQuota();
            }
        }, timeNextImage);
    }
}
function showQuota() {
    // body...
    let quotas = document.getElementsByClassName('contentQuota');
    let i;
    // console.log(timeShowQuota);
    // let data = document.getElementsByClassName("container-fluid");
    for (i = 0; i < quotas.length; i++) {
        quotas[i].style.display = "none";
    }
    quotaIndex++;
    if (quotaIndex> quotas.length) quotaIndex = 1;
    quotas[quotaIndex-1].style.display = "block";
    document.body.style.backgroundImage = `url("/imageQuotation/image (${getRandomInt(1,56)}).jpg")`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    timeQuota = setTimeout(showQuota, timeShowQuota[quotaIndex-1]*60*second); // Change image every 2 seconds
    if(quotaIndex === quotas.length){
        clearTimeout(timeQuota);
        timeQuota = null;
        setTimeout(function() {
            quotas[quotaIndex-1].style.display = "none";
            showData();
        }, timeShowQuota[quotaIndex-1]*60*second);
    }
}
function createQuota(data) {
    // body...
    let div = document.createElement('div');
    let p = document.createElement('p');

    p.innerHTML = `${data.title}<br><em>${data.author}</em>`;
    // console.log(data.title);
    div.className = " contentQuota";
    div.appendChild(p);

    let quota = document.getElementsByClassName('quotation');
    quota[0].appendChild(div);
}
function totalTime1(images, datas, quotas) {
    // body...
    let total = 0;

    let minute = datas.time[0].timeShowData;
    let timeNextSlide = datas.time[0].timeNextSlide; // second


    // time show data + time next Image * so luong anh. (second)
    total += (minute*60 + timeNextSlide*images.info.length);


    quotas.quotation.forEach((item, index) => {
        if(item)
            total += item.timeShow*60;
    });
    return total;
}
function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function initLocalClocks() {
    // Get the local time using JS
    let date = new Date;
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let hands = [
        {
            hand: 'hours',
            angle: (hours * 30) + (minutes / 2)
        },
        {
            hand: 'minutes',
            angle: (minutes * 6)
        },
        {
            hand: 'seconds',
            angle: (seconds * 6)
        }
    ];
    for (let j = 0; j < hands.length; j++) {
        let elements = document.querySelectorAll('.' + hands[j].hand);
        for (let k = 0; k < elements.length; k++) {
            elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
            elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
            if (hands[j].hand === 'minutes') {
                elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
            }
        }
    }
}