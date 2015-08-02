(function() {
  
  var github = function($http) {
    
    // Returns a combined promise (the second promise wraps
    // the first promise that will ultimately return the user.
    var getUser = function(username) {
      return $http.get("https://api.github.com/users/" + username)
                .then(function(response) {
                  return response.data;
                })
    };
    
    var getRepos = function(user) {
      
    };
    
    return {
      
    };
  }
  
  var module = angular.module("githubViewer");
})();