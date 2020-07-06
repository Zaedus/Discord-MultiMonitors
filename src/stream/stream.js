const { ipcRenderer, remote } = require('electron');

const { Menu } = remote

const video = document.querySelector('video');

ipcRenderer.on('screenId', async (e, id) => {
    console.log(id);
	const constraints = {
		audio: false,
		video: {
			mandatory: {
				chromeMediaSource: 'desktop',
				chromeMediaSourceId: id
			}
		}
	};

	const stream = await navigator.mediaDevices.getUserMedia(constraints);
    
    video.srcObject = stream;
    video.play();

    var { width, height } = video.getBoundingClientRect();

    //ipcRenderer.send("adjustSize", width, height);

    video.oncontextmenu = showPopup;
    video.onclick = showPopup;
});

const showPopup = () => {
    const videoOptionsMenu = Menu.buildFromTemplate([
        {
            label: "Maximize",
            click: () => remote.getCurrentWindow().maximize()
        },
        {
            label: "Minimize",
            click: () => remote.getCurrentWindow().minimize()
        },
        {
            label: "Close",
            click: () => remote.getCurrentWindow().close()
        }
    ])

    videoOptionsMenu.popup();
}