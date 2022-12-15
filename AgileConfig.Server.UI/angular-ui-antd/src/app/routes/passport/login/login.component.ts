import { Component, Inject, OnDestroy, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { DA_SERVICE_TOKEN, SocialOpenType, SocialService, TokenService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { AccountService } from '../../../shared/services/account.service';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService]
})
export class UserLoginComponent implements OnDestroy {
  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    modalSrv: NzModalService,
    private accountSev: AccountService,
    public http: _HttpClient,
    private settingsService: SettingsService,
    private notification: NzNotificationService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true]
    });
    modalSrv.closeAll();
  }

  // region: fields

  get userName() {
    return this.form.controls['userName'];
  }
  get password() {
    return this.form.controls['password'];
  }

  form: FormGroup;
  error = '';
  type = 0;
  loading = false;
  @ViewChild('template') template!: TemplateRef<{}>;

  // region: get captcha

  count = 0;
  interval$: any;

  submit() {
    this.error = '';
    let loginAct: Promise<any>;

    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) {
        return;
      }
      loginAct = this.accountSev.loginByAccount(this.userName.value, this.password.value);
    } else {
      //TODO:手机号登陆暂时屏蔽
    }
    loginAct!.then((p: any) => {
      // 清空路由复用信息
      this.reuseTabService.clear();
      const url = '/';
      this.router.navigate([url]);
      this.startupSrv.load();
    });
  }

  // endregion
  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
