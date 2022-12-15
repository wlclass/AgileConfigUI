import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less']
})
export class LayoutPassportComponent implements OnInit {
  constructor(@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, public settings: SettingsService) { }
  links = [
    {
      title: '帮助',
      href: ''
    },
    {
      title: '隐私',
      href: ''
    },
    {
      title: '条款',
      href: ''
    }
  ];
  settingsApp: any;
  ngOnInit(): void {
    this.settingsApp = this.settings['app'];
    this.tokenService.clear();
    this.layoutWidth = document.body.clientWidth;
  }
  layoutWidth: any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resize(event.target.innerHeight, event.target.innerWidth);
  }
  resize(height: any, width: any) {
    this.layoutWidth = width; //992
  }
}
