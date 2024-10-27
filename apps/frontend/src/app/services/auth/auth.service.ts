import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api/api.service';
import { LoginInput, IUser, RegisterInput } from '../../models';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  user: IUser | null = null;
  message = inject(NzMessageService)
  apiService = inject(ApiService)

  constructor(
    private router: Router,
    private cookies: CookieService,
  ) {
  }

  async checkAuthentication(): Promise<boolean> {
    const user = await this.fetchUser();
    this.isAuthenticated = !!user;
    return !!user;
  }

  async fetchUser() {
    try {
      const _user = (await this.apiService.api.get<IUser>("/user/me")).data
      this.user = _user
      return _user
    } catch (error) {
      return null
    }
  }

  async login(props: LoginInput) {
    try {
      await this.apiService.api.post("/auth/login", {
        email: props.email,
        password: props.password,
      });
      await this.checkAuthentication()
      this.router.navigateByUrl("/dashboard");
    } catch (error: any) {
      this.message.error(error.message);
    }
  }

  async register(props: RegisterInput) {
    try {
      await this.apiService.api.post("/auth/register", {
        username: props.email,
        email: props.email,
        password: props.password,
      });
      await this.checkAuthentication()
      this.router.navigateByUrl("/dashboard");
    } catch (error: any) {
      this.message.error(error.message);
    }
  }

  async logout() {
    await this.apiService.api.delete("/auth/logout");
    this.router.navigateByUrl("/auth/login");
  }
}