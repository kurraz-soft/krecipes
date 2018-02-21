import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditableText from "../components/EditableText";
import { editNameRecipe } from "../actions/recipeActions";
import {deleteProduct} from "../actions/productActions";
import ProductsList from "../components/ProductsList";

@connect((store) => {
    return {
        recipes: store.recipes.recipes,
    }
})
export default class EditRecipePage extends Component
{
    constructor(props)
    {
        super(props);

        this.recipe_index = props.recipes.findIndex((item) => {
            return item.id === props.match.params.id;
        });
        this.current_recipe = props.recipes[this.recipe_index];
    }

    onChangeName(value)
    {
        this.props.dispatch(editNameRecipe(this.current_recipe.id, value));
    }

    onProductDelete(id)
    {
        this.props.dispatch(deleteProduct(id,this.current_recipe.id));
    }

    render() {

        const current_recipe = this.props.recipes[this.recipe_index];

        return (
            <div>
                <h4 className="center-align">
                    <EditableText text={ this.current_recipe.name } onChange={ this.onChangeName.bind(this) }/>
                </h4>

                <hr />

                <br />
                <ProductsList
                    recipeId={this.current_recipe.id}
                    products={current_recipe.products}
                    onDelete={this.onProductDelete.bind(this)}
                />
            </div>
        );
    }
}