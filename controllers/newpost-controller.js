angular.module('app')

	.controller('newpostController', function($scope, Upload, $http, $rootScope, $uibModal, $timeout) {
		
		$scope.upload = function(file) {
			if ($scope.form.file.$valid && $scope.file) {
	        	Upload.upload({
	            url: 'api/upload',
	            method: 'POST',
	            data: {userId: $scope.data._id,
	            	   email: $scope.data.email,
	            	   username: $scope.data.username,
	            	   content: $scope.content
	            	  },
	            file: file
		        }).progress(function(evt){
					file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	            	// console.log('progress: ' + progress + '% ' + evt.config.data.filename);
				}).success(function(data){
					//Here comes all the post data.
					$scope.postData = data;
					//console.log($scope.postData);
					getPosts();
					$scope.file.result = true;
					console.log($scope.file.result);
					// $scope.file = '';
					// $scope.content = '';
				}).error(function(error){
	        		$scope.errorMsg = "Something went wrong";
				});
			}
		    else {
		      	alert ("please select file");
		    }
		};

		// function getPosts() {
		// 	$http.get('api/get-post').then(function(response) {
		// 		$scope.posts = response.data;
		// 		$scope.status = true;
		// 		console.log($scope.posts);
		// 	});
		// }

		// getPosts();
		$scope.displayImage = function(index){
			console.log(index);
			$rootScope.index = index;
			$scope.modalInstance = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/modalWindow.html',
			controller :'ModelHandlerController',
			// controllerAs: '$ctrl',
			size: 'lg',
			resolve: {
				}
 			});
 		}
 		function getPosts() {
			$http.get('api/get-post').then(function(response) {
				$rootScope.posts = response.data;
				$scope.status = true;
				var a = $rootScope.posts.reverse();
				console.log(a);
			});
		}
		getPosts();
	});