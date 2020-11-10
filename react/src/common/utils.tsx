/**
 * 定义一些全局通用函数
 */
import { Modal } from "antd";
import moment from "moment";
import { withRouter } from "react-router-dom";

export const router = (Comp: any): any => {
    return withRouter(Comp);
}

//设置路径
export function getContextPath() {
    const o: any = document.querySelector("meta[name='contextPath']");
    let url = '';
    if (o && o.content)
        url = o.content;
    if (url.length && url.charAt(url.length - 1) == '/') {
        url = url.substr(0, url.length - 1);
    }
    return url;
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


export const stores: any = {}

/**
 * 注册store
 *
 * @param m
 */
export const registerModule = (m: any): any => {
    for (const i in m) {
        const s: string = i as string
        if (s.endsWith("Store")) {
            const key = s.replace(s[0], s[0].toLowerCase());
            if (stores[key]) {
                throw new Error("多次注册相同名字的store:" + key)
            }
            stores[key] = new m[s]()
        }
    }
    return m;
}

export const globalConfirm = (content: string, okFunc?: any, okparams?: any, cancelFunc?: any): any => {
    return Modal.confirm({
        okText: '取消',
        okType: 'default',
        cancelText: '确定',
        okButtonProps: { type: 'primary', ghost: true, size: 'small' },
        cancelButtonProps: { type: 'primary', size: 'small' },
        autoFocusButton: 'cancel',
        content: content,
        onCancel: () => {
            if (okFunc) {
                if (okparams || okparams === 0)
                    okFunc(okparams)
                else
                    okFunc()
            }
        },
        onOk: () => {
            if (cancelFunc)
                cancelFunc()
        },
        title: '提示信息',
    });
};

/**
 * 时间的短格式
 * @param dateTimeString
 */
export const renderShortDateTime = (dateTimeString: string): string => {
    if (dateTimeString)
        return moment(dateTimeString).format("YYYY-MM-DD HH:mm");
    else
        return "";
};
/**
 * 时间的年月日格式
 * @param dateTime
 */
export const renderDateTime = (dateTime: any): string => {
    if (dateTime)
        return moment(dateTime).format("YYYY-MM-DD");
    else
        return "";
};