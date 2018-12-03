import * as React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import ResultPage, { ResultPageProps } from './pages/ResultPage';
import FaqPage from './pages/FaqPage';

export type RailsAppProps = ResultPageProps | null

const Routes = (props: RailsAppProps) => {
    return (
        <Switch>
            <Route exact path="/" render={routeProps => <Redirect to="/results"/>}/>
            <Route exact path="/faq" render={routeProps => <FaqPage {...routeProps} />}/>
            <Route path="/results"
                   render={routeProps => <ResultPage {...routeProps} {...props} />}/>
        </Switch>
    )
}

export default Routes
