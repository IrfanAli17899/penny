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

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ auth: fromAuth.authReducer,todos: fromTodos.todosReducer }),
    provideEffects([AuthEffects, TodosEffects]),
    provideStoreDevtools(),
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient()
  ],
};
