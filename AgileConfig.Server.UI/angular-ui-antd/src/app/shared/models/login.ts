/**
 * 登陆返回
 */
export interface LoginResult {
    /**
     * 当前用户的角色集合
     */
    currentAuthority: string[];
    /**
     * 当前用户的权限集合
     */
    currentFunctions: string[];
    /**
     * 状态,如:ok,error
     */
    status: string;
    /**
     * jwt token
     */
    token: string;
    /**
     * 授权类型,如:Bearer
     */
    type: string;
    /**
     * 错误消息,如:密码错误
     */
    message: string;
}
