var arc = require('@architect/functions');

function handler(payload, callback) {
  console.log(JSON.stringify(payload), null, 2);
  callback();
}

exports.handler = arc.events.subscribe(handler);
