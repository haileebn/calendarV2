import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/configImage/configImage.js';
import '../../ui/pages/configQuota/configQuota.js';
import '../../ui/pages/configTime/configTime.js';
import '../../ui/pages/configBackground/configBackground.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route(['/', '/home_old'], {
  name: 'App.home',
  action() {
      BlazeLayout.setRoot('body');
      BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route(['/configBackground', '/cfb', '/config'], {
    name: 'App.configBackground',
    action() {
        BlazeLayout.setRoot('body');
        BlazeLayout.render('App_body', { main: 'App_config_background' });
    },
});

FlowRouter.route(['/configImage', '/cfi'], {
    name: 'App.configImage',
    action() {
        BlazeLayout.setRoot('body');
        BlazeLayout.render('App_body', { main: 'App_config_image' });
    },
});
FlowRouter.route(['/configQuota', '/cfq'], {
    name: 'App.configQuota',
    action() {
        BlazeLayout.setRoot('body');
        BlazeLayout.render('App_body', { main: 'App_config_quota' });
    },
});
FlowRouter.route(['/configTime', '/cft'], {
    name: 'App.configTime',
    action() {
        BlazeLayout.setRoot('body');
        BlazeLayout.render('App_body', { main: 'App_config_time' });
    },
});

FlowRouter.notFound = {
  action() {
      BlazeLayout.setRoot('body');
      BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

