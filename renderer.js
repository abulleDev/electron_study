const versionInfo = document.getElementById('version-info');
versionInfo.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;

const sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', async () => {
  const reply = await window.communication.sendMessage('Hello main process!');
  console.log(reply);
});
