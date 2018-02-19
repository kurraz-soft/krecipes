import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditableText from "../components/EditableText";
import { editNameRecipe } from "../actions/recipeActions";
import ProductEdit from "../components/ProductEdit";

@connect((store) => {
    return {
        recipes: store.recipes.recipes,
        products: store.products.products,
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

                <hr />

                <br />
                <div>
                    <div className="row" style={{fontWeight: "bold"}}>
                        <div className="col s8">Name</div>
                        <div className="col s1">Quantity</div>
                        <div className="col s1">Price</div>
                        <div className="col s1">Sum</div>
                        <div className="col s1" />
                    </div>
                    <hr />
                    {this.current_recipe.products.map(product => {
                        return <ProductEdit product={product}/>
                    })}
                    <button className="btn">+</button>
                </div>
            </div>
        );
    }
}