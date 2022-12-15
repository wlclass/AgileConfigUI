import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconService } from 'ng-zorro-antd/icon';
import { Observable, zip, of, catchError, map } from 'rxjs';
import { CurrentUserInfo } from 'src/app/shared/models/current-user-info';
import { AgileConfigService } from 'src/app/shared/services/agile-config.service';

import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private agileConfigService: AgileConfigService,
    private router: Router
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(): Observable<void> {
    return this.httpClient.get('assets/app-data.json').pipe(
      catchError((res: NzSafeAny) => {
        console.warn(`StartupService.load: Network request failed`, res);
        setTimeout(() => this.router.navigateByUrl(`/exception/500`));
        return of({});
      }),
      map((res: NzSafeAny) => {
        this.settingService.setApp(res.app);
        this.agileConfigService.getCurrentUserInfo().then((ret: CurrentUserInfo) => {
          this.settingService.setUser({
            name: ret.userName,
            team: ret.team,
            id: ret.userId,
            // email: `ret.email`,
            avatar: './assets/avatar.png'
          });
        });
        //TODO:判断用户是否登陆,也及是否是超级管理员,设置相应权限
        this.aclService.setFull(true);

        this.menuService.add(res.menu);
        this.titleService.suffix = res.app.name;
      })
    );
  }

  load(): Observable<void> {
    return this.viaHttp();
  }
}
