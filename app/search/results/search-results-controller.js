'use strict';

function SearchResultsController($scope, $state, $http) {
    $scope.query = $state.params.query;
    $scope.searchBy = $state.params.searchBy;

    $scope.result = '';
    $scope.$watch('query', function(val){
        if(val){
            search();
        }
    });

    $scope.$watch('searchBy', function(val){
        if(val){
            search();
        }
    });

    var getUrl = function(){
        return '/api/demo.json';
    };
    var search = function(){
        $http({
            method: 'GET',
            url: getUrl(),
            params:{
                area: $scope.searchBy,
                query: $scope.query
            }
        }).then(function(result){
            $scope.result = result.data;
        }, function(err){
            $scope.result = err.data;
        });
    };
}
SearchResultsController.$inject = ['$scope', '$state', '$http'];
module.exports = SearchResultsController;