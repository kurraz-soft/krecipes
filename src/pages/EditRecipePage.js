import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditableText from "../components/EditableText";
import {editNameRecipe, saveRecipeProducts} from "../actions/recipeActions";
import {deleteProduct} from "../actions/productActions";
import ProductsEditList from "../components/ProductsEditList";
import {Link} from 'react-router-dom'

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

        this.productList = null;

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

    onSave()
    {
        this.props.dispatch(saveRecipeProducts(this.current_recipe.id,this.productList.state.products));
    }

    render() {

        const current_recipe = this.props.recipes[this.recipe_index];

        return (
            <div>
                <div className='row'>
                    <div className='col s3'>
                        <Link to={'/'}><h5>Cancel</h5></Link>
                    </div>
                    <div className='col s6'>
                        <h4 className="center-align">
                            <EditableText text={ this.current_recipe.name } onChange={ this.onChangeName.bind(this) }/>
                        </h4>
                    </div>
                    <div className='col s3 right-align'>
                        <Link to={'/'} onClick={this.onSave.bind(this)}><h5>Save</h5></Link>
                    </div>
                </div>

                <hr />

                <br />
                <ProductsEditList
                    recipeId={this.current_recipe.id}
                    products={current_recipe.products}
                    onDelete={this.onProductDelete.bind(this)}
                    ref={(productsList) => this.productList = productsList}
                />
            </div>
        );
    }
}