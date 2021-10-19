/**app通用颜色 */
export const appColor = {
    /**白色 */
    white: '#ffffff',
    /**灰白色 */
    grayWhite: 'rgba(255,255,255,.618)',
    /**黑色 */
    black: '#000000',
    /**深蓝色：一般用于超链接 */
    deepBlue: 'rgb(0, 27, 160)',
    /**亮绿色 */
    lightGreen: '#52c41a',
    /**蓝色：antd默认主题色 */
    blue: '#1890ff',
    /**红色 */
    red: 'red',
    /**绿色 */
    green: 'green',
    /**茉莉黄 */
    molihuang: '#f8df72',
}

/**app通用高度或宽度值 */
export const appTheme = {
    /**header高度：56px */
    headerHeight: 56,
    /**toolbar高度：50px */
    toolbarHeight: 50,
    /**树形区域宽度：300px */
    treeWidth: 300,
    /**左侧Navbar宽度：150px */
    navbarWidth: 150,
    /**树形区域宽度：80px */
    navbarMiniWidth: 80,
}

export function getContextPath() {
    let url = (<any>window).contextPath || '';
    if (url.charAt(url.length - 1) === '/') {
        url = url.substr(0, url.length - 1);
    }
    return url;
}

/**
 * 每页条数
 */
export const pageSize = 50;

export function isNullOrUndefined(obj: any): boolean {
    return obj === null || obj === undefined;
}

export const SERVICE_URI = process.env.SERVICE_URI;

export enum StateKeys {
    MAIN = 'main', /**应用程序入口 */
    BRANCH = 'branch',/**党组织管理 */
    MEMBER = 'member',/**党员管理 */
    TRANSITION = 'transition',/**组织关系转接 */
    /** 系统管理 */
    SYSTEM = 'system',
    REPORT='report',

}

export function getCrsfTokenHeader() {
    const csrfHeaderName: any = document.querySelector("meta[name='csrfHeaderName']");
    const csrfToken: any = document.querySelector("meta[name='csrfToken']");
    if (csrfHeaderName && csrfToken) {
        return {
            [csrfHeaderName.content]: csrfToken.content
        };
    }
    else
        return undefined;
}