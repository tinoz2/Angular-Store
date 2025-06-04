import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const provideMockAuthService: ApplicationConfig = {
    providers: [
        provideServerRendering(),
        {
            provide: AuthService,
            useValue: {},
        },
    ],
};

export const config: ApplicationConfig = mergeApplicationConfig(
    appConfig,
    provideMockAuthService
);