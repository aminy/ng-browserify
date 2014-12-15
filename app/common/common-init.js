'use strict';

function commonInit($rootScope) {

    // Make sure the portal scrolls to the top on all state transitions
    $rootScope.$on('$viewContentLoaded', function(){
        if (document.readyState === 'complete') {
            window.scrollTo(0, 0);
        }
    });
}

commonInit.$inject = ['$rootScope'];
module.exports = commonInit;