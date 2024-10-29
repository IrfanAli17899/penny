import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import * as fromAuth from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import * as fromTodos from './store/todos/todos.reducer';
import { TodosEffects } from './store/todos/todos.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ auth: fromAuth.authReducer, todos: fromTodos.todosReducer }),
    provideEffects([AuthEffects, TodosEffects]),
    provideStoreDevtools(),
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient()
  ],
};
