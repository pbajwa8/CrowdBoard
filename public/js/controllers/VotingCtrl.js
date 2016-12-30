angular.module('VotingCtrl', []).controller('VotingController', function($scope, $location, Results) {

	$scope.imageURL;
	$scope.optionsArray = [];
	$scope.count = 0;
	$scope.imageHeight;
	$scope.imageWidth;
	$scope.upCount = 0;
	$scope.upImages = [];
	$scope.tags = [];

	$.jribbble.shots('playoffs', {'sorted': 'recent','per_page': 100}).then(function(res) {

		for (i = 0; i < res.length; i++) {
			$scope.optionsArray.push({image: res[i].images.hidpi || res[i].images.normal, id: res[i].id, tags: res[i].tags})
		}

		shuffle($scope.optionsArray);

		$scope.imageURL = $scope.optionsArray[$scope.count].image;
		
		$scope.$apply();

	});

	$scope.rateUp = function() {

		$scope.upCount++;
		$scope.upImages.push($scope.optionsArray[$scope.count]);

		for (i in $scope.optionsArray[$scope.count].tags) {
			$scope.tags.push({"text": $scope.optionsArray[$scope.count].tags[i],
			 "weight": Math.floor(Math.random() * 10) + 1  })
		}

		if ($scope.upImages.length == 10) {
			Results.saveResults($scope.upImages, $scope.tags).then(function(id) {
				$location.path('/results/' + id);
			})
		};

		$scope.nextImage();
	}

	$scope.nextImage = function() {
		$scope.count++;
		if ($scope.count > 99) {
			$scope.count = 0;
		}
	
		$scope.imageURL = $scope.optionsArray[$scope.count].image;	
	}

	function shuffle(a) {
    	for (let i = a.length; i; i--) {
        	let j = Math.floor(Math.random() * i);
        	[a[i - 1], a[j]] = [a[j], a[i - 1]];
    	}
	}

});
