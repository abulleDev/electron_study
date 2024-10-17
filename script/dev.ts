const concurrently = require('concurrently');
const { result } = concurrently(
  [
    { command: 'vite ./app', name: 'renderer' },
    { command: 'electron .', name: 'main', env: { DEV_MODE: true } },
  ],
  {
    killOthers: ['failure', 'success'],
  }
);

result.catch(() => {});
