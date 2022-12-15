/**
 * 系统信息
 */
export interface Sysinfo {
    /**
     * app版本号
     */
    appVer: string;
    /**
     * 环境列表
     */
    envList?: string[];
    passwordInited?: boolean;
}
