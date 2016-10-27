/* globals app, io */
(function () {
    "use strict";

    app.controller('mainController', ['fetchLatestTweets', '$scope', function (fetchLatestTweets, $scope) {

        $scope.tweetList = [];

        var getLastTweets = function (tweet) {
            $scope.tweetList.push(tweet);
        };

        var tweetPush = function (tweet) {
            $scope.tweetList.push(tweet);
            $scope.$apply();
        };

        var socket = io.connect('http://localhost:8080');

        fetchLatestTweets.async().then(function () {

            var tweetList = fetchLatestTweets.data(),
                oTweets = {};

            tweetList.forEach(function (item) {


                oTweets = {
                    screenName: item.user.screen_name,
                    tweetText: item.text,
                    profileImage: item.user.profile_image_url,
                    profileBanner: item.user.profile_banner_url,
                    timeStamp: new Date(item.created_at),
                    tweetPhoto: item.entities.media ? item.entities.media[0].media_url : ""
                };

                if (item.retweeted === false) {
                    getLastTweets(oTweets);
                }
            });
        });



        socket.on('stream', function (tweet) {

            var tweetMediaType,
                tweetMediaUrl,
                oTweets = {};

            if (tweet.entities.media) {
                tweetMediaType = tweet.entities.media[0].type;
                if (tweetMediaType === "photo") {
                    tweetMediaUrl = tweet.entities.media[0].media_url;
                }
            }
            oTweets = {
                screenName: tweet.user.screen_name,
                tweetText: tweet.text,
                profileImage: tweet.user.profile_image_url,
                timeStamp: new Date(tweet.created_at),
                tweetPhoto: tweetMediaUrl
            };

            tweetPush(oTweets);
        });

    }]);
}());