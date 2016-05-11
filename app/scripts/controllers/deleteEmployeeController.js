var app = angular.module('employeeApp');
app.controller("deleteCtrl", ["$scope", "$rootScope", "$http", "$state", function ($scope, $rootScope, $http, $state) {


    $scope.deleteEmpFromSystem = function () {
        console.log("Delete from system");
        $http.delete("http://localhost:1337/employee/employeedelete/?emp_id="+ $rootScope.DeleteEmpId).success(function (result) {
            $scope.$emit("load_tree", {});
            $state.go("dashboard");
        });
    };

    $scope.deleteEmpFromTeam = function () {
        console.log($rootScope.DeleteEmpId);
        var data = { team_id: $rootScope.DeleteTeamId };   
        $http.post("http://localhost:1337/employee/employeedelete/" + $rootScope.DeleteEmpId, data).success(function (result) {
            $scope.$emit("load_tree", {});
            $state.go("dashboard");         
        });
     
    };
}]);