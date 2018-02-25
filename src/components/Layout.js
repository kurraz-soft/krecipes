import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import 'materialize-css'
import RecipesListPage from "../pages/RecipesListPage";
import { loadLocalData } from "../actions/recipeActions";
import EditRecipePage from "../pages/EditRecipePage";
import ViewRecipePage from "../pages/ViewRecipePage";

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
                </div>
            </div>
        );
    }
}

export default withRouter(connect((store) => {
    return {
    }
})(Layout));