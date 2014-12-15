// These routes are to define any app-level paths to modules. 
// For module-level route definitions, use the Routes.js files found in the module folders.

'use strict';


function appRoutes($stateProvider, $urlRouterProvider, $locationProvider) {

    // Add hasbang prefix for SEO and HTML5 mode to remove #! from the URL.
    // Html5 mode requires server-side configuration. See http://bit.ly/1qLuJ0v
    $locationProvider.html5Mode(true).hashPrefix('!');
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    // Now set up the states
    var home = {
        name: 'home', // state name
        template: '<div home-view></div>' // generate the Directive "pageView" - when calling the directive in HTML, the name must not be camelCased
    };

    var search = {
        name: 'home.search',
        url: '/?query&searchBy',
        template: '<div search-results-view></div>'
    };

    $stateProvider.state(home);
    $stateProvider.state(search);
}

appRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
module.exports = appRoutes;