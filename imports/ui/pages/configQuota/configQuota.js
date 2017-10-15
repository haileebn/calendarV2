import { Config } from '/imports/api/links/collections.js';
import { Meteor } from 'meteor/meteor';

import './configQuota.html';

let configTime;

Template.App_config_quota.onCreated(() => {
    Meteor.subscribe('config.all');
});
Template.App_config_quota.helpers({
    init() {
        let imagesDb = Config.find({ name: 'image' }).fetch();
        let configTimeDb = Config.find({ name: 'time' }).fetch();

        if (configTimeDb.length !== 0 &&
            imagesDb.length !== 0){
            images = imagesDb[0].query;
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

Template.App_config_quota.events({
    'click #add'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        let url = document.getElementById("urlImg");
        let content = document.getElementById("contentImg");
        const alert = document.getElementById("alert");
        if ( url.value === "") {
            alert.children[0].innerHTML = "Bạn chưa nhập <strong>đường dẫn</strong> của ảnh!";
            alertTimeout("alert", "alert-danger", "alert-success", 2000);
        }else if (content.value === "") {
            alert.children[0].innerHTML = "Bạn chưa nhập <strong>Nội dung</strong> của ảnh!";
            alertTimeout("alert", "alert-danger", "alert-success", 2000);
        } else {
            Meteor.call('image.insert', { url: url.value , title: content.value });
            alert.children[0].innerHTML = "<strong>Thêm ảnh</strong> thành công!";
            url.value = "";
            content.value = "";
            alertTimeout("alert", "alert-success", "alert-danger", 2000);
        }
    },
    'click .delete'(event) {
        event.preventDefault();
        Meteor.call('image.delete', this.index - 1);
        const alert = document.getElementById("alert");
        alert.children[0].innerHTML = "<strong>Xóa ảnh</strong> thành công!";
        alertTimeout("alert", "alert-success", "alert-danger", 2000);
    },
});
Template.App_config_quota.onRendered(() => {
    document.title = "Config Quotation";
});