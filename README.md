mongolab-meteor-leadcapture-app
===============================

Sample app &amp; blog post for [MongoLab](http://mongolab.com) / [Meteor](http://meteor.com) integration

This is a simple lead form / CRM for a website. There will be two views:

* Entry view - similar to the lead form on [FrozenRidge.co](http://frozenridge.co)
* Admin view - tablular view of leads

Views will utilize Meteor to update live, in realtime. Backend will be MongoLab.


## Usage

You need to have meteor installed:

`curl https://install.meteor.com | sh`

Now run the app from the `app` directory:

`cd app; meteor`

You should be able to access the app at http://localhost:3000/

```
$ meteor
[[[[[ ~/projects/node/mongolab-meteor-leadcapture-app/app ]]]]]

=> Meteor server running on: http://localhost:3000/
```

## Bundling

To deploy this so it can run with MongoLab, you need to generate the "bundle":

`meteor bundle sample.tar.gz`

This generates a tarball named `sample.tar.gz` which is essentially the meteor
app compiled to Node.JS.

This can then be run just like a normal Node.JS app (`npm install`, `npm
start`). A MongoLab database can be used by creating a database at
http://mongolab.com and setting the environment variable MONGO_URL to the
MongoDB URI provided by MongoLab. Sandbox plans that give you .5GB of storage
are free.

## Blog Post

A blog post with a detailed walkthrough of the app is at the [MongoLab blog](http://blog.mongolab.com/foo)
