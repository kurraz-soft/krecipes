import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import 'materialize-css'
import RecipesListPage from "../pages/RecipesListPage";
import { loadLocalData } from "../actions/recipeActions";
import EditRecipePage from "../pages/EditRecipePage";
import ViewRecipePage from "../pages/ViewRecipePage";
import {TransitionGroup, CSSTransition} from 'react-transition-group'

class Layout extends Component
{
    constructor(props)
    {
        super(props);

        props.dispatch(loadLocalData(this.props.history));
    }

    render() {
        return (
            <div className="layout">
                <div className="container">
                    <TransitionGroup>
                        <CSSTransition
                            key={this.props.history.location.pathname}
                            classNames='fade'
                            timeout={1000}
                            appear={true}
                            exit={false}
                            /*onEnter={() => {
                                window.scrollTo(0, 0);
                            }}*/
                        >
                            <Switch>
                                <Route exact path='/' render={(props) => (
                                    <RecipesListPage {...props} />
                                )}/>
                                <Route exact path='/editRecipe/:id' render={(props) => (
                                    <EditRecipePage {...props} />
                                )} />
                                <Route exact path='/viewRecipe/:id' render={(props) => (
                                    <ViewRecipePage {...props} />
                                )} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </div>
        );
    }
}

export default withRouter(connect((store) => {
    return {
    }
})(Layout));