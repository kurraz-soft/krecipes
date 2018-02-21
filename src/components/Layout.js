import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import RecipesListPage from "../pages/RecipesListPage";
import { createRecipe, loadLocalData } from "../actions/recipeActions";
import EditRecipePage from "../pages/EditRecipePage";
import shortid from 'shortid';
import AddProductPage from "../pages/AddProductPage";
import ViewRecipePage from "../pages/ViewRecipePage";

class Layout extends Component
{
    constructor(props)
    {
        super(props);

        props.dispatch(loadLocalData(this.props.history));
    }

    createRecipe()
    {
        const id = shortid.generate();
        this.props.dispatch(createRecipe(id,'New Recipe'));
        this.props.history.push('/editRecipe/' + id);
    }

    render() {
        return (
            <div className="layout">
                <div className="container">
                    <Switch>
                        <Route exact path='/'>
                            <RecipesListPage createRecipe={this.createRecipe.bind(this)}/>
                        </Route>
                        <Route exact path='/editRecipe/:id' render={(props) => (
                            <EditRecipePage {...props} />
                        )} />
                        <Route exact path='/viewRecipe/:id' render={(props) => (
                            <ViewRecipePage {...props} />
                        )} />
                        <Route exact path='/addProduct/:recipe_id' render={props => (
                            <AddProductPage {...props} />
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