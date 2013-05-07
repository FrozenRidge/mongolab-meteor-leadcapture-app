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

## Landing Page Template

First we need a nice HTML page for the landing page. At the moment, Meteor only
supports handlebars for templating. It's worth noting that everything must be
specified in template tags - Meteor will render everything else immediately.
This enforces thinking of your app as a series of _views_ rather than a series
of pages.

```html
<head>
  <title>FrozenRidge | Newsletter</title>

  <link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
</head>

<body>
  <div class='header'>
    <img src = "./logo.png" />
  </div>
  <div class='content'>
    {{> main }}
  </div>
  <div class='footer'>
    {{> footer }}
  </div>

</body>

<template name = "main">
 {{#if showAdmin}}
    {{> admin}}
 {{else}}
    {{> signup}}
 {{/if}}
</template>

<template name = "footer">
  <a href = "http://frozenridge.co">FrozenRidge | Solving hard problems for business</a>
  {{#if isAdmin}}
  | <a href = "#" class = "admin">toggle admin</a>
  {{/if}}
  | {{loginButtons}}
</template>

<template name = "signup">
  {{#if emailSubmitted }}
    <h1>Thanks for signing up!</h1>
  {{else }}
  <h1>Sign up for our newsletter</h1>
    <p>We'd love to stay in touch with you &mdash; leave us your email and we'll keep you
    up to date...</p>
    <form>
      {{#if showBadEmail}}
        {{> badEmail}}
      {{/if}}
      <input id="email"><button>&gt;</button>
  {{/if}}
  </form>


</template>


<template name = "admin">
  <h1>Signed up Customers</h1>
  <table>
    <tr><th>Customer Email</th><th>Referrer</th><th>Time</th></tr>
    {{#each emails}}
      <tr><td>{{ this.email }}</td><td>{{ this.referrer }}</td><td>{{ this.timestamp }}</td></tr>
    {{/each }}
  </table>
</template>


<template name="badEmail">
  <div class="error">
    <p>That's not a real email address...</p>
  </div>
</template>
```

<script src="http://gist-it.appspot.com/github/FrozenRidge/mongolab-meteor-sample/blob/master/app/app.html"></script>


## Data Display Table

As you can see above, both the signup pane and the data display are defined
within template tags. The data display table is simply a handlebars table that
we'll populate with data from the database - meteor likes to live update data -
that means if you specify your templates in terms of data accessors, when the
underlying data changes, so will the dom reflect the changes.

This is a pretty different approach to a typical framework where you have to
manually specify that a view needs to refresh. Personally I find it a little too
magical - I like to have more control of my templating - but there are plenty of
reasons the meteor team have taken this approach.


## Client-side Code

Because Meteor shares code between the client and the server, both client and server
code is contained in app.js - you can see that we can add client specific code by
testing Meteor.isClient:

```javascript
if (Meteor.isClient) {
  ...
}
```

 For the user-facing landing page, we merely need to insert data to the
MongoDB collection when the form is submitted. We thus bind to the form submit
event and check to see if the email appears to be valid. If so, we insert it
into the data model.

One of the nice things about Meteor is that the client and server side data model
API's are the same - so if we insert the data here it is transparently synced with
our servers database.

This becomes even more powerful because we have configured our app to use MongoLab
as it's persistent data store. This means that we can use any MongoDB client to
also connect to the database and use this data - me may link up newsletter software
to this to make use of our email database for example.

MongoLab is a great service that ameliorates the pain of running your own database,
you can sign up for an account <a href = "https://mongolab.com/signup?referrer=frozenridge">here</a>.


```javascript // XXX Code ```

For the Admin view, we need to render the template from the data in the leads
collection:

```javascript // XXX Code ```

## Server-side Code

Meteor makes it super easy to handle the server-side component and marshalling
data to MongoDB. Our newsletter signup just has to publish the signups
collection for the data display view to be notified of its contents and updates
in real-time.

This lives in file blah blah

```javascript // XXX code ```


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
