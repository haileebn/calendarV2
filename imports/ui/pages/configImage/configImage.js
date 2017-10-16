import { Config } from '/imports/api/links/collections.js';
import { Meteor } from 'meteor/meteor';
// import { Session } from 'meteor/session';
import './configImage.html';

Template.App_config_image.onCreated(() => {
    Meteor.subscribe('config.all');
});
Template.App_config_image.helpers({
    init() {
        let imagesDb = Config.find({ name: 'image' }).fetch();
        // console.log(Session.get('refresh'));
        if (imagesDb.length !== 0){
            imagesDb[0].query.info.forEach((item, index) => {
                if(item && !item.index)
                    item.index = index + 1;
            });
            return imagesDb[0].query.info;
        }
    },
    config(){
        if (Config.findOne({ name: 'time' }))
            return Config.findOne({ name: 'time' }).query.changeColor;
    }
});

Template.App_config_image.events({
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
            // Session.set('refresh', "abc");
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

Template.App_config_image.onRendered(() => {
    document.title = "Config Image";
});