/**
 * 定义分页对象
 */
export interface AppPagination {
    /** 总数 */
    total: number;
    /** 当前页 */
    current: number;
}
/**
 * 定义分页data格式
 */
export interface PageData<T> {
    /** 总数 */
    total: number;
    /** 当前页 */
    results: T[];
}