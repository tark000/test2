angular.module('realty').controller('NotariatController', ['$scope','$log','$state','OneNotariat','$sce',
    function ($scope,$log,$state,OneNotariat,$sce) {
        $scope.notariat = OneNotariat;

        $scope.text = $sce.trustAsHtml($scope.notariat.text)
    }]);