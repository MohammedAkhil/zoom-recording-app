import io from 'socket.io-client';
import server from './config/config';
const socket = io(server);

function subscribeToApi(cb) {
    socket.on('recording', meetings => {
        alert(meetings);
        cb(null, getRecordings(meetings));
    });
    socket.emit('subscribe', 1000);
}

const getRecordings = (meetings) => {
    let recordings = [];
      meetings.forEach(meeting => {
          recordings.push({
              start_time: meeting.start_time,
              video: meeting.recording_files[0].play_url,
              audio: meeting.recording_files[1].play_url
          });
      });
      return recordings;
};

export { subscribeToApi };