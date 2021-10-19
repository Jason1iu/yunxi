
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Redirect, Route } from 'react-router-dom';
import MainHeader from './MainHeader';
import { fetchUserInfoAsync } from './slice';
import { ReduxState } from '../store';

const MainApp = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchUserInfoAsync());
    }, []);

    const { userInfo } = useSelector((state: ReduxState) => state.main);

    if (!userInfo)
        return <div className="mainSlogan" />

    return (
        <>
            <MainHeader />
            <main className="flex-fill d-flex flex-row overflow-hidden container-fluid px-0" style={{ position: 'relative' }}>
                <Switch>
                    <Route path={`/home`} render={() => <div>建设中...</div>} />
                    <Redirect to={`/home`} />
                </Switch>
            </main>
        </>
    );
}

export default MainApp;