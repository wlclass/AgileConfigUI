import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { startPageGuard } from '@core';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';

// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
import { CallbackComponent } from './passport/callback.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, SimpleGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘', titleI18n: 'dashboard' } },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      // 业务子模块
      // { path: 'widgets', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule) },
      {
        path: 'node',
        loadChildren: () => import('./node/node.module').then(m => m.NodeModule),
        data: { title: '节点', titleI18n: 'node' }
      },
      { path: 'app', loadChildren: () => import('./app/app.module').then(m => m.AppModule), data: { title: '应用', titleI18n: 'app' } },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
        data: { title: '客户端', titleI18n: 'app' }
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: { title: '用户', titleI18n: 'client' }
      },
      { path: 'log', loadChildren: () => import('./clog/clog.module').then(m => m.ClogModule), data: { title: '日志', titleI18n: 'log' } }
    ]
  },
  // 空白布局
  // {
  //     path: 'blank',
  //     component: LayoutBlankComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [{ path: 'login', component: UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } }]
  },
  // 单页不包裹Layout
  { path: 'passport/callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {}
