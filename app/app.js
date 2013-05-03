Emails = new Meteor.Collection("emails")

EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Github account usernames of admin users
var ADMIN_USERS = ['niallo', 'peterbraden'];

function isAdmin() {
  try {
    console.dir(Meteor.user())
    return Meteor.user().username in ADMIN_USERS;
  } catch(e) {
    console.log("exception: " + e);
    return false;
  }
}

if (Meteor.isClient) {
  Meteor.autosubscribe(function() {
    Meteor.subscribe('userData', null, function() { console.log("foo") });
    Meteor.subscribe('allUserData', null, function() { console.log("foo") });
  })
  Template.footer.events({
    'click .login' : function(evt, tmpl){
      console.log("Login")
      Meteor.loginWithGithub();
      return false;
    }
   })

  Template.signup.events({
    'submit form' : function (evt, tmpl) {

      var email = tmpl.find('input').value
        , doc = {email: email, referrer: document.referrer}

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

  Template.admin
}

if (Meteor.isServer) {
  Meteor.publish("userData", function () {
    console.log("userData")
    return Meteor.users.find({_id: this.userId},
        {fields: {'services.github.username': 1, 'username':1}});
  });
  Meteor.publish("allUserData", function () {
    console.log("alluserData")
    return Meteor.users.find({_id: this.userId},
        {fields: {'services.github.username': 1, 'username':1}});
  });
  Meteor.startup(function () {
  });

}
