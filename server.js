var express = require('express');
var request = require('request');
var ejs = require('ejs');
var ejsMate = require('ejs-mate'); 

var app = express();

app.use(express.static(__dirname + '/public'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
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
app.get('/miner', function(req, res) {
    res.render('Miner.ejs');
});

var PORT = 80;

app.listen(PORT, function(err, res) {
    if (err) {
        throw err;
    }
    console.log('Magic happens in port:' + PORT);
});