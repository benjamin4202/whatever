(function () {
    "use strict";
    var express = require('express'),
        app = express(),
        http = require('http'),
        server = http.createServer(app),
        Twit = require('twit'),
        io = require('socket.io').listen(server),
        mongodb = require('mongodb');
    var watchList = ['#whatever', '#ughwhatever'];
    var T = new Twit({
        consumer_key: '6dyKnBD2uJD1BSEFjh6LA41cx',
        consumer_secret: 'Zsdi0qgStZrH9Rmo0DmdGtcVJMVg3NSfFDvjjNFhihxbgXTD6d',
        access_token: '2851739920-c6Zda79H7tYhPjo9yDW0PxmNALAUUUuBgwXpmo5',
        access_token_secret: 'vFTRhz94h4rXK1sbWjVpA2KDCazAAQHbC8xsDuZWlT89h'
    });

    server.listen(8080);


    app.use(express.static(__dirname + '/'));

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.get('/tweets', function (req,res) {

        var MongoClient = mongodb.MongoClient,
            url = 'mongodb://benjamin77:Adidas77@ds053146.mlab.com:53146/ughwhatever';

        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                var collection = db.collection('tweets');

                collection.find().sort({_id: -1}).limit(50).toArray(function (err, result) {
                    if (err) {
                        console.log(err);
                    } else if (result.length) {
                        res.send(result);
                    } else {
                        console.log('No document(s) found with defined "find" criteria!');
                    }

                    db.close();
                });
            }
        });
    });





    io.sockets.once('connection', function () {
        var stream = T.stream('statuses/filter', {
            track: watchList
        });

        stream.on('tweet', function (tweet) {
            io.sockets.emit('stream', tweet);
            console.log(tweet);

            var MongoClient = mongodb.MongoClient,
                url = 'mongodb://benjamin77:Adidas77@ds053146.mlab.com:53146/ughwhatever';

            MongoClient.connect(url, function (err, db) {
                if (err) {
                    console.log('Unable to connect to the mongoDB server. Error:', err);
                } else {

                    var collection = db.collection('tweets');

                    collection.insert([tweet], function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Inserted new tweet');
                        }
                        db.close();
                    });
                }
            });
        });
    });
}());