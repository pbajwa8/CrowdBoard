angular.module('VotingCtrl', []).controller('VotingController', function($scope, $location, Results) {

	$scope.imageURL;
	$scope.optionsArray = [];
	$scope.count = 0;
	$scope.imageHeight;
	$scope.imageWidth;
	$scope.upCount = 0;
	$scope.upImages = [];

	$.jribbble.shots('playoffs', {'sorted': 'recent','per_page': 125}).then(function(res) {

		for (i = 0; i < res.length; i++) {
			$scope.optionsArray.push({image: res[i].images.hidpi || res[i].images.normal, height: res[i].height, width: 
				res[i].width, id: res[i].id, tags: res[i].tags})
		}

		shuffle($scope.optionsArray);

		$scope.imageURL = $scope.optionsArray[$scope.count].image;
		$scope.imageWidth = $scope.optionsArray[$scope.count].width;
		$scope.imageHeight = $scope.optionsArray[$scope.count].height;
		$scope.$apply();

	});

	$scope.rateUp = function() {

		$scope.upCount++;
		$scope.upImages.push($scope.optionsArray[$scope.count]);

		if ($scope.upImages.length == 10) {
			Results.saveResults($scope.upImages).then(function(id) {
				console.log("done");
				$location.path('/results/' + id);
			})
		};

		$scope.nextImage();
	}

	$scope.nextImage = function() {
		$scope.count++;
		$scope.imageURL = $scope.optionsArray[$scope.count].image;
		$scope.imageHeight = $scope.optionsArray[$scope.count].height;
		$scope.imageWidth = $scope.optionsArray[$scope.count].width;	
	}

	function shuffle(a) {
    	for (let i = a.length; i; i--) {
        	let j = Math.floor(Math.random() * i);
        	[a[i - 1], a[j]] = [a[j], a[i - 1]];
    	}
	}

});
