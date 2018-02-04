var express = require('express');
var request = require('request');
var ejs = require('ejs');
var ejsMate = require('ejs-mate'); 
var bodyParser = require('body-parser');

var publishableKey = "pk_test_7E9MXx8EBKLczZ8cbimXrxOe";
var secretKey = "sk_test_gDk4NwJIibaNmXJ2K4tWKYYm";

var stripe = require("stripe")(secretKey);
var app = express();

app.use(express.static(__dirname + '/public'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(require("body-parser").urlencoded({extended: true}));

// 
app.get('/', function(req, res) {
    request('https://api.coinmarketcap.com/v1/ticker/', function(error, response, body) {
        request('https://api.coinmarketcap.com/v1/global/', function(error2, response2, body2) {
            var chart = JSON.parse(body);
            var globalCap = JSON.parse(body2).total_market_cap_usd;
            // res.json(chart);
            // Create variables and objects here
            var BTCsupply = chart[0].total_supply;
            var BTCprice = chart[0].price_usd;

            res.render('SatoshiCap.ejs', { data: chart, BTCsupply: BTCsupply, BTCprice: BTCprice, globalCap: globalCap });
        });
    });
});    
app.get('/buy', function(req, res) {
    request('https://api.coinmarketcap.com/v1/ticker/', function(error, response, body) {
        var chart = JSON.parse(body);
        var BTCprice = Number(chart[0].price_usd).toFixed(2);
        res.render('Purchase.ejs', { keyPublishable: publishableKey, BTCprice: BTCprice });
    });
});

var PORT = 3000;

app.listen(PORT, function(err, res) {
    if (err) {
        throw err;
    }
    console.log('Magic happens in port:' + PORT);
});