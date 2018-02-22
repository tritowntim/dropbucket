var arc = require('@architect/functions')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2));

  const body = req.body || 'error: request has no body';

  arc.events.publish({
    name: 'deltas',
    payload: body
  });

  res({});
}

exports.handler = arc.json.post(route);
