import { versions, communication } from '../preload/preload';

declare global {
  interface Window {
    versions: typeof versions;
    communication: typeof communication;
  }
}
