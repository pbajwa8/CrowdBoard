angular.module('ResultsCtrl', []).controller('ResultsController', function($scope, $location, $firebaseArray) {
	var resultId = $location.path().split("/")[2]
	var imagesRef = firebase.database().ref("results").child(resultId).child("images");
	var images = $firebaseArray(imagesRef);
	$scope.imagesArray = [];
	var wordObject = {};
	$scope.words = [];

	images.$loaded()
  		.then(function(data) {
  			$scope.imagesArray = data;

  			createWordsObjects();
  						
  		})
  		.catch(function(error) {
    		console.error(error);
  		});

  	var createWordsObjects = function() {

  		for (var i = 0; i < $scope.imagesArray.length; i++) {
  			if ($scope.imagesArray[i].tags) {
  				var tags = $scope.imagesArray[i].tags;
  				for (x = 0; x < tags.length; x++) {
  					wordObject[tags[x]] = wordObject[tags[x]] ? wordObject[tags[x]] + 1 : 1;
  				}
  			}
  		}

  		for (var key in wordObject) {
  			if (wordObject.hasOwnProperty(key)) {
  				var item = {text: key, weight: wordObject[key]}
  				$scope.words.push(item);
  			}
  		}

  	}



});