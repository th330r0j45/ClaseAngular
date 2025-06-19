import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http'
import { cartFeatureKey, cartReducer } from './store/cart.reducer';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore(),
    provideHttpClient(),
    provideState(cartFeatureKey, cartReducer)/*registro de reducer*/,
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ]
};