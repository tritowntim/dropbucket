global.fetch = require('node-fetch');
var arc = require('@architect/functions')
var AWS = require('aws-sdk');
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: process.env.DROPBOX_OAUTH_TOKEN });
var fs = require('fs');
var request = require('request');
var PassThrough = require('stream').PassThrough;
var mime = require('mime-types');

function handler(record, callback) {
  console.log(JSON.stringify(record), null, 2);

  pipeToS3(record.path);

  callback();
}

function getTemporaryLink(dropboxLink) { return dropboxLink.link }; 

function pipeToS3(path) {
  console.log(path);
  var s3 = new AWS.S3({ apiVersion: '2006-03-01' });
  var key = path.split('/').pop();
  dbx
    .filesGetTemporaryLink({ path: path })
    .then(getTemporaryLink)
    .then(log)
    .then(function put(url) { 
      return s3.upload({ 
        Bucket: process.env.BUCKET,
        Key: key,
        ContentType: mime.lookup(key),
        CacheControl: 'no-cache',
        Body: getStream(url)
      }).promise()
    })
    .then(log)
}

function getStream(url) {
  var stream = request(url);
  var passthrough = new PassThrough();
  stream.pipe(passthrough);
  return passthrough;
}

function log(obj) {
  console.log(obj);
  return obj;
}

exports.handler = arc.events.subscribe(handler);
