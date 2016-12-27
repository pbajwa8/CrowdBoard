angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'viewsfromthesix/home.html',
			controller: 'HomeController'
		})
		.when('/voting', {
			templateUrl: 'viewsfromthesix/voting.html',
			controller: 'VotingController'
		})
		.when('/results/:resultId', {
			templateUrl: 'viewsfromthesix/results.html',
			controller: 'ResultsController'
		})

	$locationProvider.html5Mode(true);

}]);
