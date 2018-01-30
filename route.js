const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const io = require('socket.io')();
const port_io = 1790;

let client_io;
io.listen(port_io);

console.log('listening on port.io', port_io);
io.on('connection', (client) => {
    client_io = client;
    client.on('subscribe', (interval) => {
        console.log('client is subscribing to api');
        getRecordings('a')
        .then(data => {
            console.log('adsds')
            client.emit('recording', data.meetings);
        })
        .catch(error => {
            console.log(error);
        });
    });
});

/* GET test page. */
router.get('/test', (req, res, next) => {
    console.log("inside get")
    res.send({ express: 'Hello From Express' });
});

/* POST home page. */
router.post('/', function(req, res, next) {
    const status = req.body.status || '';
    const type = req.body.type || '';
    if (type === 'RECORDING_MEETING_COMPLETED') {
        console.log(req.body)
        getRecordings(req.body.content.host_id)
        .then(data => {
            res.sendStatus(200);
            console.log(data.meetings)
            client_io.emit('recording', data.meetings);
        })
        .catch(error => {
            console.log(error);
        });
    }
});


const getRecordings = user_id => {
    const url = `https://api.zoom.us/v2/users/bxffJu2QT1CckvCzNgbx4A/recordings?from=2018-01-24&to=2018-01-30`;
    return new Promise( (resolve, reject) => {
        fetch(url, {
            method: 'get',
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJRajNmOHo4c1RtZWpRM1JrOWV1eUtnIiwiZXhwIjoxNTE2Nzk1ODAxOTUzLCJpYXQiOjE1MTY3OTU3OTZ9.W3DyuXKtEt55nTEKCCBWBYL3IPQCHvh1KUI1j0IRDRc"
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