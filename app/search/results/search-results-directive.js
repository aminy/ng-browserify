'use strict';

module.exports = function() {
    return {
        controller: 'searchResultsController',
        template: require('./search-results.html'),
        restrict: 'EA',
        scope: true
    };
};
