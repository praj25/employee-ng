var app = angular.module('employeeApp');

app.controller("empCtrl", ['$scope', '$rootScope', '$http', '$state', '$cookies', function ($scope, $rootScope, $http, $state, $cookies) {
 //---------------------------- To check permission-----------------------------------------//
   /* console.log($rootScope.permissionType)
    if ($rootScope.Isauthorized && $rootScope.Isauthorized != undefined && $rootScope.permissionType == "user") {
        $cookies.put("permissionType", $rootScope.permissionType);
        $cookies.put("Isauthorized", $rootScope.Isauthorized);
        $cookies.put("UserId", $rootScope.user_id);
        $rootScope.Isauthorized = false;
        $rootScope.permissionType = undefined;
    }

    if ($cookies.get("permissionType") != "user" || !$cookies.get("Isauthorized")) {
        $state.go("home");
    }
*/

//-----------------------Initialization-----------------------------------//
if($cookies.get("UserId")==undefined)
{

    var emp_id = $rootScope.user_id
        console.log("Emp: "+emp_id)
}
else
{
    var emp_id = $cookies.get("UserId");

}
    

    $scope.isMatch = true;
    $scope.isValid = true;
    $scope.isFilled = true;
    $scope.successMsg = false;

   function FormatDate(date) {
       date = date.toString();
       var year = (date.split('-')[0]);
       var month = (date.split('-')[1]);
       var day1 = (date.split('-')[2]);
       var day = (day1.split(" ")[0]);
     
       var formattedDate =day + "-" + month+ "-"+year;
         console.log(formattedDate);
       return formattedDate;
       
   };

//-------------------------------------To get user data--------------------------------------------//
            $http.get("http://localhost:1337/employee/employeedata/" + emp_id).success(function (result) {
            $scope.employee = result[0]
            $scope.employeeId = emp_id;
            $scope.emp = $scope.employee.personal[0];
            $scope.emp.dob = new Date(FormatDate($scope.emp.dob));
            $scope.emp.doj = new Date(FormatDate($scope.emp.doj));
            $scope.qualifications=$scope.employee.qualification;
            console.log($scope.qualifications);
            $scope.salary=$scope.employee.company;
            console.log($scope.salary);

            $scope.certifications=$scope.employee.certification;
            })
//--------------------- To Save New Password----------------//
    $scope.savePassword = function(user)
    {
        $scope.isMatch = match($scope.newPass, $scope.newPass1);
        $scope.isFilled = filled($scope.oldPass, $scope.newPass, $scope.newPass1);
        $scope.successMsg = false;
        //console.log($scope.isFilled + " " +$scope.isValid + " "+$scope.isMatch + " "  + $scope.successMsg)
        if ($scope.isMatch && $scope.isFilled)
        {
            var data = {
                oldPassword: $scope.oldPass,
                newPassword : $scope.newPass
            }
        
            $http.put("http://localhost:58213/api/login/" + emp_id,data).success(function (result) {
                $scope.isValid = result;
                if ($scope.isValid) {
                    $scope.successMsg = true;
                    $scope.isMatch = true;
                    $scope.isValid = true;
                    $scope.isFilled = true;
                    $scope.oldPass = "";
                    $scope.newPass = "";
                    $scope.newPass1 = "";
                }
                //console.log("Second: "+$scope.isFilled + " " + $scope.isValid + " " + $scope.isMatch + " " + $scope.successMsg)
            })
        }
    }
//-----------------  To Confirm Password-----------------//
    function match(pass1,pass2)
    {
        if (pass1 == pass2)
            return true;
        else
            return false;
    }
    function filled(oldPass, newPass, newPass1) {

        if (oldPass == undefined || oldPass == "" || newPass == undefined || newPass == "" || newPass1 == undefined || newPass1 == "")
            return false;
        else
            return true;
    }

}]);
