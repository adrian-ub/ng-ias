import { isDevMode } from '@angular/core';
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers).start({
  onUnhandledRequest: 'bypass',
  serviceWorker: {
    url: isDevMode() ? '/mockServiceWorker.js' : '/ng-ias/mockServiceWorker.js',
  },
});
