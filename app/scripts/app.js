'use strict';

/**
 * @ngdoc overview
 * @name employeeApp
 * @description
 * # employeeApp
 *
 * Main module of the application.
 */
angular
  .module('employeeApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'TreeWidget',
     'ui.router',
    'ui.bootstrap.contextMenu',
    'CustomFilters'
  ])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


    $urlRouterProvider

        .otherwise('/')
  //  .when("/dashboard",)

    $stateProvider
        // HOME STATE========================================
        .state('home', {
            url: '/',
            templateUrl: 'views/login.html',
            Isauthorized : true
        })

        // ABOUT PAGE =================================
        .state('dashboard.about', {
            url: '/about',
            templateUrl: 'views/about.html'
        })

         .state('logout', {
             url: '/',
             templateUrl: 'views/login.html'
         })

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
           
        })


        .state('dashboard.home', {
            url: '/home',
            templateUrl: 'default.html', controller: 'TreeCtrl'
        })

              
            .state('dashboard.root', {
                url: '/root',
                templateUrl: 'views/CompanyDisplay.html',
                controller: 'TreeCtrl'
            })

            .state('dashboard.dpt', {
                url: '/dpt',
                templateUrl: 'views/DepartmentDisplay.html', 
                controller: 'TreeCtrl'
            })

            .state('dashboard.emp', {
                url: '/emp',
                templateUrl: 'views/EmployeeDisplay_admin.html', controller: 'TreeCtrl'
            })

            .state('dashboard.edit', {
                url: '/edit',
                templateUrl: 'views/EditDisplay.html', controller: 'TreeCtrl'
            })

            .state('dashboard.addEmployee', {
                url: '/addEmployee',
                templateUrl: 'views/addEmployee.html', controller:'EmployeeAdd'
            })

            .state('dashboard.addTeam', {
                url: '/addTeam',
                templateUrl: 'views/addTeam.html', controller: 'EmployeeAdd'
            })

           .state('dashboard.editTeam', {
               url: '/editTeam',
               templateUrl: 'views/EditTeam.html', controller: 'TreeCtrl'
           })

          .state('employee', {
              url: '/employee',
              templateUrl:'views/EmployeeDisplay_user.html'
          })
}]);


/*  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
       // controller: 'MainCtrl',
        //controllerAs: 'main'
      })
    
      .when('/about', {
        templateUrl: 'about.html',
      //  controller: 'AboutCtrl',
       // controllerAs: 'about'
      })
      .when('/emp', {
        templateUrl: 'EmployeeDisplay.html',
        access: {requireLogin : true}
       
      })

       .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        
      })


     .when('/dpt', {
         templateUrl: 'DepartmentDisplay.html'
      })

     .when('/root', {
         templateUrl: 'CompanyDisplay.html'
      })
     .when('/edit', {
         templateUrl: 'EditDisplay.html'
      })
    .when('/addEmployee', {
         templateUrl: 'addEmployee.html',
         controller:'EmployeeAdd'
      })
   


  });
*/