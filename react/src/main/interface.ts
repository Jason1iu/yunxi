export interface MainReduxState {
    loading: boolean;
    userInfo?: LoginUser;//用户登录信息
}

export interface LoginUser {
    current: User;
    users: User[];
}

export interface User {
    id: number;
    name: string;
}
