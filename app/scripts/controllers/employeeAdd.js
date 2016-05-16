var myApp = angular.module("employeeApp");
myApp.controller('EmployeeAdd', ['$scope','$http','$location','$rootScope','$state',function ($scope,$http,$location,$rootScope,$state) {

    $scope.salary=[];
    $scope.teamList = [];
    $scope.qualifications=[];
    $scope.certifications=[];
    $scope.validEmail=true;


	$http.get("http://localhost:1337/employee/getSalary").success(function(result){
    	$scope.roleList=result;
    })

			
	function validateDate(salaryYear, joiningYear) {
        if (salaryYear >= joiningYear)
            return true;
        else
            return false;
    }

    $scope.addSalary = function (newSalary) {

        var duplicateFlag = false;
        if (document.getElementById("newSalaryRole").selectedIndex > 0 && document.getElementById("salaryYear").value && document.getElementById("salarySalary").value && document.getElementById("salaryLeaves").value && document.getElementById("salaryBonus").value && document.getElementById("newSalaryRole").value) {

            for (i = 0; i < $scope.salary.length; i++)
                if ($scope.salary[i].year == newSalary.year)
                    duplicateFlag = true;

            if ($scope.user == undefined || $scope.user.doj == undefined) {
                $scope.ErrorMessage = "Please Provide Date Of Joining.";
                $("#invalidYear").modal();
                return;
            }
            var date = $scope.user.doj.toString();
            var year = date.split(" ")[3]; //-----Get joining year-------
    
            var isValid = validateDate($scope.newSalary.year, year)

            if(isValid)
            {
                if (!duplicateFlag)
                 {
                    $scope.salary.push({ 'year': newSalary.year, 'salary': newSalary.salary, 'leaves': newSalary.leaves, 'bonus': newSalary.bonus, 'role': newSalary.selected_role.role, 'code': newSalary.selected_role.code})
                    document.getElementById("newSalaryRole").selectedIndex;
                    document.getElementById("salaryYear").value = "";
                    document.getElementById("salarySalary").value = "";
                    document.getElementById("salaryLeaves").value = "";
                    document.getElementById("salaryBonus").value = "";
                    document.getElementById("newSalaryRole").value = ""
                }
            }
            else {
                $scope.ErrorMessage = "Salary Year is less than Date of Joining.";
                $("#invalidYear").modal();
            }
        }
        //---------------Sorting according to the year-------------------------//			
        $scope.salary.sort(function (a, b) {
            if (a.year < b.year)
                return 1;
            if (a.year > b.year)
                return -1;
            return 0;
        });
    }


	$scope.addQualification = function(user){
 		var duplicateFlag=false
 			if(document.getElementById("select_qualificaion").selectedIndex >0 && document.getElementById("percentage").value){                 
 				for(i=0;i<$scope.qualifications.length;i++)
 					if($scope.qualifications[i].name==user.qualification_selected.name)
 						duplicateFlag=true;

 					if(!duplicateFlag)
 					$scope.qualifications.push({'name': user.qualification_selected.name, 'percentage':user.percentage,'qualification_code': user.qualification_selected.code,'add':true});
 				}
		}
											
//------------------------- Add Certification------------------------------------//				
		$scope.addCertification = function(user){
				var duplicateFlag=false;
 				if(document.getElementById("select_certification").selectedIndex >0 && document.getElementById("year").value){
 						for(i=0;i<$scope.certifications.length;i++)
 							if($scope.certifications[i].certification_name==user.certification_selected.certification_name)
 								duplicateFlag=true;

 						if(!duplicateFlag)
 						$scope.certifications.push({'certification_name': user.certification_selected.certification_name, 'year':user.year,'certification_code':user.certification_selected.certification_code,'add':true})		
			}
		}

//------------------------------Delete Certification-----------------------------//
    $scope.delete = function (btn) {
        $scope.buttonClicked = btn;
        $scope.deleteId = this.$index;
    }
//----------------------------- Delete Functiions------------------------------------//
    $scope.deleteQualification = function() {
        if($scope.deleteId!=undefined){
            $scope.qualifications.splice($scope.deleteId, 1);
        }
    }
    $scope.deleteCertification = function () {
        if ($scope.deleteId != undefined) {
            $scope.certifications.splice($scope.deleteId, 1);
        }
    }
    $scope.deleteSalary = function () {
        if ($scope.deleteId != undefined) {
            $scope.salary.splice(this.$index, 1);
        }
    }


    $scope.validateEmail = function(email)
    {
        $scope.validEmail = true;
        $http.get("http://localhost:1337/employee/getemaillist").success(function (result) {
            var emailList = result;
            for (i = 0; i < emailList.length; i++)
            {
                if (emailList[i].email_id == email)
                    $scope.validEmail = false;                  
            }
    })
    }

    function getTeamList()
    {
        $scope.teamList = [];
        for(i=0;i<$rootScope.example9model.length;i++)
        {
            $scope.teamList.push($rootScope.example9model[i].id);
        }
    }
       


    $scope.AddEmployee = function (emp) {

        getTeamList();

        var data = {
            fname: emp.fname,
            lname: emp.lname,
            mobile_no: emp.mobile_no,
            email_id: emp.email_id,
            gender : emp.gender,
            dob: emp.dob,
            address: emp.address,
            city: emp.city,
            state: emp.state,
            country: emp.country,
            pincode: emp.pincode,
            doj: emp.doj,
            pf_no: emp.pf_no,
            user_type: "u",
            teamList: $scope.teamList
        }

        $http.post("http://localhost:1337/employee/addEmployee",data).success(function (result) {
         
            $rootScope.$emit("loadTree", {});
            var emp_id = result[0].emp_id;
            alert(emp_id);

            for (i = 0; i < $scope.qualifications.length; i++) {

                $http.post("http://localhost:1337/employee/insertQualification", {
                    emp_id: emp_id,
                    qualification_code: $scope.qualifications[i].qualification_code,
                    percentage: $scope.qualifications[i].percentage
                }).success(function (result) {
                    console.log(result)
                });
            }

            for (i = 0; i < $scope.certifications.length; i++) {
                $http.post("http://localhost:1337/employee/insertCertification",
                {
                    emp_id: emp_id,
                    year: $scope.certifications[i].year,
                    certification_code: $scope.certifications[i].certification_code
                }).success(function (result) {
                    console.log(result);
                })
            }

            for (i = 0; i < $scope.salary.length; i++) {
                $http.post("http://localhost:1337/employee/salary",
                {
                    emp_id: emp_id,
                    year: $scope.salary[i].year,
                    salary: $scope.salary[i].salary,
                    bonus: $scope.salary[i].bonus,
                    leaves: $scope.salary[i].leaves,
                    code: $scope.salary[i].code
                }).success(function (result) {
                    alert(result)
                    console.log(result);
                })
            }
            
            $state.go('dashboard.emp');
            $scope.loadEmployeeData(emp_id);
            $scope.$emit("load_tree");
            })
           .error(function () {
                alert("here");
            })     
    }




}]);