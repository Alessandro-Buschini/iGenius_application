# iGenius_application
Hosting the backend dev assignment solution By Alessandro Buschini

* [Installation](#Installation)
    * [Using Docker (suggested)](#Using-Docker-(suggested))
    * [Using npm](#Using-npm)
* [Run API](#Run-API)
* [Automated Tests](#Automated-Tests)


## Installation
There are 2 ways:
* [Using Docker (suggested)](#Using-Docker-(suggested))
* [Using npm](#Using-npm)

### Using Docker (suggested)
The API container is available [here](https://hub.docker.com/r/alessandrobuschini/igenius_assignment).
Once you have docker installed:
1. Run the container: 
```bash
docker run -p 3000:3000 alessandrobuschini/igenius_assignment:v1
```

2. The console output should be the following:
```bash
app start
listening on port 3000...
xml retrieved
```

3. now you can skip to the [Run API](#Run-API) section.
    
### Using npm
1. install Node.js and npm
2. install the following packages and dependences using:  npm install
```javascript 
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "express": "^4.17.1",
    "mocha": "^6.2.0",
    "xml2js": "^0.4.22"
```
3. clone this repo on your local folder
4. open a terminal in the just cloned folder and type
```bash
npm start
```
2. The console output should be the following:
```bash
app start
listening on port 3000...
xml retrieved
```



## Run API

NOTE: if you have mapped the container ports differently, or you have the variable <em>process.env.PORT</em> set, the URLs in the Example section should be adapted replacing the port 3000 with the port number chosen.

The Converter API is designed to handle requests both with url params and query parameters, and the user can also decide whether retrieve updated data from the online [link](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml) or use the <em><strong>stored data retrieved at project startup time.</strong></em>

### Examples 
Using real time online data:
* With url params
```bash
http://localhost:3000/api/convert/2019-09-06/EUR/JPY/10
```
* With query params
```bash
http://localhost:3000/api/convert?reference_date=2019-09-06&src_currency=EUR&dest_currency=JPY&amount=10
```
Using <em><strong>stored data retrieved at project startup time.</strong></em>
* With url params
```bash
http://localhost:3000/api/stored/convert/2019-09-06/EUR/JPY/10
```
* With query params
```bash
http://localhost:3000/api/stored/convert?reference_date=2019-09-06&src_currency=EUR&dest_currency=JPY&amount=10
```


## Automated Tests
The test cases cover multiple situations:
* the ones labelled with "OK" simulate correct use cases of the API checking the correctness of status code and fields (with corresponding values) of the object returned as response
* the ones labelled with "WRONG" simulate bad requests and the relative correct error handling, checking the status code and the error string returned as response.

There are 2 ways of runnuning the tests:
* [Testing Using Docker (suggested)](#Testing-using-docker-(suggested))
* [Testing Using npm](#Testing-using-npm)
* [Expected Results](#Expected-Results)

### Testing using Docker (suggested) 
The Test container is available [here](https://hub.docker.com/r/alessandrobuschini/igenius_assignment_test).
Once you have docker installed:
1. Run the container: 
```bash
docker run alessandrobuschini/igenius_assignment_test:v1
```

### Testing using npm 
1. install Node.js and npm
2. install the following packages and dependencies using:  npm install
```javascript 
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "express": "^4.17.1",
    "mocha": "^6.2.0",
    "xml2js": "^0.4.22"
```
3. clone this repo on your local folder
4. open a terminal in the just cloned folder and type
```bash
npm test
```

### Expected Results
Once the test have been started the expected output console should be as follow
```bash
Get Test-Cases from ONLINE DATASET
xml retrieved
xml retrieved
    √ Converting from api OK EUR to something (400ms)
xml retrieved
    √ Converting from api OK - EUR to EUR (158ms)
xml retrieved
    √ Converting from api OK - something to EUR (225ms)
xml retrieved
    √ Converting from api WRONG - bad reference_date. It is not available in the dataset.  (203ms)
xml retrieved
    √ Converting from api WRONG - bad src_currency. It is not available in the dataset.  (174ms)
xml retrieved
    √ Converting from api WRONG - bad src_currency. It is not available in the dataset.  (157ms)
xml retrieved
    √ Converting from api WRONG - bad src_currency.  VALUE is not a number.  (138ms)

  Get Test-Cases from STORED DATASET
    √ Converting from api OK EUR to something
    √ Converting from api OK - EUR to EUR
    √ Converting from api OK - something to EUR
    √ Converting from api WRONG - bad reference_date. It is not available in the dataset.
    √ Converting from api WRONG - bad src_currency. It is not available in the dataset.
    √ Converting from api WRONG - bad src_currency. It is not available in the dataset.
    √ Converting from api WRONG - bad src_currency.  VALUE is not a number.

  Get Test-Cases WITH QUERY PARAMS from ONLINE DATASET
xml retrieved
    √ Converting from api OK EUR to something (170ms)
xml retrieved
    √ Converting from api OK - EUR to EUR (171ms)
xml retrieved
    √ Converting from api OK - something to EUR (140ms)
xml retrieved
    √ Converting from api WRONG - bad reference_date. It is not available in the dataset.  (119ms)
xml retrieved
    √ Converting from api WRONG - bad src_currency. It is not available in the dataset.  (178ms)
xml retrieved
    √ Converting from api WRONG - bad dest_currency. It is not available in the dataset.  (129ms)
xml retrieved
    √ Converting from api WRONG - bad amount.  VALUE is not a number.  (141ms)

  Get Test-Cases WITH QUERY PARAMS from STORED DATASET
    √ Converting from api OK EUR to something
    √ Converting from api OK - EUR to EUR
    √ Converting from api OK - something to EUR
    √ Converting from api WRONG - bad reference_date. It is not available in the dataset.
    √ Converting from api WRONG - bad src_currency. It is not available in the dataset.
    √ Converting from api WRONG - bad dest_currency. It is not available in the dataset.
    √ Converting from api WRONG - bad amount.  VALUE is not a number.


  28 passing (3s)
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
<a name="RunAPI"></a>
