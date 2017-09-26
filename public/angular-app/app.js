var app = angular.module('meanhotel', ['ngRoute']);

app.config (function($httpProvider, $routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/main/main.html'
    })
    .when('/hotels', {
      templateUrl: 'angular-app/hotel-list/hotels.html',
      controller: HotelsController,
      controllerAs: 'vm'
    })
    .when('/hotel/:id', {
      templateUrl: 'angular-app/hotel-display/hotel.html',
      controller: HotelController,
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: RegisterController,
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});

//hello