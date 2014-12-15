'use strict';

module.exports = angular.module('home',[])
    .directive('homeView', require('./home-directive'))
    .controller('homeController', require('./home-controller'));