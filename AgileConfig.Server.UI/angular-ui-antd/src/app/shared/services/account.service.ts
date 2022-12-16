import { Inject, Injectable } from '@angular/core';
import { DA_SERVICE_TOKEN, TokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';

import { AgileConfigService } from './agile-config.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(
    public http: _HttpClient,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private agileConfigService: AgileConfigService
  ) {}
  loading = false;

  /**
   * 登陆成功后的统一处理
   *
   * @param ret
   */
  private loginBack(ret: any): Promise<any> {
    console.log('', ret);
    return new Promise((resolve, reject) => {
      // 设置Token信息
      this.tokenService.set({
        token: ret.token,
        name: ret.userName,
        team: ret.team,
        id: ret.userId,
        avatar: './assets/avatar.png',
        time: +new Date()
      });

      // 重新获取 StartupService 内容，若其包括 User 有关的信息的话
      // this.startupSrv.loadUser().then(() => {
      //获取当前登录用户的收款账户

      this.loading = false;

      resolve(ret);
      // });
    });
  }
  /**
   * 帐号密码登录
   *
   * @param userName 用户名
   * @param password 密码
   */
  async loginByAccount(userName: string, password: string): Promise<any> {
    this.loading = true;
    var ret = await this.agileConfigService.login(userName, password);
    if (ret.status == 'ok') {
      await this.loginBack(ret);
    } else {
      console.log(`登陆时出错:${ret.message}`);
    }
  }
}
