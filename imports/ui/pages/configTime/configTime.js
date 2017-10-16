import { Config } from '/imports/api/links/collections.js';
import { Meteor } from 'meteor/meteor';

import './configTime.html';

Template.App_config_time.onCreated(() => {
    Meteor.subscribe('config.all');
});
Template.App_config_time.helpers({
    init() {
        let configTimeDb = Config.find({ name: 'time' }).fetch();
        // let arr = $.map(Config.findOne({ name: 'time' }), function(el) { return el });
        if (configTimeDb.length !== 0){
            return Config.findOne({ name: 'time' });
        }
    },
});

Template.App_config_time.events({
    'click #update'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        let timeData = document.getElementById("tData").value;
        let timeSlide = document.getElementById("tSlide").value;
        let backgroundColor = document.getElementById("cBackgroundColor").value;
        let color = document.getElementById("cColor").value;
        let highLight = document.getElementById("cHighLight").value;
        const alert = document.getElementById("alert");
        if ( timeData === "") {
            alert.children[0].innerHTML = "Bạn chưa nhập <strong>Thời gian hiển thị</strong> bảng tin!";
            alertTimeout("alert", "alert-danger", "alert-success", 2000);
        }else if (timeSlide === "") {
            alert.children[0].innerHTML = "Bạn chưa nhập <strong>Thời gian chạy ảnh nổi bật</strong>!";
            alertTimeout("alert", "alert-danger", "alert-success", 2000);
        }else if (backgroundColor === "") {
            alert.children[0].innerHTML = "Bạn chưa nhập <strong>Mã màu</strong> của màu nền bảng tin!";
            alertTimeout("alert", "alert-danger", "alert-success", 2000);
        }else if (color === "") {
            alert.children[0].innerHTML = "Bạn chưa nhập <strong>Mã màu</strong> của màu chữ chung!";
            alertTimeout("alert", "alert-danger", "alert-success", 2000);
        }else if (highLight === "") {
            alert.children[0].innerHTML = "Bạn chưa nhập <strong>Mã màu</strong> của màu chữ nổi bật!";
            alertTimeout("alert", "alert-danger", "alert-success", 2000);
        } else {
            Meteor.call('time.update', { timeData, timeSlide, backgroundColor, color, highLight });
            alert.children[0].innerHTML = "<strong>Cập nhật thành công</strong> thành công!";
            alertTimeout("alert", "alert-success", "alert-danger", 2000);
        }
    },
    'click #showPicker'() {
        // Prevent default browser form submit
        let showPicker = document.getElementById('showPicker');
        let blockColorPicker = document.getElementById('blockColorPicker');
        if (showPicker.value === "Show Picker Color") {
            ColorPicker(
                document.getElementById('slide'),
                document.getElementById('picker'),
                function(hex, hsv, rgb, pickerCoordinate, slideCoordinate) {
                    ColorPicker.positionIndicators(
                        document.getElementById('slide-indicator'),
                        document.getElementById('picker-indicator'),
                        slideCoordinate, pickerCoordinate
                    );

                    document.getElementsByClassName('container-fluid')[0].style.backgroundColor = hex;
                    document.getElementById('textColor').value = hex;
                });
            showPicker.value = 'hide';
            blockColorPicker.style.display = "block";
        } else {
            document.getElementById("picker").children[0].remove();
            document.getElementById("slide").children[0].remove();
            showPicker.value = 'Show Picker Color';
            blockColorPicker.style.display = "none";
        }
    },
    'change #cBackgroundColor'() {
        // Prevent default browser form submit
        myFunction("cBackgroundColor");
    },
    'change #cColor'() {
        // Prevent default browser form submit
        myFunction("cColor");
    },
    'change #cHighLight'() {
        // Prevent default browser form submit
        myFunction("cHighLight");
    },
});
Template.App_config_time.onRendered(() => {
    document.title = "Config Time";
});