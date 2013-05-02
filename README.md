mongolab-meteor-sample
======================

Sample app &amp; blog post for MongoLab / Meteor integration

This is a simple lead form / CRM for a website. There will be two views:

* Entry view - similar to the lead form on FrozenRidge.co
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
[[[[[ ~/projects/node/mongolab-meteor-sample/app ]]]]]

=> Meteor server running on: http://localhost:3000/
```

## Bundling

To deploy this so it can run with MongoLab, you need to generate the "bundle":

`meteor bundle sample.tar.gz`

This generates a tarball named `sample.tar.gz` which is essentially the meteor
app compiled to Node.JS.

This can then be run just like a normal Node.JS app (`npm install`, `npm
start`). The MongoLab database can be used by setting environment variable
`MONGODB_URI`.
