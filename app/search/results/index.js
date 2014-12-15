'use strict';

module.exports = angular.module('search-results',[])
    .directive('searchResultsView', require('./search-results-directive.js'))
    .controller('searchResultsController', require('./search-results-controller.js'));