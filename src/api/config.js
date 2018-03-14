'use strict'

const config = {
  site: '',
  method: ''
};
  
let needTokenReqs = () => [

];

export const ReqOpts = function () {
};
ReqOpts.prototype = {
    get (url) {
        if (url) {
        return needTokenReqs().indexOf(url);
        }
        return false;
    }
};

export const API_ROOT = ''.concat(config.site, config.method);
  