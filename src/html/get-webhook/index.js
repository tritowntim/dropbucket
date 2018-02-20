var arc = require('@architect/functions')

function route(req, res) {
  //console.log(JSON.stringify(req, null, 2));

  var query = req.query;
  var challenge = query.challenge || 'error: no challenge param provided';

  res({ html: challenge });
}

exports.handler = arc.html.get(route);
