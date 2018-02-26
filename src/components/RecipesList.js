import React, { Component } from 'react'
import Recipe from "./Recipe";
import PropTypes from 'prop-types';

export default class RecipesList extends Component
{
    render() {

        let recipes = <div className='center-align'><i>No recipes</i></div>;
        if(this.props.recipes.length > 0)
        {
            recipes = this.props.recipes.map((item) => {
                return <Recipe item={item} key={item.id} deleteRecipe={this.props.deleteRecipe}/>
            });
        }


        return (
            <div>
                <div className='row'>
                    <button onClick={this.props.createRecipe} className="btn center-align col s12">Create new Recipe</button>
                </div>

                <div>
                    {recipes}
                </div>

                <div className="fixed-action-btn">
                    <button
                        onClick={this.props.createRecipe}
                        className="btn-floating btn-large waves-effect waves-light red"
                    >
                        <i className="material-icons">{'add'}</i>
                    </button>
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