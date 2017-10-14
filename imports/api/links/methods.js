// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Links } from './links.js';
import { TOKEN, Secret, MultiData } from './collections.js';
import { Promise } from 'meteor/promise';

const google = require('googleapis');
const googleAuth = require('google-auth-library');
const rp = require('request-promise');
const cheerio = require('cheerio');
const parser = require('xml2json');

let options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
    },
    uri: 'https://www.google.com.vn/search?q=thoi+tiet+ha+noi'
};
let options2 = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
    },
    uri: 'http://fimo.edu.vn/category/events/feed/'
};

Meteor.methods({
  'links.insert'(title, url) {
    check(url, String);
    check(title, String);

    return Links.insert({
      url,
      title,
      createdAt: new Date(),
    });
  },
  'get.multiData'() {
    let secret = Secret.find().fetch();
    delete secret[0]._id;
    authorize(secret[0])
      .then(oauth2Client => {
        listEvents(oauth2Client)
          .then(data => {
            const multiData = MultiData.find().fetch();
            if (multiData.length === 0){
              MultiData.insert(data);
              console.log("Insert success!");
            } else {
              MultiData.update(multiData[0]._id, data);
              console.log("update success!");
            }
          }).catch(err => {
            console.log(err);
          });
      }).catch(err => {
        console.log(err);
      });
  },
  // 'get.data'() {
  //   return MultiData.find({});
  // },
});

function getWeather(body) {
    let json = {};
    const $ = cheerio.load(body);
    json.temp = $(body).find("#wob_tm").text();
    json.hum = $(body).find("#wob_hm").text();
    json.wind = $(body).find("#wob_ws").text();
    json.imgLink = $(body).find("#wob_tci").attr("src");
    return json;
}
function getFocus(body) {
    if(body){
        //$ = cheerio.load(body, { xmlMode: true });
        let str = '';
        const stringjson = parser.toJson(body);
        let json = JSON.parse(stringjson);
        if(json && json.rss && json.rss.channel && json.rss.channel.item){
            json.rss.channel.item.slice(0,5);
            json.rss.channel.item.forEach((item, index) => {
                str += '&emsp; &ensp;&emsp; &ensp;&emsp; &ensp;' + item.title;
            });
        }
        return str;
    } else {
        return '';
    }
}

function authorize(credentials) {
    return new Promise((resolve, reject) => {
        let clientSecret = credentials.installed.client_secret;
        let clientId = credentials.installed.client_id;
        let redirectUrl = credentials.installed.redirect_uris[0];
        let auth = new googleAuth();
        let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

        // Check if we have previously stored a token.
        let token = TOKEN.find().fetch();
        // console.log(token.length);
        if (token.length !== 0) {
            delete token[0]._id;
            oauth2Client.credentials = token[0];
            resolve(oauth2Client);
        } else {
            console.log("khong co token!");
        }

        // fs.readFile(TOKEN_PATH, function(err, token) {
        //     if (err) {
        //         getNewToken(oauth2Client).then(oauth2 => {
        //             resolve(oauth2)
        //         });
        //     } else {
        //         oauth2Client.credentials = JSON.parse(token);
        //         resolve(oauth2Client);
        //     }
        // });
    });
}
function listEvents(auth) {
    return new Promise ((resolve, reject) => {
        const calendar = google.calendar('v3');
        calendar.events.list({
            auth: auth,
            calendarId: 'fimo.edu.vn_jljam5oiekv48nobksk2n23d50@group.calendar.google.com',
            timeMin: (new Date()).toISOString(),
            maxResults: 20,
            singleEvents: true,
            orderBy: 'startTime'
        }, function(err, response) {

            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }
            let events = response.items;
            if (events.length === 0) {
                console.log('No upcoming events found.');
            } else {
                const curr = new Date; // get current date
                let last = curr.getDate() - curr.getDay() + 7; // last day is the first day + 6
                let firstday = curr.toISOString();
                let lastday = new Date(curr.setDate(last)).toISOString();

                let data = [];
                // console.log(`Upcoming ${events.length} events:`);
                // for (let i = 0; i < events.length; i++) {
                for (let i = events.length -1; i >= 0; i--) {
                    const event = events[i];
                    const start = event.start.dateTime || event.start.date;
                    const end = event.end.dateTime || event.end.date;
                    // console.log(`start : ${start}`);
                    // console.log(`end : ${end}\n`);
                    const date = new Date(start);
                    if (date.toISOString() < lastday)
                        data.unshift({ start, end, "title": event.summary , "place": event.location});
                }
                // resolve(data);
                rp(options)
                .then(body => {
                    const info = getWeather(body);
                    rp(options2)
                    .then(body2 => {
                        const focus = getFocus(body2);
                        resolve({ data, info, focus});
                    });
                });
            }
        });
    });
}
