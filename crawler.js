var request = require('request');
var cheerio = require('cheerio');
var fs = require("fs");
var year = 2017;
var month = 5;
var url = 'http://www.cwb.gov.tw/V7/climate/monthlyData/Data/mD' + year + month +'.htm';
request(url, function(err, res, body){

    var $ = cheerio.load(body);
    var data = []
    $('.Form00 tr td').each(function(i, elem){
        data.push($(this).text());
    });
    var output = [];
    for (var i = 1; i < data.length / 12; i++) {
        output.push({
            location: data[i * 12],
            rain: data[i * 12 + 4],
            sun_time: data[i * 12 + 11]
        });
    }
    fs.writeFileSync("result.json", JSON.stringify(output));
    console.log(output);

});
