Emails = new Meteor.Collection("emails")

EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Github account usernames of admin users
var ADMIN_USERS = ['niallo', 'peterbraden'];
function isAdmin() {
  try {
    return ADMIN_USERS.indexOf(Meteor.user().services.github.username) !== -1
  } catch(e) {
    return false;
  }
}

if (Meteor.isClient) {

  Meteor.subscribe('userData');
  Meteor.subscribe('emails');
  Template.footer.events({
    'click .login' : function(evt, tmpl){
      Meteor.loginWithGithub();
      return false;
    },

    'click .admin' : function(evt, tmpl){
      Session.set("showAdmin", !Session.get("showAdmin"));
    }
   })

  Template.signup.events({
    'submit form' : function (evt, tmpl) {

      var email = tmpl.find('input').value
      , doc = {email: email, referrer: document.referrer, timestamp: new Date()}

      if (EMAIL_REGEX.test(email)){
        Session.set("showBadEmail", false);
        Emails.insert(doc);
        Session.set("emailSubmitted", true);
      } else {
        Session.set("showBadEmail", true);
      }
      return false;
    }
  });

  Template.signup.showBadEmail = function () {
    return Session.get("showBadEmail");
  };

  Template.signup.emailSubmitted = function () {
    return Session.get("emailSubmitted");
  };

  Template.footer.isAdmin = isAdmin;

  Template.main.showAdmin = function() {
    return Session.get("showAdmin");
  };

  Template.admin.emails = function() {
    return Emails.find().fetch();
  };

}

if (Meteor.isServer) {
  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
      {fields: {'services.github.username': 1, 'username':1}});
  });

  Meteor.publish("emails", function() {
    if (isAdmin) {
      return Emails.find();
    }
  });
  Meteor.startup(function () {
  });

}
