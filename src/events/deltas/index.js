var arc = require('@architect/functions');
global.fetch = require('node-fetch');
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: process.env.DROPBOX_OAUTH_TOKEN });

function handler(payload, callback) {
  dbx.filesListFolder({ path: process.env.DROPBOX_PATH }).then(publishAll);

  callback();
}

function publishAll(filesMetadata) {
  console.log(filesMetadata);
  filesMetadata.entries.forEach(publishFile);
}

function publishFile(fileMetadata) {
  arc.events.publish({
    name: 'file',
    payload: {
      path: fileMetadata.path_lower
    }
  }, console.log);
}

exports.handler = arc.events.subscribe(handler);
