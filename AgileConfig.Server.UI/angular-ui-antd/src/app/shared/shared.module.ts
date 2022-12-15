import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { AlainThemeModule } from '@delon/theme';
import { MomentModule, TimeAgoPipe } from 'ngx-moment';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { AppAuthComponent } from './components/app-auth/app-auth.component';
import { AppEditorComponent } from './components/app-editor/app-editor.component';
import { ConfigGroupTreeComponent } from './components/config-group-tree/config-group-tree.component';
import { ConfigItemEditorComponent } from './components/config-item-editor/config-item-editor.component';
import { ConfigItemHistoryComponent } from './components/config-item-history/config-item-history.component';
import { SHARED_DELON_MODULES } from './shared-delon.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';

// #region third libs

const THIRDMODULES: Array<Type<void>> = [MomentModule, MonacoEditorModule];

// #endregion

// #region your componets & directives

const COMPONENTS: Array<Type<void>> = [
  ConfigGroupTreeComponent,
  ConfigItemEditorComponent,
  ConfigItemHistoryComponent,
  AppEditorComponent,
  AppAuthComponent
];
const DIRECTIVES: Array<Type<void>> = [];

// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonACLModule,
    DelonFormModule,
    ...SHARED_DELON_MODULES,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonACLModule,
    DelonFormModule,
    ...SHARED_DELON_MODULES,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }
