let https = require('https');
let xml2js =require('xml2js');
let fs = require('fs')
let parser = new xml2js.Parser();


function download_data_and_store() {
    let xmlString = "";
    https.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml',(resp)=>{
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            xmlString += chunk.toString();
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //console.log(xmlString);
            console.log('xml retrieved');
            parse(xmlString).then((json_data)=>{
                fs.writeFileSync('stored_cleaned_data.json', JSON.stringify(json_data)); 
            }).catch((err)=>{
                console.log(err);
            });
            
        });//resp.on
    });//gttps.get
}

function load_from_stored_json() {
    return JSON.parse(fs.readFileSync('stored_cleaned_data.json', 'utf8'));
}

function parse(xmlString) {
    return new Promise((resolve,reject) => {
        parser.parseStringPromise(xmlString).then((json_obj)=>{
            json_data = json_obj["gesmes:Envelope"]["Cube"][0]["Cube"]
            resolve(json_data)   ;           
        }).catch((err)=>{
            console.log(err)
            reject(err);
        });
    });
}



function convert(json_data, date,from,to,value) {
    let from_rate=1,
        to_rate =1;
    
    if(json_data.find(y => y["$"]["time"]==date) == undefined){
        return ["wrong DATE",false];
    }else if(json_data.find(y => y["$"]["time"]==date)["Cube"].find(y=> y["$"]["currency"]==from) == undefined && from!="EUR"){
        return ["wrong SRC_CURRENCY",false];
    }else if(json_data.find(y => y["$"]["time"]==date)["Cube"].find(y=> y["$"]["currency"]==to) == undefined && to!="EUR"){
        return ["wrong DEST_CURRENCY",false];
    }if(isNaN(value)){
        return ["wrong. VALUE is not a number",false];
    }


    if(from!="EUR"){
        from_rate= json_data.find(y => y["$"]["time"]==date)["Cube"].find(y=> y["$"]["currency"]==from).$["rate"];
        //console.log(from_rate);
    };
    if(to!="EUR"){
        to_rate= json_data.find(y => y["$"]["time"]==date)["Cube"].find(y=> y["$"]["currency"]==to).$["rate"];
        //console.log(to_rate)
    };
        
    converted_obj={
        "amount" : value/from_rate*to_rate,
        "currency": to
    };
    return [converted_obj,true];
}

module.exports = {
    convert,
    download_data_and_store,
    parse,
    load_from_stored_json,
}

