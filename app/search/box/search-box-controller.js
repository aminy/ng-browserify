'use strict';

function SearchBoxController($scope, $state) {
    $scope.selectedCriteria = 'Unicorns';
    $scope.criterias = ['Unicorns', 'Rainbows'];
    $scope.query = '';

    $scope.select = function(criteria){
        $scope.selectedCriteria = criteria;
    };

    $scope.search = function(){
        $state.go('home.search', {query: $scope.query, searchBy: $scope.selectedCriteria});
    };

    $scope.searchOnEnter = function(event) {
        if (event) {
            if (event.keyCode === 13) {
                $scope.search();
            }
        }
    };
}
SearchBoxController.$inject = ['$scope', '$state'];
module.exports = SearchBoxController;