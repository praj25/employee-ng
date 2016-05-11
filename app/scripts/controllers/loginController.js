var app = angular.module('employeeApp');
app.controller("LoginCtrl", ['$scope', '$state', '$rootScope', '$http', '$cookies', function ($scope, $state, $rootScope, $http, $cookies) {
    $scope.authenticated = true;
    $scope.Login = function (data) {
        console.log(data)
        $http.post("http://localhost:1337/login", data).success(function (result) {
            console.log(result);
            if (result.length == 0)

                $scope.authenticated = false
            else
            {
                $scope.authenticated = result[0].isValid;
                $rootScope.permissionType = result[0].permission;
                $rootScope.user_id = result[0].user_id;            
            }

            if ($scope.authenticated)
            {
                $rootScope.Isauthorized = true;
              
                if ($rootScope.permissionType == "admin")
                    $state.go("dashboard")
                if ($rootScope.permissionType == "user")
                    $state.go("employee")
            }

    });
      
    }
    $scope.LogOut = function()
    {

        $cookies.put("permissionType", undefined);
        $cookies.put("Isauthorized", undefined);
        $cookies.put("selectedEmployee", undefined);
        $cookies.put("selectedDepartment", undefined);
        
        $state.go("home");
    }


}])