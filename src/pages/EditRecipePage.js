import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditableText from "../components/EditableText";
import { editNameRecipe } from "../actions/recipeActions";

@connect((store) => {
    return {
        recipes: store.recipes.recipes,
    }
})
export default class EditRecipePage extends Component
{
    componentWillMount()
    {
        this.current_recipe = null;

        this.current_recipe = this.props.recipes.find((item) => {
            return item.id === this.props.match.params.id;
        });
    }

    onChangeName(value)
    {
        console.log(value);
        this.props.dispatch(editNameRecipe(this.current_recipe.id, value));
    }

    render() {

        return (
            <div>
                <h4 className="center-align">
                    <EditableText text={ this.current_recipe.name } onChange={ this.onChangeName.bind(this) }/>
                </h4>
            </div>
        );
    }
}