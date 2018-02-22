import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Product from "../components/Product";
import {setRecipeProductActivity} from "../actions/recipeActions";

@connect((store) => {
    return {
        recipes: store.recipes.recipes,
    }
})
export default class ViewRecipePage extends Component
{
    constructor(props)
    {
        super(props);
        this.current_recipe = props.recipes.find((item) => {
            return item.id === this.props.match.params.id;
        });

        let total_price = 0;
        let price_left = 0;
        this.current_recipe.products.forEach(product => {
            total_price += product.price * product.quantity;
            if(product.is_active)
                price_left += product.price * product.quantity;
        });

        this.state = {
            price_total: total_price,
            price_left: price_left,
        }
    }

    handleToggleActive(product_id, is_active)
    {
        this.props.dispatch(setRecipeProductActivity(this.current_recipe.id,product_id,is_active));

        const product = this.current_recipe.products.find(product => {
            return product.id === product_id;
        });
        let price_left = is_active?
            (this.state.price_left + product.price * product.quantity):
            (this.state.price_left - product.price * product.quantity);

        this.setState({price_left: price_left});
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col s3'>
                        <Link to={'/'}><h4><i className='material-icons'>chevron_left</i></h4></Link>
                    </div>
                    <div className='col s6'>
                        <h4 className="center-align">
                            {this.current_recipe.name}
                        </h4>
                    </div>
                    <div className='col s3 right-align'>
                        <Link to={'/editRecipe/' + this.current_recipe.id}><h5>Edit</h5></Link>
                    </div>
                </div>
                <hr />

                <br />
                <div className="row center-align" style={{fontWeight: "bold"}}>
                    <div className="col s5">Name</div>
                    <div className="col s2">Quantity</div>
                    <div className="col s2">Price</div>
                    <div className="col s2">Sum</div>
                    <div className="col s1" />
                </div>
                <hr />
                {this.current_recipe.products.map((product) => {
                    return <Product product={product} key={product.id} onToggleActive={this.handleToggleActive.bind(this)}/>
                })}
                <hr />
                <div className="row" style={{fontWeight: 'bold'}}>
                    <div className="col s10 right-align">Total</div>
                    <div className="col s1 right-align">{this.state.price_total.toFixed(2)}</div>
                </div>
                <div className="row" style={{fontWeight: 'bold'}}>
                    <div className="col s10 right-align">Left</div>
                    <div className="col s1 right-align">{this.state.price_left.toFixed(2)}</div>
                </div>
            </div>
        );
    }
}