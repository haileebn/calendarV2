// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Links } from '../links.js';
import { MultiData, Config } from '../collections.js';
// import { Secret } from '../secret.js';

Meteor.publish('links.all', function () {
    return Links.find();
});
Meteor.publish('config.all', function () {
    return Config.find();
});
Meteor.publish('multiData.all', function () {
    return MultiData.find();
});

