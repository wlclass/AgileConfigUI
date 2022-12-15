import { Component, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-clog-home',
  templateUrl: './home.component.html'
})
export class ClogHomeComponent implements OnInit {
  constructor(private http: _HttpClient) { }

  ngOnInit(): void { }
  url = `/syslog/search`;
  columns: STColumn[] = [
    { title: 'ID', index: 'id', width: '100px' },
    { title: '应用ID', index: 'appId', width: '150px' },
    { title: '类型', index: 'logType', width: '80px' },
    { title: '时间', index: 'logTime', type: 'date', width: '150px' },
    { title: '内容', index: 'logText' }
  ];
}
