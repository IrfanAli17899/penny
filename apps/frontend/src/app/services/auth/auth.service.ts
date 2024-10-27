import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api.service';
import { LoginInput, RegisterInput, IUser } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiService);

  async fetchUser() {
    const _user = (await this.apiService.api.get<IUser>('/user/me')).data;
    return _user;
  }

  async login(credentials: LoginInput) {
    await this.apiService.api.post('/auth/login', credentials);
    return this.fetchUser();

  }

  async register(credentials: RegisterInput) {
    await this.apiService.api.post('/auth/register', credentials);
    return this.fetchUser();
  }

  async logout() {
    await this.apiService.api.delete('/auth/logout');
    return true;
  }
}
