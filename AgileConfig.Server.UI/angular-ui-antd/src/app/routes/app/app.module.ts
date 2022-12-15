import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { AppRoutingModule } from './app-routing.module';
import { AppHomeComponent } from './home/home.component';
import { AppConfigComponent } from './config/config.component';

const COMPONENTS: Type<void>[] = [
  AppHomeComponent,
  AppConfigComponent];

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  declarations: COMPONENTS,
})
export class AppModule { }
