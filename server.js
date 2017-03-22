'use strict';
// Quick hack demonstration on
// Thornton's Printers Numbering Script
// from http://www.thorntonsprinters.com/num_gen.php
// @author Alm

const express = require('express');
const app = express();

app.get('/', function(req, res) {
  console.log(req.query);
  if(!req.query.sheets || !req.query.ticketsPerSheet) {
      res.setHeader('content-type', 'text/html');

      const params = '<ul><li>sheets (number, required)</li>'+
                     '<li>ticketsPerSheet (number, required)</li>'+
                     '<li>prefix (string): <a href=?sheets=10&ticketsPerSheet=5&prefix=A">http://localhost:3000/generate?sheets=10&ticketsPerSheet=5&prefix=A</a></li>'+
                     '<li>suffix (string)  <a href="?sheets=10&ticketsPerSheet=5&suffix=B">http://localhost:3000/generate?sheets=10&ticketsPerSheet=5&suffix=B</a></li>'+
                     '<li>startNumber (number) <a href="?sheets=10&ticketsPerSheet=5&startNumber=5">http://localhost:3000/generate?sheets=10&ticketsPerSheet=5&startNumber=5</a></li>'+
                     '<li>leadingZeros (number) <a href="?sheets=10&ticketsPerSheet=5&leadingZeros=10">http://localhost:3000/generate?sheets=10&ticketsPerSheet=5&leadingZeros=10</a></li>'+
                     '<li>counterFoil (boolean) <a href="?sheets=10&ticketsPerSheet=5&counterFoil=true">http://localhost:3000/generate?sheets=10&ticketsPerSheet=5&counterFoil=true</a></li>';


      res.send('Example: <a href="?sheets=10&ticketsPerSheet=5">http://localhost:3000/generate?sheets=10&ticketsPerSheet=5</a><p><b>Parameters</b></p>'+params);
  } else {
    let leadingZeros = parseInt(req.query.leadingZeros);
    if(isNaN(leadingZeros)) {
      leadingZeros = 0;
    }
    let startNumber = parseInt(req.query.startNumber);
    if(isNaN(startNumber)) {
      startNumber = 0;
    }

    res.setHeader('content-type', 'text/plain');
    res.send(generateNumbers(
         parseInt(req.query.sheets),
         parseInt(req.query.ticketsPerSheet),
         req.query.prefix,
         req.query.suffix,
         startNumber,
         leadingZeros,
         req.query.counterFoil));
  }
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

const generateNumbers = (sheets, ticketsPerSheet, prefix = '', suffix = '',
    startNumber = 0, leadingZeros = 0, counterFoil = false) => {

    let result = '';
    
    for (let i = 0; i < sheets; i++) {
        for (let j = 0; j < ticketsPerSheet; j++) {
          const number = startNumber+sheets*j+i;
          let zeros = '';
          if(leadingZeros-number.toString().length > 0) {
            zeros = '0'.repeat((leadingZeros-number.toString().length));
          }
          const row = prefix+zeros+(startNumber+sheets*j+i)+suffix;
          if(counterFoil) {
            result = result.concat('\"'+row+'\", \"'+row+'\"\n');
          } else {
            result = result.concat('\"'+row+'\"\n');
          }
        }
    }
    result = result.concat('');
    return result;
};


/*
const sheets = 100;
const ticketsPerSheet = 10;
const prefix = '#';
const suffix = '';
const startNumber = 5;
const leadingZeros = 5;
const counterFoil = false;

console.log(generateNumbers(
    sheets,
    ticketsPerSheet,
    prefix,
    suffix,
    startNumber,
    leadingZeros,
    counterFoil));
*/
