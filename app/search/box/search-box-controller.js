'use strict';

function SearchBoxController($scope, $state) {
    $scope.selectedCriteria = 'Repository';
    $scope.criterias = ['Repository', 'Code', 'Issue', 'User'];
    $scope.query = '';

    $scope.select = function(criteria){
        $scope.selectedCriteria = criteria;
    };

    $scope.search = function(){
        $state.go('home.search', {query: $scope.query, searchBy: $scope.selectedCriteria});
    };

}
SearchBoxController.$inject = ['$scope', '$state'];
module.exports = SearchBoxController;