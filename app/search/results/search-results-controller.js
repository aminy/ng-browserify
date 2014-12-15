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
        var host = 'https://api.github.com';
        if ($scope.searchBy === 'Repository'){
            return host + '/search/repositories';
        }else if ($scope.searchBy === 'Code'){
            return host + '/search/code';
        }else if ($scope.searchBy === 'Issue'){
            return host + '/search/issues';
        }else if ($scope.searchBy === 'User'){
            return host + '/search/users';
        }
    };
    var search = function(){
        $http({
            method: 'GET',
            url: getUrl(),
            params:{
                q: $scope.query
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