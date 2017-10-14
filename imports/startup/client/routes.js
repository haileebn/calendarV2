import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/configImage/configImage.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
      BlazeLayout.setRoot('body');
      BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/configImage', {
    name: 'App.configImage',
    action() {
        BlazeLayout.setRoot('body');
        BlazeLayout.render('App_body', { main: 'App_config_image' });
    },
});

FlowRouter.notFound = {
  action() {
      BlazeLayout.setRoot('body');
      BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

