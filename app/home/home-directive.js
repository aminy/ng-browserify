'use strict';

module.exports = function() {
    return {
        controller: 'homeController',
        template: require('./home.html'),
        restrict: 'EA',
        scope: true
    };
};