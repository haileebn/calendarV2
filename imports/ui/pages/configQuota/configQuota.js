import { Config } from '/imports/api/links/collections.js';
import { Meteor } from 'meteor/meteor';

import './configQuota.html';

Template.App_config_quota.onCreated(() => {
    Meteor.subscribe('config.all');
});
Template.App_config_quota.helpers({
    init() {
        let quotasDb = Config.find({ name: 'quotation' }).fetch();
        if (quotasDb.length !== 0){
            quotas = quotasDb[0].query;
            quotasDb[0].query.quotation.forEach((item, index) => {

                if(item && !item.index) {
                    item.index = index + 1;
                }
            });
            return quotasDb[0].query.quotation;
        }
    },
    config(){
        if (Config.findOne({ name: 'time' }))
            return Config.findOne({ name: 'time' }).query.changeColor;
    }
});

Template.App_config_quota.events({
    'click #add'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        let title = document.getElementById("titleQt");
        let author = document.getElementById("authorQt");
        let timeShow = document.getElementById("timeShowQt");
        const alert = document.getElementById("alert");
        if ( title.value === "") {
            alert.children[0].innerHTML = "Bạn chưa nhập <strong>Tiêu đề</strong> của câu nói!";
            alertTimeout("alert", "alert-danger", "alert-success", 2000);
        }else if (author.value === "") {
            alert.children[0].innerHTML = "Bạn chưa nhập <strong>Tên tác giả</strong> của câu nói!";
            alertTimeout("alert", "alert-danger", "alert-success", 2000);
        }else if (timeShow.value === "") {
            alert.children[0].innerHTML = "Bạn chưa nhập <strong>Thời gian chạy</strong> của câu nói!";
            alertTimeout("alert", "alert-danger", "alert-success", 2000);
        } else {
            Meteor.call('quota.insert', { title: title.value , author: author.value, timeShow: timeShow.value });
            alert.children[0].innerHTML = "<strong>Thêm câu nói</strong> thành công!";
            title.value = "";
            author.value = "";
            timeShow.value = "";
            alertTimeout("alert", "alert-success", "alert-danger", 2000);
        }
    },
    'click .delete'(event) {
        event.preventDefault();
        Meteor.call('quota.delete', this.index - 1);
        const alert = document.getElementById("alert");
        alert.children[0].innerHTML = "<strong>Xóa câu nói</strong> thành công!";
        alertTimeout("alert", "alert-success", "alert-danger", 2000);
    },
});
Template.App_config_quota.onRendered(() => {
    document.title = "Config Quotation";
});