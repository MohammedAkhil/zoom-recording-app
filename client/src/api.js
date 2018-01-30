import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:1790');

function subscribeToApi(cb) {
  socket.on('recording', meetings => {
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