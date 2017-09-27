<<<<<<< HEAD
var app = angular.module('meanhotel', ['ngRoute']);

app.config (function($httpProvider, $routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/main/main.html'
=======
var app = angular.module('meanhotel', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider, $locationProvider) {
  // $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/main/main.html',
      access : {
        restricted : false
      }
>>>>>>> Hotel APP: Finished adding the last pieces to the base boilerplate hotel application.
    })
    .when('/hotels', {
      templateUrl: 'angular-app/hotel-list/hotels.html',
      controller: HotelsController,
<<<<<<< HEAD
      controllerAs: 'vm'
=======
      controllerAs: 'vm',
      access : {
        restricted : false
      }
>>>>>>> Hotel APP: Finished adding the last pieces to the base boilerplate hotel application.
    })
    .when('/hotel/:id', {
      templateUrl: 'angular-app/hotel-display/hotel.html',
      controller: HotelController,
<<<<<<< HEAD
      controllerAs: 'vm'
=======
      controllerAs: 'vm',
      access : {
        restricted : false
      }
>>>>>>> Hotel APP: Finished adding the last pieces to the base boilerplate hotel application.
    })
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: RegisterController,
<<<<<<< HEAD
      controllerAs: 'vm'
=======
      controllerAs: 'vm',
      access : {
        restricted : false
      }
    })
    .when('/profile', {
      templateUrl: 'angular-app/profile/profile.html',
      // controller: ProfileController,
      // controllerAs: 'vm',
      access : {
        restricted : true
      }
>>>>>>> Hotel APP: Finished adding the last pieces to the base boilerplate hotel application.
    })
    .otherwise({
      redirectTo: '/'
    });

<<<<<<< HEAD
    $locationProvider.html5Mode(true);
});
=======
    
};

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  })
};
>>>>>>> Hotel APP: Finished adding the last pieces to the base boilerplate hotel application.

//hello