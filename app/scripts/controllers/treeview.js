var myApp = angular.module("employeeApp");
myApp.controller('TreeCtrl', ['$scope','$http','$location','$rootScope','$window','$state',function ($scope,$http,$location,$rootScope,$window,$state) {

$scope.baseUrl='http://localhost:1337'
    function init() {

//----------------- Route Interception-------------------------//
   
        $http.get("http://localhost:1337/employee/treedata").success(function(result)
        {
             $scope.treeNodes = result;

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

    $scope.$on('selection-changed', function (e, node) {
                //node - selected node in tree
        $scope.selectedNode = node;
        if($scope.selectedNode.level=="emp")
        {
            $state.go('dashboard.emp');
            $http.get("http://localhost:1337/employee/employeedata/" + $scope.selectedNode.id).success(function (result) {
            $scope.employee = result[0]
            $scope.employeeId = $scope.selectedNode.id;
            $scope.emp = $scope.employee.personal[0];
            $scope.emp.dob = new Date(FormatDate($scope.emp.dob));  
            $scope.emp.doj = new Date(FormatDate($scope.emp.doj));  
            $scope.qualifications=$scope.employee.qualification;
       
            $scope.salary=$scope.employee.company;
        

            $scope.certifications=$scope.employee.certification;
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
        // node - the node on which the expanded state changed
        // to see the current state check the expanded property
        $scope.exapndedNode = node;
        //console.log(node.expanded);
    });

    $scope.editDisplay = function() {

        $state.go("dashboard.edit")
    }

    $scope.addEmployeeView = function () {
       // $rootScope.example9model = [];
        //$rootScope.team_id = "";
         $state.go('dashboard.addEmployee');
    }

 

}]);
