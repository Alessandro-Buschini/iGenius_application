console.log("app start");
let express = require('express');
let https = require('https');
let xml2js =require('xml2js');
let xpath = require('xpath')
let dom = require('xmldom').DOMParser
var jsonQuery = require('json-query')


let parser = new xml2js.Parser();
let app = express();


let xmlString = "";

app.get('/api/convert/:date/:src_currency/:dest_currency/:amount',(req, res) => {
    var xml={};
    https.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml',(resp)=>{
        //let xmlString = "";
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            xmlString += chunk.toString();
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(xmlString);
            console.log('xml retieved');
            parser.parseString(xmlString, function (err, json_obj) {
                //var result = json_obj[gesmes:Envelope]
                //res.send(result);
                //json_obj["gesmes:Envelope"]["Cube"][0]["Cube"][0/*da variare per cercare la data*/]["$"]["time"]=="2019-09-26";
                //for (let index = 0; index < json_obj["gesmes:Envelope"]["Cube"][0]["Cube"].length; index++) {
                //    const element = array[index];
                //             }
                json_data = json_obj["gesmes:Envelope"]["Cube"][0]["Cube"]
                var res_obj = convert(json_data,req.params.date,req.params.src_currency,req.params.dest_currency,req.params.amount);

                res.send(res_obj);
            });
            
            //parser.parseString(sol, (err,jsonData)=>{
            //    console.log(err);
                
                
            //    res.send(jsonData);
            //})
            //xml=xmlString;
        });//resp.on
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });//on  
});//app.get


function convert(json_data, date,from,to,value) {
    var from_rate,to_rate =0;
    if(from=="EUR"){
        from=1;
    }else{
        from_rate= json_data.find(y => y["$"]["time"]==date)["Cube"].find(y=> y["$"]["currency"]==from).$["rate"];
    }
    console.log(from_rate);
    
    to_rate= json_data.find(y => y["$"]["time"]==date)["Cube"].find(y=> y["$"]["currency"]==to).$["rate"];
    console.log(to_rate)
    converted_obj={
        "amount" : value/from_rate*to_rate,
        "currency": to
    };
    return converted_obj;
}





const port = process.env.PORT || 3000
app.listen(port, ()=> console.info("listening on port" + port+"..."));