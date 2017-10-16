import { Config } from '/imports/api/links/collections.js';
import { Meteor } from 'meteor/meteor';

import './configBackground.html';

Template.App_config_background.onCreated(() => {
    Meteor.subscribe('config.all');
});
Template.App_config_background.helpers({
    init() {
        // Db[0].query.forEach((item, index) => {
        //     if(item && !item.index) {
        //         item.index = index + 1;
        //     }
        // });
        if (Config.findOne({ name: 'background' }))
            return Config.findOne({ name: 'background' }).query;
    },
    config(){
        if (Config.findOne({ name: 'time' }))
            return Config.findOne({ name: 'time' }).query.changeColor;
    }
});

Template.App_config_background.events({
    'click #update'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        let fimoIcon = document.getElementById("tFimoIcon");
        let background = document.getElementById("tBgImage");
        const alert = document.getElementById("alert");
        if ( fimoIcon.value === "") {
            alert.children[0].innerHTML = "Bạn chưa nhập <strong>Đường dẫn</strong> của icon FIMO!";
            alertTimeout("alert", "alert-danger", "alert-success", 2000);
        } else {
            Meteor.call('background.update', { backgroundImage: background.value , fimoIcon: fimoIcon.value});
            alert.children[0].innerHTML = "<strong>Cập nhật</strong> thành công!";
            alertTimeout("alert", "alert-success", "alert-danger", 2000);
        }
    },
    'click .delete'(event) {
        event.preventDefault();
        Meteor.call('background.delete');
        const alert = document.getElementById("alert");
        alert.children[0].innerHTML = "<strong>Xóa ảnh</strong> thành công!";
        alertTimeout("alert", "alert-success", "alert-danger", 2000);
    },
    'click .notDelete'(event) {
        event.preventDefault();
        const alert = document.getElementById("alert");
        alert.children[0].innerHTML = "<strong>Không được xóa</strong> ảnh này!";
        alertTimeout("alert", "alert-danger", "alert-success", 2000);
    },
});
Template.App_config_background.onRendered(() => {
    document.title = "Config Background";
});