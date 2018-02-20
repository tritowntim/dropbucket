var arc = require('@architect/functions')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2));

  const body = req.body || 'error: request has no body';

  res({
    json: { payload: body } 
  })
}

exports.handler = arc.json.post(route);
