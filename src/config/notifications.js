import _ from 'lodash';
import { Alert } from 'react-native';

class NotificationHandler {
  constructor() {
    this.pendingAlerts = [];
    this.currentAlert = null;
    this.ready = true;
    this.alert = this.alert.bind(this);
    this.sendAlerts = this.sendAlerts.bind(this);
    this.errors = {
      timedOut: _.debounce(this.timedOut.bind(this), 10000),
      loggedOut: this.loggedOut.bind(this),
      serverDown: _.debounce(this.serverDown.bind(this), 10000),
    };
  }

  error(message) {
    this.alert({ title: 'VibCare', message });
  }

  serverDown() {
    this.alert({
      title: 'Server Error',
      message:
        "Uh-oh, it looks like we're encountering server errors. We'll be back up soon. Sorry!",
    });
  }

  loggedOut() {
    this.blockNext = true;
    this.alert({
      title: 'Not Logged In',
      message: 'You need to log in to continue.',
    });
  }

  timedOut() {
    this.alert({
      title: "What's the hold up?",
      message:
        'It looks like the request is taking longer than expected. Check your internet connectivity and try again.',
    });
  }

  alert({
    title, message, callback = null, onConfirm = null, buttons,
  }) {
    if (
      !_.isEqual(_.pick(this.currentAlert, ['title', 'message']), {
        title,
        message,
      })
    ) {
      this.pendingAlerts.push({
        title,
        message,
        callback,
        onConfirm,
        buttons,
      });
    }
    if (this.ready) this.sendAlerts();
  }

  createCallback(result) {
    const { blockNext } = this;
    return () => {
      _.attempt(this.currentAlert.callback, result);
      _.attempt(this.currentAlert.onConfirm, result);
      if (blockNext) {
        this.blockNext = false;
        this.pendingAlerts = [];
        this.currentAlert = null;
      }
      this.sendAlerts();
    };
  }

  sendAlerts() {
    const alerts = _.uniqWith(this.pendingAlerts, _.isEqual);
    this.ready = false;
    if (alerts.length) {
      this.currentAlert = alerts.shift();
      this.pendingAlerts = alerts;
      const callbackCancel = _.isFunction(this.currentAlert.callback)
        ? [
          {
            text: 'Cancel',
            onPress: this.createCallback(false),
          },
        ]
        : [];
      Alert.alert(
        this.currentAlert.title,
        this.currentAlert.message || null,
        this.currentAlert.buttons
          ? this.currentAlert.buttons
          : [
            ...callbackCancel,
            {
              text: 'OK',
              onPress: this.createCallback(true),
            },
          ],
        { cancelable: false }
      );
    } else {
      this.ready = true;
      this.currentAlert = null;
    }
  }
}

const notifications = new NotificationHandler();

export { NotificationHandler };

export default notifications;
