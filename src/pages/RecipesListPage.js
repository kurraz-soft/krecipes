import React, { Component } from 'react'
import RecipesList from "../components/RecipesList";
import { connect } from 'react-redux';
import { deleteRecipe } from "../actions/recipeActions";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

@connect((store) => {
    return {
        recipes: store.recipes.recipes,
    };
})
export default class RecipesListPage extends Component
{
    constructor()
    {
        super();

        this.deleteRecipe = this.deleteRecipe.bind(this);
    }

    deleteRecipe(id) {
        this.props.dispatch(deleteRecipe(id));
    }

    render() {
        return (
            <div>
                <div className='row card-panel deep-orange darken-1 white-text card-panel-header'>
                    <div className='col s3'>

                    </div>
                    <div className='col s6 center-align flow-text'>
                        <strong>Recipes</strong>
                    </div>
                    <div className='col s3 right-align'>
                        <Link className='white-text btn-control' to={'/'}><i className='material-icons small'>settings</i></Link>
                    </div>
                </div>

                <RecipesList recipes={this.props.recipes} deleteRecipe={this.deleteRecipe} createRecipe={this.props.createRecipe} />
            </div>
        );
    }
}

RecipesList.propTypes = {
    createRecipe: PropTypes.func,
};