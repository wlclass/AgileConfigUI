/**
 * 当前用户信息
 */
export interface CurrentUserInfo {
    /**
     * 当前用户的角色集合
     */
    currentAuthority: string[];
    /**
     * 当前用户的权限集合
     */
    currentFunctions: string[];
    /**
     * 用户的id
     */
    userId: string;
    /**
     * 用户名
     */
    userName: string;
    team: string;
}
