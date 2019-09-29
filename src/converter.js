console.log("app start");
let express = require('express');
let https = require('https');
let logic = require('./logic')

let app = express();


let xmlString = "";



// USING URL PARAMETERS
app.get('/api/convert/:date/:src_currency/:dest_currency/:amount',(req, res) => {
    https.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml',(resp)=>{
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            xmlString += chunk.toString();
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log('xml retieved');
            //parse xml to json
            logic.parse(xmlString).then((json_data)=>{
                let conversion_results = logic.convert(json_data,req.params.date,req.params.src_currency,req.params.dest_currency,req.params.amount);
                ////console.log(conversion_results);
                if (conversion_results[1]) {
                    res.status(200).send(conversion_results[0]);
                } else {
                    res.status(400).send({'error': conversion_results[0]});
                }
            }).catch((err)=>{
                console.log(err);
                res.status(500).send("error during parsing... "+ err);
            });
        });//resp.on
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });//on  
});//app.get

app.get('/api/stored/convert/:date/:src_currency/:dest_currency/:amount',(req, res) => {
    var json_data = logic.load_from_stored_json();
    //var res_obj = logic.convert(json_data,req.params.date,req.params.src_currency,req.params.dest_currency,req.params.amount);
    //res.send(res_obj);
    let conversion_results = logic.convert(json_data,req.params.date,req.params.src_currency,req.params.dest_currency,req.params.amount);
    //console.log(conversion_results);
    if (conversion_results[1]) {
        res.status(200).send(conversion_results[0]);
    } else {
        res.status(400).send({'error': conversion_results[0]});
    }
});//app.get


//http://localhost:3000/api/stored/convert?reference_date=2019-09-06&src_currency=EUR&dest_currency=EUR&amount=10
app.get('/api/stored/convert',(req, res) => {
    if(req.query.amount==undefined||req.query.src_currency==undefined||req.query.dest_currency==undefined||req.query.reference_date==undefined){
        res_obj={'error': "bad query params"};
        res.status(400).send(res_obj);
    }
    var json_data = logic.load_from_stored_json();
    let conversion_results = logic.convert(json_data,req.query.reference_date,req.query.src_currency,req.query.dest_currency,req.query.amount);
    //console.log(conversion_results);
    if (conversion_results[1]) {
        res.status(200).send(conversion_results[0]);
    } else {
        res.status(400).send({'error': conversion_results[0]});
    }
});//app.get


app.get('/api/convert',(req, res) => {
    if(req.query.amount==undefined||req.query.src_currency==undefined||req.query.dest_currency==undefined||req.query.reference_date==undefined){
        res_obj={'error': "bad query params"};
        res.status(400).send(res_obj);
    }
    https.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml',(resp)=>{
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            xmlString += chunk.toString();
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log('xml retieved');
            //parse xml to json
            logic.parse(xmlString).then((json_data)=>{
                let conversion_results = logic.convert(json_data,req.query.reference_date,req.query.src_currency,req.query.dest_currency,req.query.amount);
                //console.log(conversion_results);
                if (conversion_results[1]) {
                    res.status(200).send(conversion_results[0]);
                } else {
                    res.status(400).send({'error': conversion_results[0]});
                }
            }).catch((err)=>{
                console.log(err);
                res.status(500).send("error during parsing... "+ err);
            });
        });//resp.on
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });//on  
});//app.get


const port = process.env.PORT || 3000
let server= app.listen(port, ()=> {
    console.info("listening on port" + port+"...");
    logic.download_data_and_store();
});

module.exports = server