var restify = require('restify');
var errs = require('restify-errors');

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

var LOGIN = "Marcel";
var PASS = "UTT2030";
var TOKEN = "523DA4B598A24F6DC4F68B8B237FA";
var ID_CHAUFFEUR = '4';


server.post('/mes_livraisons', function(req, res, next) {

  console.log("received : /mes_livraison : "+JSON.stringify(req.params));

  if(!req.params.TOKEN || req.params.TOKEN !== TOKEN) {
    res.send(new errs.UnauthorizedError("Bad token"));
  }else if(!req.params.FROM_ID || req.params.FROM_ID == 0){
      res.send({ livraisons : [
          {
            idLivraison: '1',
            libelleLivraison: "Supermarché",
            lat: '48.299953',
			lng: '4.096061',
			adresse : '25 rue Emile Zola, 75000 Paris',
            dateDeFin: new Date("2017-03-25T12:00:00Z").getTime(),
            statusActuel: '1'
          },
          {
            idLivraison: '2',
            libelleLivraison: "marché",
            lat: '48.297053',
			lng: '4.076061',
			adresse : '32 apt B rue Leroy, 59800 Lille',
            dateDeFin: new Date("2017-04-02T18:30:00Z").getTime(),
            statusActuel: '2'
          }
        ]});
  }else {
	res.send({ livraisons : []});
  }
  return next();
});

server.post('/connexion', function(req, res, next) {
  
  console.log("received : /connexion : "+JSON.stringify(req.params));
  
  if(!req.params.LOGIN || !req.params.PASS) {
	res.send(new errs.BadRequestError('Missing LOGIN and/or PASS parameters'));
  }else if(req.params.LOGIN == LOGIN && req.params.PASS == PASS){
	res.send({TOKEN:TOKEN, ID:ID_CHAUFFEUR});
  }else {
	res.send(new errs.UnauthorizedError("Bad credentials"));
  }
  return next();
});

server.post('/deconnexion', function(req, res, next) {
  
  console.log("received : /deconnexion : "+JSON.stringify(req.params));
  
  if(!req.params.TOKEN) {
	res.send(new errs.BadRequestError('Missing TOKEN parameters'));
  }else {
	res.send({});
  }
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
