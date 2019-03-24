import * as React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import HomePage, { HomePageProps } from './pages/HomePage';
import FaqPage from './pages/FaqPage';

export type RailsAppProps = HomePageProps | null

const Routes = (props: RailsAppProps) => {
    return (
        <Switch>
            <Route exact path="/" render={routeProps => <Redirect to="/results"/>}/>
            <Route exact path="/faq" render={routeProps => <FaqPage {...routeProps} />}/>
            <Route path="/home"
                   render={routeProps => <HomePage {...routeProps} {...props} />}/>
        </Switch>
    )
}

export default Routes
