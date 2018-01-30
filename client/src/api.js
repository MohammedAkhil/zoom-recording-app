import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:1790');

function subscribeToApi(cb) {
    alert('subscribeToApi');
  socket.on('recording', meetings => {
      alert(meetings);
      cb(null, getRecordings(meetings));
  });
  alert(socket + emit);
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