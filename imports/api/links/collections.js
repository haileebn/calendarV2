import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const TOKEN = new Mongo.Collection('token');
export const Secret = new Mongo.Collection('secret');
export const MultiData = new Mongo.Collection('multidata');
export const Config = new Mongo.Collection('config');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('token', function tasksPublication() {
        return TOKEN.find({});
    });
}


Meteor.methods({
    'image.insert'(info) {
        // check(text, String);
        const images = Config.findOne({name: "image"}).query.info;
        // console.log(images);
        images.push(info);
        Config.update({ name: 'image' }, { $set: { info: images } });
    },
    // 'tasks.remove'(taskId) {
    //     check(taskId, String);
    //
    //     const task = Tasks.findOne(taskId);
    //     if (task.private && task.owner !== Meteor.userId()) {
    //         // If the task is private, make sure only the owner can delete it
    //         throw new Meteor.Error('not-authorized');
    //     }
    //
    //     Tasks.remove(taskId);
    // },
    // 'tasks.setChecked'(taskId, setChecked) {
    //     check(taskId, String);
    //     check(setChecked, Boolean);
    //
    //     const task = Tasks.findOne(taskId);
    //     if (task.private && task.owner !== Meteor.userId()) {
    //         // If the task is private, make sure only the owner can check it off
    //         throw new Meteor.Error('not-authorized');
    //     }
    //
    //     Tasks.update(taskId, { $set: { checked: setChecked } });
    // },
});
