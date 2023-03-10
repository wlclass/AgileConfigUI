import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

const CODEMESSAGE: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  private get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private get serverUrl(): string {
    // return this.injector.get(SettingsService);
    return environment['SERVER_URL'];
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  /**
   * 判断指定的对象是否为SimpleStatusResult类型
   *
   * @param data
   */
  private isSimpleStatusResult(data: any): boolean {
    if (data && data.hasOwnProperty('Status') && data.hasOwnProperty('Code') && data.hasOwnProperty('Text')) {
      return true;
    } else {
      return false;
    }
  }

  private checkStatus(ev: HttpResponseBase) {
    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
      return;
    }

    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    // this.notification.error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
  }

  private handleData(event: HttpResponseBase, req: HttpRequest<any>): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作

    if (event.status > 0) {
      //TODO:升13时出错,暂时屏蔽
      // this.injector.get(_HttpClient).end();
    }
    // 不显示错误提示
    const noShowErr = req.headers.has('noerr');

    if (!noShowErr) {
      this.checkStatus(event);
    }

    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        if (event instanceof HttpResponse) {
          const body: any = event.body;
          // console.log(this.isSimpleStatusResult(body), body);
          if (this.isSimpleStatusResult(body)) {
            if (body.Status !== true) {
              if (body.Code == 401) {
                this.goTo('/passport/login');
                return of(event);
              }
              if (!noShowErr) {
                this.notification.error('出错了', body.Text);
              }

              // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
              // this.http.get('/').subscribe() 并不会触发
              return throwError({});
            } else {
              // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
              return of(new HttpResponse(Object.assign(event as any, { body: body.Data })));
              //// 或者依然保持完整的格式
              // return of(event);
            }
          } else {
            // 保持完整的格式
            return of(event);
          }
        }
        break;
      case 401: // 未登录状态码
        if (!noShowErr) {
          // this.notification.error(`未登录或登录已过期，请重新登录。`, ``);
        }

        (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
        this.goTo('/passport/login');
        break;
      case 403:
      case 404:
      case 500:
        return of(); //TODO:升13时出错,暂时新增
        // return;
        // this.goTo(`/exception/${event.status}`);
        break;
      default:
        this.reportEvent(event);

        if (event instanceof HttpErrorResponse) {
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', event);

          if (!noShowErr) {
            this.notification.error(`获取数据时出错`, event.message);
          }
          // this.logSev.SubmitException()
          // return throwError(event); // 这里要抛出错误吗?
        }
        break;
    }
    return of(event);
  }

  /**
   * 上报错误
   *
   * @param event
   */
  reportEvent(event: any) {
    if (event instanceof HttpErrorResponse) {
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      if (url.startsWith('/') || url.startsWith('\\')) {
        url = this.serverUrl + url;
      } else {
        url = `./${url}`;
      }
    }

    const newReq = req.clone({
      url: url
    });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
        if (event instanceof HttpResponseBase /*&& event.status === 200*/) {
          return this.handleData(event, newReq);
        }

        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err, newReq))
    );
  }
}
