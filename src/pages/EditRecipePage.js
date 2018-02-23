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
        this.props.dispatch(saveRecipeProducts(this.current_recipe.id,this.productList.props.products));
    }

    render() {

        const current_recipe = this.props.recipes[this.recipe_index];

        return (
            <div>
                <div className='row card-panel deep-orange darken-1 white-text card-panel-header'>
                    <div className='col s3'>
                        <Link title='Cancel' className='white-text btn-back' to={'/'}><i className='material-icons medium'>navigate_before</i></Link>
                    </div>
                    <div className='col s6 center-align card-panel-header-title'>
                        <strong>
                            <EditableText text={ this.current_recipe.name } onChange={ this.onChangeName.bind(this) }/>
                        </strong>
                    </div>
                    <div className='col s3 right-align'>
                        <Link title='Save' className='white-text btn-control' to={'/viewRecipe/' + this.current_recipe.id} onClick={this.onSave.bind(this)}>
                            <i className='material-icons small'>save</i>
                        </Link>
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