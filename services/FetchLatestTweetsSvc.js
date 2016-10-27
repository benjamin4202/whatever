app.factory('fetchLatestTweets', function($http, $q) {
  var deffered = $q.defer();
  var data = [];  
  var fetchLatestTweets = {};

  fetchLatestTweets.async = function() {
    $http.get('/tweets')
    .success(function (d) {
      data = d;
      deffered.resolve();
    });
    return deffered.promise;
  };
  fetchLatestTweets.data = function() { return data; };

  return fetchLatestTweets;
});