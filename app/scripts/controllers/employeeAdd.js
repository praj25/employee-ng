var myApp = angular.module("employeeApp");
myApp.controller('EmployeeAdd', ['$scope','$http','$location',function ($scope,$http,$location) {

			$http.get("http://localhost:1337/employee/getSalary").success(function(result){
	$scope.roleList=result;
})

			$scope.salary=[];
			$scope.qualifications=[];
			$scope.certifications=[];

			$scope.addSalary = function(newSalary){
				
				var duplicateFlag=false;
 				//console.log(newSalary)
 				if(document.getElementById("newSalaryRole").selectedIndex >0 && document.getElementById("salaryYear").value && document.getElementById("salarySalary").value && document.getElementById("salaryLeaves").value && document.getElementById("salaryBonus").value && document.getElementById("newSalaryRole").value){
 					console.log("newSalary");
 						for(i=0;i<$scope.salary.length;i++)
 							if($scope.salary[i].year==newSalary.year)
 								duplicateFlag=true;
					console.log(duplicateFlag)
 						if(!duplicateFlag)
 						{
 							$scope.salary.push({'year': newSalary.year, 'salary':newSalary.salary,'leaves':newSalary.leaves,'bonus':newSalary.bonus,'role':newSalary.selected_role.role,'add':true})		
							document.getElementById("newSalaryRole").selectedIndex;
							document.getElementById("salaryYear").value="";
							document.getElementById("salarySalary").value="";
							document.getElementById("salaryLeaves").value="";
							document.getElementById("salaryBonus").value="";
							document.getElementById("newSalaryRole").value=""
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
}]);