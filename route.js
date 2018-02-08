if (process.env.LOGNAME === 'akhil') {
    require('./config')
}
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const getSocketIo = require('./server');

let client_io;

getSocketIo((err, io) => {
    io.sockets.on('connection', (client) => {
        client_io = client;
        client.on('subscribe', (interval) => {
            console.log('client is subscribing to api');
            getRecordings('a')
                .then(data => {
                    console.log(interval);
                    /** @namespace data.meetings */
                    client.emit('recording', data.meetings);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });
});

/* GET test page. */
router.get('/test', (req, res, next) => {
    res.send('hello')
});

/* POST home page. */
router.post('/', function(req, res, next) {
    const status = req.body.status || '';
    console.log('STATUS--->' + status);
    const type = req.body.type || '';
    if (type === 'RECORDING_MEETING_COMPLETED') {
        getRecordings(req.body.content.host_id)
        .then(data => {
            res.sendStatus(200);
            client_io.emit('recording', data.meetings);
        })
        .catch(error => {
            console.log(error);
        });
    }
});

router.get('/chat', cors(), function (req, res) {
    fetch(req.query.chat_url, {
        method: 'get'
    }).then(data => data.body._readableState.buffer.head.data.toString())
        .then(chatMessage => res.send({text: chatMessage}))
        .catch(err => {
            console.log(err);
            res.status(500);
            res.send(err);
        });

});

const getToken = () => {
    const payload = {
        iss: process.env.API_KEY,
        exp: ((new Date()).getTime() + 5000)
    };
    //Automatically creates header, and returns JWT
    return jwt.sign(payload, process.env.API_SECRET);
};

const getRecordings = user_id => {
    const token = getToken();
    const url = `https://api.zoom.us/v2/users/bxffJu2QT1CckvCzNgbx4A/recordings?from=2018-01-30&to=2018-02-07`;
    return new Promise( (resolve, reject) => {
        fetch(url, {
            method: 'get',
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Authorization": "Bearer " + token
            }
          })
          .then(res => {
            resolve(res.json());
          })
          .catch(function (error) {
            return reject(error);
          });
    });
};

module.exports = router;