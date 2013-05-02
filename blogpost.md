## Build Your Own Lead Capture Page with Meteor and MongoLab in Minutes

[Meteor](http://meteor.com) is a framework for building real-time client-server
applications in JavaScript. It works very nicely with MongoDB which gives you
idiomatic JavaScript storage. When hosting, you can easily use
[MongoLab](http://mongolab.com) as your backend MongoDB provider.

To demonstrate Meteor working with MongoLab, we walk you though building a
newsletter signup form application with persistance to MongoLab and 

Since MongoDB is a document-oriented database, it is very easy for you to
modify the application to store any data you want. In our example, we are
building this as an email newsletter signup system.

However, you could just as easily make this into a very simple CRM by capturing
additional fields like phone number, full name etc.

## Newsletter Signup App

Our newsletter signup app will consist of two views:

* User-facing landing page for people to enter their email address.
* Internal-facing page with tabular display of signups and other metadata such as timestamp, referrer.

## Landing Page Template

First we need a nice HTML page for the landing page. Meteor client-side
templates consist of mustache ...

## Data Display Table

For the internal-facing page with the tabular data, we need another HTML
template. Meteor will update this for us in realtime.

## Server-side

Meteor makes it super easy to handle the server-side component and marshalling
data to MongoDB. Our signup 
