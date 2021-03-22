//Code eample https://developer.yahoo.com/weather/documentation.html#oauth-javascript

var $ = require("jquery");
var CryptoJS = require("crypto-js");
var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
var method = 'GET';
var app_id = 'fBWKZ7i5';
var consumer_key = 'dj0yJmk9T1JNZEhhb0wwSUt2JmQ9WVdrOVprSlhTMW8zYVRVbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTY0';
var consumer_secret = '6c869b332da8fe69d0483e46b5aac36c7408c36f';
var concat = '&';
var query = {'location': 'dublin', 'format': 'json'};
var oauth = {
    'oauth_consumer_key': consumer_key,
    'oauth_nonce': Math.random().toString(36).substring(2),
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
    'oauth_version': '1.0'
};


//*****Authentcating api request
var merged = {};
$.extend(merged, query, oauth);
// Note the sorting here is required
var merged_arr = Object.keys(merged).sort().map(function(k) {
  return [k + '=' + encodeURIComponent(merged[k])];
});
var signature_base_str = method
  + concat + encodeURIComponent(url)
  + concat + encodeURIComponent(merged_arr.join(concat));

var composite_key = encodeURIComponent(consumer_secret) + concat;
var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
var signature = hash.toString(CryptoJS.enc.Base64);

oauth['oauth_signature'] = signature;
var auth_header = 'OAuth ' + Object.keys(oauth).map(function(k) {
  return [k + '="' + oauth[k] + '"'];
}).join(',');
//*****Authentcating api request]


//Sending Jquary request to GET data
$.ajax({
  url: url + '?' + $.param(query),
  headers: {
    'Authorization': auth_header,
    'X-Yahoo-App-Id': app_id
  },
  method: 'GET',
  success: function(data){
    console.log(data);
  }
});
