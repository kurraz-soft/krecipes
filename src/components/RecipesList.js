import React, { Component } from 'react'
import Recipe from "./Recipe";
import PropTypes from 'prop-types';

export default class RecipesList extends Component
{
    render() {

        const recipes = this.props.recipes.map((item, index) => {
            return <Recipe item={item} key={index} deleteRecipe={this.props.deleteRecipe}/>
        });

        return (
            <div>
                <div>
                    { recipes }
                    <button onClick={this.props.createRecipe} className="btn">+</button>
                </div>
            </div>
        );
    }
}

RecipesList.propTypes = {
    recipes: PropTypes.array,
    deleteRecipe: PropTypes.func,
    createRecipe: PropTypes.func,
};