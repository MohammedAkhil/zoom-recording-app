let server = 'https://zoom-x.herokuapp.com/';

const env = process.env.NODE_ENV;

if (env === 'development') {
    server = 'http://localhost:5000';
}

module.exports = server;