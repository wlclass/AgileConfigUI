import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { ClogRoutingModule } from './clog-routing.module';
import { ClogHomeComponent } from './home/home.component';

const COMPONENTS: Array<Type<void>> = [ClogHomeComponent];

@NgModule({
  imports: [SharedModule, ClogRoutingModule],
  declarations: COMPONENTS
})
export class ClogModule {}
