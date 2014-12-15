'use strict';

module.exports = angular.module('search-box',[])
    .directive('searchBoxView', require('./search-box-directive.js'))
    .controller('searchBoxController', require('./search-box-controller.js'));