const videoJsOptions = {
    width: 800,
    height: 400,
    autoplay: true,
    controls: true,
    playbackRates: [0.5, 1, 2],
    sources: [{
        src: '',
        type: 'video/mp4'
    }]
};
module.exports = videoJsOptions;