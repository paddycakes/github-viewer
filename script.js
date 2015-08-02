(function() {

var githubViewer = angular.module('githubViewer', []);

githubViewer.controller('GithubController', 
                          function($scope, $http, $interval, 
                                   $log, $anchorScroll, $location) {

  var onUserComplete = function(response) {
    $scope.user = response.data;
    $http.get($scope.user.repos_url).
    then(onReposComplete, onError);
  };
  
  var onReposComplete = function(response) {
    $scope.repos = response.data;
    $location.hash("userDetails");
    $anchorScroll();
  };
  
  var onError = function(error) {
    $scope.error = "Could not fetch the data";
  };

  var decrementCountdown = function() {
    $scope.countdown -= 1;
    if ($scope.countdown < 1) {
      $scope.search($scope.username);
    }
  };
  
  var countdownInterval = null;
  var startCountdown = function() {
    countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
  }

  $scope.message = 'Github Viewer';

  $scope.search = function(username) {
    $log.info("Searching for " + username);
    $http.get("https://api.github.com/users/" + username).
      then(onUserComplete, onError);
    if (countdownInterval) {
      $interval.cancel(countdownInterval);
    }
    $scope.countdown = null;
  }

  $scope.username = "angular";
  $scope.repoSortOrder = "+language";
  $scope.countdown = 5;
  startCountdown();
});
})();