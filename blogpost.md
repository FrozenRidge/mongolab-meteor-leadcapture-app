## Build Your Own Lead Capture Page with Meteor and MongoLab in Minutes

[Meteor](http://meteor.com) is a framework for building real-time client-server
applications in JavaScript. It works very nicely with MongoDB - a JSON database
which gives you storage that's idiomatic for JavaScript. When hosting, you can
easily use [MongoLab](http://mongolab.com) as your backend MongoDB provider.

To demonstrate Meteor working with MongoLab, we'll walk you though building a
lead capture web application with persistance to MongoLab.

Since MongoDB is a document-oriented database, it is very easy to modify the
application to store any data you want. In our example, we are building this as
an email newsletter signup system.

However, you could just as easily make this into a very simple CRM by capturing
additional fields like phone number, full name etc.

## Newsletter Signup App

Our newsletter signup app will consist of two views:

* A user-facing landing page for people to enter their email address.
* An internal-facing page with tabular display of signups and other metadata
  such as timestamp, referrer.

You can grab the complete source to the finished newsletter signup app on
Github at
[FrozenRidge/mongolab-meteor-sample](https://github.com/FrozenRidge/mongolab-meteor-sample)

## Creating a Meteor App

First install Meteor with `curl https://install.meteor.com | sh`

Once Meteor is on your system, you can create an app called `app` with the command:

`meteor create app`

Now you will have a directory named `app` which contains files `app.js`, `app.css` and `app.html`.

## Landing Page Template

First we need a nice HTML page for the landing page. In the Meteor app you just created, your templates are stored in `app.html`.

At the moment, Meteor only supports [handlebars](http://handlebarsjs.com) for templating.

It's worth noting that everything must be specified in template tags - Meteor
will render everything else immediately.  This enforces thinking of your app as
a series of _views_ rather than a series of pages.

Let's look at an example from our finished app to illustrate. We have a "main" template which looks like this:

```html
<template name="main">
 {{#if showAdmin}}
    {{> admin}}
 {{else}}
    {{> signup}}
 {{/if}}
</template>
```

Data is bound from client-side code to templates through the Meteor template
API `Template.<name>`. 

Hence, the variable `showAdmin` is actually bound to the return value of the
JavaScript function `Template.main.showAdmin` in the client-side code. In our
`app.js`, the implmentation is as follows:

```javascript
  Template.main.showAdmin = function() {
    return Session.get("showAdmin");
  };
```

Due to Meteor's data bindings, when the session variable `showAdmin` is set to `true`, the "admin" template will be rendered. Otherwise, the "signup"
template will be rendered. Meteor doesn't have to be explicitly told to switch the views - it will update automatically when the value changes.

This brings us to the client-side code.

## Client-side Code

Since Meteor shares code between the client and the server, both client and server
code is contained in `app.js` - you can see that we can add client specific code by
testing `Meteor.isClient`:

```javascript
if (Meteor.isClient) {
  ...
}
```

### Inserting Data on Submit

For the user-facing landing page, we merely need to insert data to the MongoDB
collection when the form is submitted. We thus bind to the form submit event in
the "signup" template and check to see if the email appears to be valid. If so,
we insert it into the data model:

```javascript
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
```

One of the nice things about Meteor is that the client and server side data
model API's are the same - so if we insert the data here in the client, it is
transparently synced with the server and persisted to MongoDB.

This becomes even more powerful because we have configured our app to use
MongoLab as it's persistent data store. This means that we can use any MongoDB
client to also connect to the database and use this data - me may link up
mailmerge software to make use of our email database for example.

MongoLab is a great service that removes the pain of running your own database,
you can sign up for an account <a href = "https://mongolab.com/signup?referrer=frozenridge">here</a>.

### Auth for Viewing Emails

Now that we've got our newsletter signup form working, we will want to be able to
see a list of emails in the database. However, because this is sensitive information, 
we don't want it to be publicly visible. We only want a select list of authenticated users
to be able to see it.

Fortunately, Meteor makes it easy to add authentication to your application. For demonstration purposes,
we are piggy-backing off our Github accounts via OAuth2. We don't want to create additional passwords just
to view newsletter signups. Instead, we'll consider a hardcoded list of Github usernames to view the admin page:

```javascript

// Github account usernames of admin users
var ADMIN_USERS = ['niallo', 'peterbraden'];


// Is the current user an admin
function isAdmin() {
  try {
    return ADMIN_USERS.indexOf(Meteor.user().services.github.username) !== -1
  } catch(e) {
    return false;
  }
}

Meteor makes it very easy to add a "login with Github" UI flow to your
application once with `accounts` and `accounts-ui` packages. You can
add these with the command:

`meteor add accounts-ui accounts-github`

Once these are added to your app, you can render a "log in with Github" button
in your templates by adding the special template variable `{{loginButtons}}`.
For example in our finished app we have:

```html
<template name = "footer">
  <a href = "http://frozenridge.co">FrozenRidge | Solving hard problems for business</a>
  {{#if isAdmin}}
  | <a href = "#" class = "admin">toggle admin</a>
  {{/if}}
  | {{loginButtons}}
</template>


```


```
## Server-side Code

Meteor makes it super easy to handle the server-side component and marshalling
data to MongoDB. Our newsletter signup just has to publish the signups
collection for the data display view to be notified of its contents and updates
in real-time.

This lives in file blah blah

```javascript // XXX code ```

## Data Display Table

As you can see above, both the signup pane and the data display (named "admin") are defined
within template tags. The data display table is simply a handlebars table that
we'll populate with data from the database - meteor likes to live update data -
that means if you specify your templates in terms of data accessors, when the
underlying data changes, so will the dom reflect the changes.

This is a pretty different approach to a typical framework where you have to
manually specify that a view needs to refresh.



## Deploying the Meteor App

For deployment, Meteor apps are translated to Node.JS applications using the
`meteor bundle` command. This will output a tarball archive. To run this
application, uncompress it and install its only dependency - `fibers`.

Fibers can be installed with the command

`npm install fibers`

## Running the Meteor App with MongoLab

Now your Meteor application is ready to run. There are a number of
configuration options which can be set at start-time via UNIX environment
variables. 

In order to have you Meteor application persist data to your MongoLab database,
set `MONGO_URL` environment variable:

`export MONGO_URL=mongodb://user:password@foo.mongolab.com/db`

For Meteor to correctly set up authentication with Github, you need to set the ROOT_URL environment variable:

`export ROOT_URL=http://localhost:8080`

To run your Meteor application on port 8080, simply execute `main.js`:

`PORT=8080 node main.js`

You should now be able to connect to it at http://localhost:8080
