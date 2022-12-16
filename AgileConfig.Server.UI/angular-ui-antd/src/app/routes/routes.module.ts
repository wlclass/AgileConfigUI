import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
import { CallbackComponent } from './passport/callback.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { RouteRoutingModule } from './routes-routing.module';

const COMPONENTS: Array<Type<void>> = [
  DashboardComponent,
  // passport pages
  // single pages
  UserLoginComponent,
  CallbackComponent
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: COMPONENTS
})
export class RoutesModule {}
