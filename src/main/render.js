const { desktopCapturer, remote, ipcRenderer } = require('electron');

const { Menu } = remote;

const videoSelectBtn = document.getElementById('videoSelectBtn');
videoSelectBtn.onclick = getVideoSources;

async function getVideoSources() {
	const inputSources = await desktopCapturer.getSources({
		types: [ 'screen' ]
	});

	const videoOptionsMenu = Menu.buildFromTemplate(
		inputSources.map((source) => {
			return {
				label: source.name,
				click: () => selectSource(source)
			};
		})
	);

	videoOptionsMenu.popup();
}

async function selectSource(source) {
    videoSelectBtn.innerText = source.name + " now able to be streamed!";

    ipcRenderer.send("openScreen", JSON.stringify(source));

    setTimeout(() => {
        videoSelectBtn.innerText = "Choose a Screen"
    }, 3000)
}