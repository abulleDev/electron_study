const concurrently = require('concurrently');
const { result } = concurrently(
  [
    { command: 'vite ./app', name: 'renderer' },
    { command: 'wait-on http://localhost:5173 && electron .', name: 'main', env: { DEV_MODE: true } },
  ],
  {
    killOthers: ['failure', 'success'],
  }
);

result.catch(() => {});
