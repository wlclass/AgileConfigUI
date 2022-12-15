import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { lastValueFrom } from 'rxjs';

import { CurrentUserInfo } from '../models/current-user-info';
import { LoginResult } from '../models/login';
import { Sysinfo } from '../models/sysinfo';

@Injectable({
  providedIn: 'root'
})
export class AgileConfigService {
  constructor(private http: _HttpClient) { }
  // host = 'http://config.yw.justwei.com';
  host = '';
  /**
   * 登陆
   *
   * @param userName 用户名
   * @param password 密码
   * @returns
   */
  async login(userName: string, password: string): Promise<LoginResult> {
    const url = `${this.host}/admin/jwt/login`;
    const loginModel = { userName, password };
    const r = await lastValueFrom<LoginResult>(this.http.post(url, loginModel));
    return r;
  }
  /**
   *
   * @returns 获取系统信息
   */
  async getSysInfo() {
    const url = `${this.host}/Home/sys`;
    const r = await lastValueFrom<Sysinfo>(this.http.get(url));
    return r;
  }
  /**
   *
   * @returns 获取当前用户信息
   */
  async getCurrentUserInfo() {
    const url = `${this.host}/Home/current`;
    const r = await lastValueFrom<{ currentUser: CurrentUserInfo }>(this.http.get(url));
    return r.currentUser ?? {};
  }
  //todo:最近访问的应用从本地存储中获取
}
