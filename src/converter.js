console.log("app start");
let express = require('express');
let https = require('https');
let xml2js =require('xml2js');
let fs = require('fs')

let parser = new xml2js.Parser();
let app = express();


let xmlString = "";

app.get('/api/convert/:date/:src_currency/:dest_currency/:amount',(req, res) => {
    https.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml',(resp)=>{
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            xmlString += chunk.toString();
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(xmlString);
            console.log('xml retieved');

            parser.parseString(xmlString, function (err, json_obj) {
                json_data = json_obj["gesmes:Envelope"]["Cube"][0]["Cube"]
                var res_obj = convert(json_data,req.params.date,req.params.src_currency,req.params.dest_currency,req.params.amount);

                res.send(res_obj);
            });
            
        });//resp.on
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });//on  
});//app.get




function load_data_and_store() {
    https.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml',(resp)=>{
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            xmlString += chunk.toString();
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(xmlString);
            console.log('xml retieved');

            parser.parseString(xmlString, function (err, json_obj) {
                json_data = json_obj["gesmes:Envelope"]["Cube"][0]["Cube"]
                fs.writeFileSync('stored_cleaned_data.json', JSON.stringify(json_data));               
            });
            
        });//resp.on
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });//on  
}


function convert(json_data, date,from,to,value) {
    var from_rate,to_rate =0;
    if(from=="EUR"){
        from_rate=1;
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
app.listen(port, ()=> {
    console.info("listening on port" + port+"...");
    load_data_and_store();
});