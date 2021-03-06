var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, 'utf8', function(err, sites){
    if (err) throw err;
    console.log(sites);
    sites = sites.split('\r\n')
    cb(sites);
  })
};

exports.isUrlInList = function(url, cb){
  exports.readListOfUrls(function(sites){
    if (sites.indexOf(url) !== -1){
      cb(true);
    }{
      cb(false);
    }
  })
};

exports.addUrlToList = function(url, cb){
  url = '\r\n' + url.substring(1);
  fs.appendFile(exports.paths.list, url, function(err){
    if (err){ console.log(err); cb(false); }
    else {
      cb(true);
    }
  })
};

exports.isUrlArchived = function(file, cb){
  file = file.substring(1)
  fs.exists(exports.paths.archivedSites + '/www.' + file, function(bool){
    cb(bool);
  })
};

exports.downloadUrls = function(){
};
