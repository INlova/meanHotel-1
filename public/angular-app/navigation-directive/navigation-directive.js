angular.module('meanhotel').directive('headNavigation', headNavigation);

function headNavigation() {
  return {
    restrict: 'E',
    templateUrl: 'angular-app/navigation-directive/navigation-directive.html'
  };
}