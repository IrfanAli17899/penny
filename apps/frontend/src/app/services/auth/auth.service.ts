import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ForgetPasswordInput, IUser, LoginInput, RegisterInput, ResetPasswordInput } from '../../store/auth/auth.models';

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

  async forgetPassword(props: ForgetPasswordInput) {
    await this.apiService.api.post('/auth/forget-password', props);
    return true;
  }

  async resetPassword({ password, token }: ResetPasswordInput) {
    await this.apiService.api.post('/auth/reset-password', { password }, { headers: { Authorization: `Bearer ${token}` } });
    return true;
  }
}
