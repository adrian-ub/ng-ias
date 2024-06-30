import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@config/app.config';
import { MainComponent } from '@ui/main/main.component';

import { worker } from '../mocks';

worker.then(() =>
  bootstrapApplication(MainComponent, appConfig).catch((err) =>
    console.error(err)
  )
);
