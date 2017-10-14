// Import modules used by both client and server through a single index entry point
// e.g. useraccounts configuration file.
import { Meteor } from 'meteor/meteor';
import { Config, MultiData, Secret, TOKEN } from '../../api/links/collections.js';

if (Meteor.isClient){
    Meteor.subscribe('config.all');
}