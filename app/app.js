Emails = new Meteor.Collection("emails")

EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if (Meteor.isClient) {
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

  Template.admin
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("Current Emails:");
    Emails.find().forEach(function(email){
      console.log(' - ', email.email, email.referrer);
    })


  });
}
