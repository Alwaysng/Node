const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


request('http://www.netbian.com/youxi/', (error, response, body) =>{
  console.log('body:', body); // Print the HTML for the Google homepage.
});