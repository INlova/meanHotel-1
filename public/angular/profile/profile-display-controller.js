angular.module('hotelApp').controller('ProfileController', ProfileController);

function ProfileController ($window, AuthFactory, jwtHelper, AuthInterceptor) {
	var vm = this;
	vm.user = {};

	vm.result = AuthInterceptor.response($window.sessionStorage.token);
	console.log(vm.result);

	vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };

	var token = jwtHelper.decodeToken($window.sessionStorage.token);
	console.log('hiii');
}