var app = angular.module("employeeApp");
app.controller("teamCtrl", ['$scope', '$http', '$state', '$rootScope', function ($scope, $http, $state, $rootScope) {
    $scope.saveTeamData = function(teamData)
    {

        data = {
            team_name : teamData.name,
            team_desc : teamData.desc
        }
        $http.post("http://localhost:58213/api/team", data).success(function () {
            $scope.$emit("load_tree", {});
            $state.go("dashboard");
        })

    }

    $scope.editTeamData = function (team) {
 
        if ($scope.department[0].deptName != "" && $scope.department[0].description != "")
        {
            data = {
                team_name: $scope.department[0].deptName,
                team_desc: $scope.department[0].description
            }
            $http.put("http://localhost:58213/api/team/" + $rootScope.team_id, data).success(function () {
                $scope.$emit("load_tree", {})
                $state.go("dashboard.dpt")
            })
        }
    
    };


    $scope.deleteTeam = function () {
        console.log("delete team");
        $http.delete("http://localhost:58213/api/team/" + $rootScope.deleteTeam_id)
            .success(function (result) {
            console.log(result);
            $scope.$emit("load_tree")
            $state.go("dashboard");
            })
            
            
    };
}])