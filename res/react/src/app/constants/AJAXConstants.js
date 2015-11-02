'use strict';

var btoa = require('btoa');

var AJAXConstants = {
  defaultOptions: {
    xhrFields: {
      withCredentials: true
    }
    /*beforeSend: function(xhr) { 
      xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password)); 
    },*/
  }
}

module.exports = AJAXConstants;