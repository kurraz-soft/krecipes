import React, { Component } from 'react'
import RecipesList from "../components/RecipesList";
import { connect } from 'react-redux';
import { deleteRecipe } from "../actions/recipeActions";
import PropTypes from 'prop-types';

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
                <h3>Shopping List</h3>
                <RecipesList recipes={this.props.recipes} deleteRecipe={this.deleteRecipe} createRecipe={this.props.createRecipe} />
            </div>
        );
    }
}

RecipesList.propTypes = {
    createRecipe: PropTypes.func,
};