import React from 'react';
import InputName from "../components/InputName";
import { connect } from 'react-redux'
import {createProduct} from "../actions/productActions";

@connect(store => {
    return {
        products: store.products.products,
        history: store.history,
    };
})
export default class AddProductPage extends React.Component
{
    constructor(props)
    {
        super(props);

        this.recipe_id = props.match.params.recipe_id;

        this.variants = this.props.products.map((item) => {
            return item.name;
        });
    }

    onSubmit(value)
    {
        this.props.dispatch(createProduct(this.recipe_id,value));
        this.props.history.push('/editRecipe/' + this.recipe_id);
    }

    render()
    {
        return (
            <div>
                <InputName
                    backUrl={'/editRecipe/' + this.recipe_id}
                    onSubmit={this.onSubmit.bind(this)}
                    variants={this.variants}
                />
            </div>
        );
    }
}