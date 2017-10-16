// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links.js';
import { TOKEN, Secret, Config } from '../../api/links/collections.js';

Meteor.startup(() => {
  // if the Links collection is empty
  const cfBackground = Config.find({ name: 'background'}).count();
  const cfImage = Config.find({ name: 'image'}).count();
  const cfQuotation = Config.find({ name: 'quotation'}).count();
  const cfTime = Config.find({ name: 'time'}).count();
  if (Links.find().count() === 0) {
    const data = [
      {
        title: 'Do the Tutorial',
        url: 'https://www.meteor.com/try',
        createdAt: new Date(),
      },
      {
        title: 'Follow the Guide',
        url: 'http://guide.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Read the Docs',
        url: 'https://docs.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Discussions',
        url: 'https://forums.meteor.com',
        createdAt: new Date(),
      },
    ];
    data.forEach(link => Links.insert(link));
  }

  if (TOKEN.find().count() === 0) {
      const token = {
          "access_token": "ya29.Glu4BCAUJeGkODd61RuTmFxf9Jx5_5krJnvM1q6iSY-TAndXIu9XdfUaHb7ZLSjUyEXZt3B2zp9yyocDYYrjvNAQ8o9BSPopmtMxHFzCCEPMSpt63WR1FlVXW0nb",
          "refresh_token": "1/ef_Fy-b2kOU8az0Y8GjUt0hT3H_7oVwcxbtser50LY7yPS8-OeeakbUD1ndOWTtW",
          "token_type": "Bearer",
          "expiry_date": 1504150606919
      };
      TOKEN.insert(token);
  }

  if (Secret.find().count() === 0) {
      const secret = {
          "installed":
              {
                  "client_id": "192095822938-coslveqvm4h0qfeaj5a702om6mpudsqb.apps.googleusercontent.com",
                  "project_id": "rugged-matrix-178502",
                  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                  "token_uri": "https://accounts.google.com/o/oauth2/token",
                  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                  "client_secret": "T5uMeZgunU4ifxfNrSpuMBXD",
                  "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
              }
      };
      Secret.insert(secret);
  }

  if (cfBackground === 0) {
      const bg = {
          name: "background",
          query: {
              "fimoIcon": "https://i0.wp.com/fimo.edu.vn/wp-content/uploads/2015/12/cropped-cropped-logo_small.png",
              "backgroundImage": ""
          }
      };
      Config.insert(bg);
  }

  if (cfImage === 0) {
      const img = {
          name: "image",
          query: {
              "info": [{
                      "url": "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/21762228_276721009496380_7960597957672700300_n.jpg?oh=e5f218761c1f27fe8f27148f26a3862d&oe=5A5718EE",
                      "title": "VCIC Awards Ceremony PoC2"
                  },{
                      "url": "https://i2.wp.com/fimo.edu.vn/wp-content/uploads/2017/08/Week-2.jpg",
                      "title": "Nguyễn Ngọc Đức bảo vệ thành công danh hiệu FIP- 2nd The best demonstration of the week"
                  },{
                      "url": "https://i0.wp.com/fimo.edu.vn/wp-content/uploads/2017/09/DSC_0607.jpg",
                      "title": "FIMO tham dự Hội thảo TORUS lần thứ 5"
                  },{
                      "url": "https://i1.wp.com/fimo.edu.vn/wp-content/uploads/2017/06/19126240_10155542393632722_1758808627_o.jpg",
                      "title": "Sinh viên K58 FIMO tri ân Thầy, Cô sau lễ bảo vệ khóa luận tốt nghiệp"
                  }]
          }
      };
      Config.insert(img);
  }
  if (cfQuotation === 0) {
      const qt = {
          name: "quotation",
          query: {
              "quotation": [{
                      "title": "The rain may be falling hard outside But your smile makes it alright I’m so glad that you’re my friend I know our friendship will never end.",
                      "author": "người nào đó",
                      "timeShow": 0.15
                  },{
                      "title": "Đừng so sánh mình với bất cứ ai trong thế giới này. Nếu bạn làm như vậy có nghĩa bạn đang sỉ nhục chính bản thân mình.",
                      "author": "Bill Gates",
                      "timeShow": 0.15
                  },{
                      "title": "Ta không được chọn nơi mình sinh ra. Nhưng ta được chọn cách mình sẽ sống.",
                      "author": "Khuyết Danh",
                      "timeShow": 0.15
                  }]
          }
      };
      Config.insert(qt);
  }

  if (cfTime === 0) {
      const time = {
          name: "time",
          query: {
              "time": [
                  {
                      "timeShowData": 52,
                      "timeNextSlide": 51
                  }],
              "changeColor":
                  {
                      "backgroundColor": "#372F2D",
                      "color": "#E0E0E0",
                      "highLight": "#F57F17"
                  },
              "defaultColor":
                  {
                      "backgroundColor": "#5E8FDB",
                      "color": "#FFF",
                      "highLight": "#F2F20D"
                  }
          }
      };
      Config.insert(time);
  }
  // console.log(Config.find().count());
});
