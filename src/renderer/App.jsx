import { useState, useEffect } from 'react';

export default function App() {
  const [appVersion, setAppVersion] = useState('');
  useEffect(() => {
    window.communication.getAppVersion().then((appVersion) => {
      setAppVersion(appVersion);
    });
  }, []);
  return (
    <>
      <h1>Hello React and Electron World!</h1>
      <p id='version-info'>
        This app is using Chrome (v{window.versions.chrome()}), Node.js (v
        {window.versions.node()}), and Electron (v{window.versions.electron()})
      </p>
      <p>App version is {appVersion}</p>
      <button
        id='sendButton'
        type='button'
        onClick={async () => {
          const reply = await window.communication.sendMessage(
            'Hello main process!'
          );
          console.log(reply);
        }}
      >
        Send Message
      </button>
    </>
  );
}
