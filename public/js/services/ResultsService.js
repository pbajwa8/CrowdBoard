angular.module('ResultsService', []).factory('Results', function($q, $http, $firebaseArray) {

	var rootResultsRef = firebase.database().ref("results")

	var saveResults = function(upImages) {

		var deferred = $q.defer();

		var resultId = rootResultsRef.push().key;
		var resultObj = {"upImages": upImages, "images": -1}

		rootResultsRef.child(resultId).update(resultObj).catch(function(error){
			deferred.reject(error);
		}).then(function(data) {
			findMatches(resultId, upImages);
			deferred.resolve(resultId);
		})

		return deferred.promise
	}

	var findMatches = function(resultId, upImages) {

		var images = [];

		for (var i = 0; i < upImages.length; i++) {
			var id = upImages[i].id;
			$.jribbble.shots(id).rebounds({'per_page': 10}).then(function(res) {
				images = images.concat(res);
				if (i == upImages.length) {
					rootResultsRef.child(resultId).child("images").set(images).catch(function(error){
						console.error(error);
					}).then(function(data) {
						console.log("success");
					})
				}
			});
		}

	}

	return {

		saveResults: saveResults

	}

});