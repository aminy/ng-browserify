'use strict';

module.exports = function() {
    return {
        controller: 'searchBoxController',
        template: require('./search-box.html'),
        restrict: 'EA',
        scope: true
    };
};