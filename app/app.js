'use strict';

require('angular');

var myApp = angular.module('myApp',
	[
		require('./common/common.js').name,
		require('./home').name,
		require('./search').name
	])
	.config(require('./appConfig'))
	.constant('version', require('../package.json').version)
	.run(require('./common/common-init.js'));

//This replaces ng-app attribute on html tag.
angular.element(document).ready(function() {
    angular.bootstrap(document, ['myApp']);
});


module.exports = myApp;
