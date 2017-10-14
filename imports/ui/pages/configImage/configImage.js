import { Config } from '/imports/api/links/collections.js';
import { Meteor } from 'meteor/meteor';

import './configImage.html';

let configTime;

Template.App_config_image.onCreated(() => {
    Meteor.subscribe('config.all');

});
Template.App_config_image.helpers({
    init() {
        // Meteor.call('image.insert', { url: "12344", title: "title23445"});
        let imagesDb = Config.find({ name: 'image' }).fetch();
        let configTimeDb = Config.find({ name: 'time' }).fetch();

        if (configTimeDb.length !== 0 &&
            imagesDb.length !== 0){
            images = imagesDb[0].query;
            console.log(images);
            configTime = configTimeDb[0].query;
            imagesDb[0].query.info.forEach((item, index) => {
                if(item && !item.index)
                    item.index = index + 1;
            });
            configColor(configTime.changeColor);
            return imagesDb[0].query.info;
        }
    },
});

// Template.info.onRendered(() => {
//     let update = document.getElementById('update');
//     let iconDel = document.getElementsByClassName('glyphicon-remove');
//     for(let i = 0; i < iconDel.length; i++){
//         iconDel[i].addEventListener('click', function() {
//             // body...
//             fetch('configImage', {
//                 method: 'DELETE',
//                 headers: {'Content-Type': 'application/json'},
//                 body: JSON.stringify({
//                     'id': this.id
//                 })
//             }).then((response)=>{
//                 if (response.status === 200) {
//                     response.text().then(function (text) {
//                         if (text === "ok") {
//                             window.location.reload(true);
//                         }
//                     });
//                 }
//             });
//         });
//     }
//     update.addEventListener('click', function () {
//         let textUrl = document.getElementById('urlImg').value.trim().replace(/[\t\n\\]/g, "");
//         let textContent = document.getElementById('contentImg').value.trim().replace(/[\t\n\\]/g, "");
//         if (textUrl === "" || textContent === "") alert("ban chua nhap!!");
//         else {
//             fetch('configImage', {
//                 method: 'PUT',
//                 headers: {'Content-Type': 'application/json'},
//                 body: JSON.stringify({
//                     'images': {url : textUrl, title: textContent}
//                 })
//             }).then((response)=>{
//                 if (response.status === 200) {
//                     response.text().then(function (text) {
//                         if (text === "ok") {
//                             window.location.reload(true);
//                         }
//                     })
//                 }
//             })
//         }
//     })
// });