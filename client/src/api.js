import io from 'socket.io-client';
import server from './config/config';
const socket = io(server);

function subscribeToApi(cb) {
    socket.on('recording', meetings => {
        alert(meetings);
        cb(null, meetings);
    });
    socket.emit('subscribe', 1000);
}



export { subscribeToApi };