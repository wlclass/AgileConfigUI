import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STColumn, STColumnBadge, STColumnTag } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { copy } from '@delon/util';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppAuthComponent } from 'src/app/shared/components/app-auth/app-auth.component';
import { AppEditorComponent } from 'src/app/shared/components/app-editor/app-editor.component';

const ISPUBLICTAG: STColumnBadge = {
  true: { text: '公共', color: 'success' },
  false: { text: '私有', color: 'default' }
};

@Component({
  selector: 'app-app-home',
  templateUrl: './home.component.html'
})
export class AppHomeComponent implements OnInit {
  constructor(public msg: NzMessageService, private router: Router, private http: _HttpClient) { }

  ngOnInit(): void { }
  url = `/app/search`;
  columns: STColumn[] = [
    { title: '名称', index: 'name', width: '120px' },
    { title: '应用Id', index: 'id', width: '150px' },
    { title: '密钥', index: 'secret', render: 'secret', width: '150px' },
    { title: '应用组', index: 'group', width: '150px' },
    { title: '创建时间', index: 'createTime', type: 'date', width: '150px' },
    { title: '管理员', index: 'appAdminName', width: '150px' },
    { title: '公共', index: 'inheritanced', width: '150px', type: 'badge', badge: ISPUBLICTAG },
    { title: '关联', index: 'inheritancedAppNames', width: '150px' },
    { title: '启用', index: 'enabled', width: '150px' },
    {
      title: '操作',
      width: '150px',
      buttons: [
        {
          text: '配置项',
          icon: 'bars',
          click: (item: any) => {
            this.router.navigate(['/app/config', item.id]);
          }
        },
        {
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: AppEditorComponent
          },
          click: (_record, modal) => this.msg.success(`重新加载页面，回传值：${JSON.stringify(modal)}`)
        },
        {
          text: '授权',
          // icon: 'key',
          icon: 'lock',
          type: 'modal',
          modal: {
            component: AppAuthComponent
          },
          click: (_record, modal) => this.msg.success(`重新加载页面，回传值：${JSON.stringify(modal)}`)
        },
        {
          icon: 'delete',
          type: 'del',
          pop: {
            title: '您确定要删除这个应用吗?',
            okType: 'danger',
            icon: 'exclamation-circle'
          },
          click: (record, _modal, comp) => {
            this.msg.success(`成功删除【${record.name}】`);
            comp!.removeRow(record);
          }
        }
      ]
    }
  ];
  displaySecret: any = {};
  toggleSecretDisplay(key: string) {
    this.displaySecret[key] = !this.displaySecret[key];
  }
  copy(data: any) {
    copy(data).then((res: any) => {
      this.msg.success(`复制成功！`);
    });
  }
}
