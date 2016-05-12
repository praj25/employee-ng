var myApp = angular.module("employeeApp");
myApp.controller('editCtrl', ['$scope','$http','$location','$state',function ($scope,$http,$location,$state) {


$scope.deletedCertifications = [];
$scope.deletedQualifications = [];
$scope.deletedSalary = [];
$scope.newSalary = [];
$http.get("http://localhost:1337/employee/getSalary").success(function(result){
	$scope.roleList=result;
})
//-----------------------------To add qualification-------------------------------//
 		$scope.addQualification = function(user){
 			var duplicateFlag=false
 				if(document.getElementById("select_qualificaion").selectedIndex >0 && document.getElementById("percentage").value){                 
 					for(i=0;i<$scope.qualifications.length;i++)

 						if($scope.qualifications[i].degree==user.qualification_selected.name)
 							duplicateFlag=true;

 					if(!duplicateFlag)
 					$scope.qualifications.push({'degree': user.qualification_selected.name, 'percentage':user.percentage,'qualification_code': user.qualification_selected.code,'add':true});
 				}
		}
//------------------------- Add Certification------------------------------------//				
		$scope.addCertification = function(user){
				var duplicateFlag=false;
 				if(document.getElementById("select_certification").selectedIndex >0 && document.getElementById("year").value){
 						for(i=0;i<$scope.certifications.length;i++)
 							if($scope.certifications[i].certification==user.certification_selected.certification_name)
 								duplicateFlag=true;

 						if(!duplicateFlag)
 						$scope.certifications.push({'certification': user.certification_selected.certification_name, 'year':user.year,'certification_code':user.certification_selected.certification_code,'add':true})		
			}
		}
//---------------------------Add Salary-----------------------------------------//
		$scope.addSalary = function(newSalary){
				var duplicateFlag=false;
 				console.log(newSalary)
 				if(document.getElementById("newSalaryRole").selectedIndex >0 && document.getElementById("salaryYear").value && document.getElementById("salarySalary").value && document.getElementById("salaryLeaves").value && document.getElementById("salaryBonus").value && document.getElementById("newSalaryRole").value){
 					console.log("newSalary");
 						for(i=0;i<$scope.salary.length;i++)
 							if($scope.salary[i].year==newSalary.year)
 								duplicateFlag=true;
					
 						if(!duplicateFlag)
 						{
 							var date = $scope.emp.doj.toString();
			                var year = date.split(" ")[3]; //-----Get joining year-------
			                var isValid = validateDate(newSalary.year, year)
			                if(isValid){
	 							$scope.salary.push({'year': newSalary.year, 'salary':newSalary.salary,'leaves':newSalary.leaves,'bonus':newSalary.bonus,'role':newSalary.selected_role.role, 'code': newSalary.selected_role.code,'add':true})		
								document.getElementById("newSalaryRole").selectedIndex;
								document.getElementById("salaryYear").value="";
								document.getElementById("salarySalary").value="";
								document.getElementById("salaryLeaves").value="";
								document.getElementById("salaryBonus").value="";
								document.getElementById("newSalaryRole").value=""
			                }
			                else
			                {
			                	$("#invalidYear").modal();
                    			$scope.errorMsg = "Year is less then Joining Year";
			                }
 						}	
//-------------------------Add Salary-----------------------------/////////
		 function validateDate(salaryYear, joiningYear) {
        if (salaryYear >= joiningYear)
            return true;
        else
            return false;
    }

    
 $scope.updateSalaryYear = function (index) {
        var date = $scope.emp.doj.toString();
        var year = date.split(" ")[3]; //-----Get joining year-------

        var isValid = validateDate($scope.salary[index].year, year)

        if (isValid) {
            var duplicateFlag = false;
            for (i = 0; i < $scope.salary.length; i++) {
                if ($scope.salary[index].year == $scope.salary[i].year && index != i) 
                    duplicateFlag = true;
                
            }
            if (!duplicateFlag) {
                console.log("--not--")
                $scope.salary[index].updated = true;
            }
            else
            {
                $scope.errorMsg = "Entry for the year " + $scope.salary[index].year + " already exists"
                $("#invalidYear").modal();               
            }               
        }

        else {
            $scope.errorMsg = "Year is less then Joining Year"
            $("#invalidYear").modal();
        }
    }

    $scope.updateSalary = function (index) {
                $scope.salary[index].updated = true;
    }
//----------------------------------------------------------------------------//
		$scope.changeRole = function(index,role) {
			console.log("index: "+index +" "+ "role: "+ role)
			$scope.salary[index].role = role;
			console.log($scope.salary)
		}		

		$scope.changeYear = function(value,newSalary)
		{
			console.log("change year");
			console.log(value)
			$scope.newSalary.year = value;
		}

		function validateDate(salaryYear,joiningYear)
	    {
	        if (salaryYear >= joiningYear)
	            return true;
	        else
	            return false;
	    }

	    $scope.updateSalaryYear = function (index) {
	        var date = $scope.emp.doj.toString();
	        var year = date.split(" ")[3]; //-----Get joining year-------

	        var isValid = validateDate($scope.salary[index].year, year)

	        if (isValid) {
	            var duplicateFlag = false;
	            for (i = 0; i < $scope.salary.length; i++) {
	                if ($scope.salary[index].year == $scope.salary[i].year && index != i) 
	                    duplicateFlag = true;
	                
	            }
	            if (!duplicateFlag) {
	                $scope.salary[index].updated = true;
	            }
	            else
	            {
	                $scope.errorMsg = "Entry for the year " + $scope.salary[index].year + " already exists"
	                $("#invalidYear").modal();               
	            }               
	        }

	        else {
	            $scope.errorMsg = "Year is less then Joining Year"
	            $("#invalidYear").modal();
	        }
	    }

	    $scope.updateSalary = function (index) {
	                $scope.salary[index].updated = true;
	    }
//-----------------------Select id for delete Certification-------------------//	
		$scope.getDeleteId_Qualification = function(btn) {
			if(this.data.add==true)
				this.data.sr_no = false

			else 
			$scope.deleteId = this.data.sr_no;
			$scope.buttonClicked = btn;
  		};

//------------------Select id for delete Qualification-------------------//
  		$scope.getDeleteId_Certification = function(btn) {
  			if(this.data.add==true)
				this.data.sr_no = false
			else
			{
				$scope.deleteId = this.data.sr_no;
		        $scope.buttonClicked = btn;
			}

  		};
//----------------Select id of deleted Salary-----------------------------//
  		$scope.getDeleteId_Salary = function(btn) {
  			if($scope.salary[this.$index].add==true)
  				$scope.salary[this.$index].sr_no = false;
  			else
  				$scope.deleteId = $scope.salary[this.$index].sr_no;
	        $scope.deleteSalary()
	        $scope.buttonClicked = btn;
  		};
//--------------------Delete certification from modal--------------------//
		$scope.deleteCertification = function() {
			for (i = 0; i < $scope.certifications.length; i++) {
				console.log($scope.deleteId)
			     if (($scope.certifications[i].sr_no == $scope.deleteId && $scope.deleteId!=undefined) || $scope.certifications[i].sr_no==false) {
			         if ($scope.certifications[i].add!=true)
			             $scope.deletedCertifications.push($scope.certifications[i].sr_no);
			         console.log("Delete: "+$scope.certifications[i])
			             $scope.certifications.splice(i, 1);
			            }
			        }

  			  };
//--------------------Delete qualification from modal--------------------//
  			$scope.deleteQualification = function() {
			    for (i = 0; i < $scope.qualifications.length; i++) {
			    
			            if (($scope.qualifications[i].sr_no == $scope.deleteId && $scope.deleteId!=undefined) || $scope.qualifications[i].sr_no==false) {
			                if ($scope.qualifications[i].add!=true)
			                	$scope.deletedQualifications.push($scope.qualifications[i].sr_no);
			                $scope.qualifications.splice(i, 1);
			            }
			        }
			};
//-----------------Delete Salary------------------------------------//
			$scope.deleteSalary = function(){
				for(i=0;i<$scope.salary.length;i++)
				{
					if(($scope.salary[i].sr_no == $scope.deleteId && $scope.deleteId!=undefined) || $scope.salary[i].sr_no==false){
						if($scope.salary[i].add!=true)
							$scope.deletedSalary.push($scope.salary[i].sr_no)
			                $scope.salary.splice(i, 1);
					}
				}
			}
//---------------To update the changes------------------------------//
			$scope.saveData = function(emp)
			{

				for(i=0;i<$scope.deletedCertifications.length;i++)
				{
					console.log("data: "+$scope.deletedCertifications[i])
					$http.delete("http://localhost:1337/employee/deleteCertification?id="+$scope.deletedCertifications[i]).success(function(result){

						console.log(result);
					})
				}

				for(i=0;i<$scope.deletedQualifications.length;i++)
				{
					$http.delete("http://localhost:1337/employee/deleteQualification?id="+$scope.deletedQualifications[i]).success(function(result){
						console.log(result);
					})
				}	
				for(i=0;i<$scope.deletedSalary.length;i++)
				{
					$http.delete("http://localhost:1337/employee/deleteSalary?id="+$scope.deletedSalary[i]).success(function(result){
						console.log(result);
					})
				}	

				for(i=0;i<$scope.qualifications.length;i++)
				{
					if($scope.qualifications[i].add==true)
					{
						var data = ({
							emp_id:emp.emp_id,
							qualification_code:$scope.qualifications[i].qualification_code,
					    	percentage:$scope.qualifications[i].percentage
						})
						$http.post("http://localhost:1337/employee/insertQualification",data).success(function(result){
							console.log(result)
						})
					}
				}

				for(i=0;i<$scope.certifications.length;i++)
				{
					if($scope.certifications[i].add==true)
					{
						var data =({
							emp_id:emp.emp_id,
							year:$scope.certifications[i].year,
							certification_code:$scope.certifications[i].certification_code
						})
						$http.post("http://localhost:1337/employee/insertCertification",data)
					}
				}


		        for (i = 0; i < $scope.salary.length; i++) 
		        {
		            if ($scope.salary[i].add == true) {
		            	var data= ({
		                    emp_id: emp.emp_id,
		                    year: $scope.salary[i].year,
		                    salary: $scope.salary[i].salary,
		                    bonus: $scope.salary[i].bonus,
		                    leaves: $scope.salary[i].leaves,
		                    code: $scope.salary[i].code
		                })

		                $http.post("http://localhost:1337/employee/salary",data).success(function (result) {
		                   console.log("result");
		                })
		            }
		        }	
		      for (i = 0; i < $scope.salary.length; i++)
		        {
		            if($scope.salary[i].updated)
		            { 
		            	var data= ({
		                    year: $scope.salary[i].year,
		                    salary: $scope.salary[i].salary,
		                    bonus: $scope.salary[i].bonus,
		                    leaves: $scope.salary[i].leaves,
		                    code: $scope.salary[i].code
		                })
		                $http.put("http://localhost:1337/employee/salary/" + $scope.salary[i].sr_no,data).success(function (result) {		                    
		                });
		            }
		        }		        			

		        var data = {
		            fname: emp.fname,
		            lname: emp.lname,
		            mobile_no: emp.mobile_no,
		            email_id: emp.email_id,
		            dob: emp.dob,
		            address: emp.address,
		            city: emp.city,
		            state: emp.state,
		            country: emp.country,
		            pincode: emp.pincode,
		            doj: emp.doj,
		            pf_no: emp.pf_no,
		          //  teamList: $scope.teamList
		        }
		        $http.put("http://localhost:1337/employee/updatePersonalinfo/" + emp.emp_id, data).success(function (result) {

		            //$scope.loadEmployeeData(emp.emp_id);
		            $state.go("dashboard.emp");
		            $scope.$emit("load_tree", {});
		            
		        })

				$state.go("dashboard.emp");

			}

}]);