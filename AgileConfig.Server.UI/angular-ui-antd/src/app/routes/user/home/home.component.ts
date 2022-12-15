import { Component, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html'
})
export class UserHomeComponent implements OnInit {
  constructor(private http: _HttpClient) { }

  ngOnInit(): void { }
  url = `/user/search`;
  columns: STColumn[] = [
    { title: 'ID', index: 'id', width: '150px' },
    { title: '用户名', index: 'userName', width: '120px' },
    { title: '团队', index: 'team', width: '150px' },
    { title: '角色', index: 'userRoleNames', width: '80px' },
    { title: 'userRoles', index: 'userRoles', width: '150px' },
    { title: 'status', index: 'status', width: '100px' },
    { title: 'password', index: 'password', width: '150px' },
    {
      title: '操作',
      width: '150px',
      buttons: []
    }
  ];
}
