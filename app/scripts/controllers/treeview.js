var myApp = angular.module("employeeApp");
myApp.controller('TreeCtrl', ['$scope','$http','$location','$rootScope','$window','$state',function ($scope,$http,$location,$rootScope,$window,$state) {

$scope.baseUrl='http://localhost:1337'

//  $scope.example9data = [{team_id:1,team_name:"WEB"},{team_id:2,team_name:"REMP"}];
  $rootScope.example9model = [];
  $scope.example9settings = { enableSearch: true, scrollableHeight: '40vh', scrollable: true };

    function init() {

//----------------- Route Interception-------------------------//
   
        $http.get("http://localhost:1337/employee/treedata").success(function(result)
        {

             $rootScope.treeNodes = result;
             console.log(result);
        })

        //----------------To Get All Teams--------------------------------------------------//
        $http.get($scope.baseUrl + "/employee/company").success(function (result) {
           $scope.TeamDetails = [];
           for (i = 0; i < result.length; i++)
           {
               $scope.TeamDetails.push({
                   'name' : result[i].team_name,
                   'employee_count' : result[i].emp_count
               })
           }
           console.log($scope.TeamDetails)
       })

        //--------------------- To get list of qualifications--------------------------------------//
        $http.get('http://localhost:1337/employee/getQualification/').success(function (result) {     
                    $scope.qualification_list=result;
                })
                
        //----------------------To get list of certifications---------------------------------------//
        $http.get($scope.baseUrl+'/employee/getCertification/').success(function (result) {         
                    $scope.certification_list=result;
                })
        //---------------------To get list of codes------------------------------------------------//
         $http.get($scope.baseUrl+'/employee/getGenderCodeList/').success(function (result) {         
                    $scope.gender_list=result;
              
                })
         //---------------------To get list of teams----------------------------------------------//
             $http.get('http://localhost:1337/employee/team').success(function (result) {     
                   $rootScope.example9data =result;
                })
                
    }
    init();


      
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

    $scope.$on("load_tree", function () {
        $http.get("http://localhost:1337/employee/treedata").success(function(result)
        {
          
            $rootScope.treeNodes = result;
            console.log(result);
        })
        .error(function (result) {
            console.log(result);
        })
    })

    $scope.loadEmployeeData = function (emp_id) {
      $http.get("http://localhost:1337/employee/employeedata/" + emp_id).success(function (result) {
      $rootScope.employee = result[0]
      $rootScope.employeeId = $scope.selectedNode.id;
      $rootScope.emp = $scope.employee.personal[0];
      $rootScope.emp.dob = new Date(FormatDate($scope.emp.dob));  
      $rootScope.emp.doj = new Date(FormatDate($scope.emp.doj));  
      $rootScope.qualifications=$scope.employee.qualification;
      $rootScope.salary=$scope.employee.company;
      $rootScope.certifications=$scope.employee.certification;
    })
    }

    $scope.$on('selection-changed', function (e, node) {
                //node - selected node in tree
        $scope.selectedNode = node;
        if($scope.selectedNode.level=="emp")
        {
            $state.go('dashboard.emp');
            $http.get("http://localhost:1337/employee/employeedata/" + $scope.selectedNode.id).success(function (result) {
            $rootScope.employee = result[0]
            console.log( $rootScope.employee)
            $rootScope.employeeId = $scope.selectedNode.id;
            $rootScope.emp = $scope.employee.personal[0];
            $rootScope.emp.dob = new Date(FormatDate($scope.emp.dob));  
            $rootScope.emp.doj = new Date(FormatDate($scope.emp.doj));  
            $rootScope.qualifications=$scope.employee.qualification;
       
            $rootScope.salary=$scope.employee.company;
            $rootScope.teams = $scope.employee.team;
            $rootScope.certifications=$scope.employee.certification;
            })
        }
        else if($scope.selectedNode.level=="dpt")
        {
            $state.go("dashboard.dpt");
            $http.get("http://localhost:1337/employee/departmentdata/"+ $scope.selectedNode.id).success(function (result) {
                $scope.department = result
                console.log($scope.department);
            })
            .error(function (result) {

            })
        }
        else if ($scope.selectedNode.level == "root") {
            $state.go("dashboard.root")
        }    
    });

    $scope.$on('expanded-state-changed', function (e, node) {
        $scope.exapndedNode = node;
    });

    $scope.editEmployeeView = function() {

        $state.go("dashboard.edit")
    }

    $scope.addEmployeeView = function () {
      $rootScope.example9model = [];
      $rootScope.team_id = "";
      $state.go('dashboard.addEmployee');
    }

 

}]);
