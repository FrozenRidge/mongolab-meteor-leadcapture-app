## Build Your Own Lead Capture Page with Meteor and MongoLab in Minutes

[Meteor](http://meteor.com) is a framework for building real-time client-server
applications in JavaScript. It works very nicely with MongoDB - a JSON database
which gives you storage that's idiomatic for JavaScript. When hosting, you can
easily use [MongoLab](http://mongolab.com) as your backend MongoDB provider.

To demonstrate Meteor working with MongoLab, we'll walk you though building a lead
capture web application with persistance to MongoLab.

Since MongoDB is a document-oriented database, it is very easy to modify the
application to store any data you want. In our example, we are building this as
an email newsletter signup system.

However, you could just as easily make this into a very simple CRM by capturing
additional fields like phone number, full name etc.

## Newsletter Signup App

Our newsletter signup app will consist of two views:

* A user-facing landing page for people to enter their email address.
* An internal-facing page with tabular display of signups and other metadata such as timestamp, referrer.

## Landing Page Template

First we need a nice HTML page for the landing page. At the moment, Meteor only supports
handlebars for templating. It's worth noting that everything must be specified in template tags -
Meteor will render everything else immediately. This enforces thinking of your app as a series of
_views_ rather than a series of pages.

-- Code: App.html --




## Data Display Table

As you can see above, both the signup pane and the data display are defined within template tags. The data display table is simply a handlebars table that we'll populate with data from the database - this introduces a Meteor philosophy: everything 

## Static Resources

Static resources (CSS, images, etc) live in the blah blah public folder to be accessible at the root of the HTTP server.


## Client-side Code

The client-side code in our application lives in the file blah.js and is quite simple. For the user-facing landing page, we merely need to insert data to the MongoDB collection when the form is submitted:

```javascript
// XXX Code
```

For the Admin view, we need to render the template from the data in the leads collection:

```javascript
// XXX Code
```

## Server-side Code

Meteor makes it super easy to handle the server-side component and marshalling
data to MongoDB. Our newsletter signup just has to publish the signups collection
for the data display view to be notified of its contents and updates in real-time.

This lives in file blah blah

```javascript
// XXX code
```


## Deploying the Meteor App

For deployment, Meteor apps are translated to Node.JS applications using the
`meteor bundle` command. This will output a tarball archive. To run this
application, uncompress it and install its only dependency - `fibers`.

Fibers can be installed with the command

`npm install fibers@1.0.0`

## Running the Meteor App with MongoLab

Now your Meteor application is ready to run. There are a number of
configuration options which can be set at start-time via UNIX environment
variables. 

In order to have you Meteor application persist data to your MongoLab database, set MONGO_URL environment variable:

`export MONGO_URL=mongodb://user:password@foo.mongolab.com/db`

To run your Meteor application, simply execute `main.js`:

`node main.js`
