angular.module('ResultsCtrl', []).controller('ResultsController', function($scope, $location, $firebaseArray) {

  $scope.clickedImage = ""

	var resultId = $location.path().split("/")[2]
	var imagesRef = firebase.database().ref("results").child(resultId).child("images");
  var tagsRef = firebase.database().ref("results").child(resultId).child("tags");

  $scope.images = $firebaseArray(imagesRef);
  $scope.words = $firebaseArray(tagsRef);

  $scope.clicked = function(imageURL) {
    $scope.clickedImage = imageURL;
  }

});