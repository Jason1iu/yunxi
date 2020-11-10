export interface Action<TPayload> {
    type: string;
    payload: TPayload;
}

export interface IActionCreator<P> {
    type: string;
    (payload: P): Action<P>;
}

export function actionCreator<P>(type: string): IActionCreator<P> {
    return Object.assign(
        (payload: P) => ({ type, payload }),
        { type }
    );
}

export function isType<P>(action: Action<any>, acreator: IActionCreator<P>): action is Action<P> {
    return action.type == acreator.type;
}