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

    componentWillReceiveProps(nextProps)
    {
        this.current_recipe = nextProps.recipes.find((item) => {
            return item.id === this.props.match.params.id;
        });

        let price_left = 0;
        this.current_recipe.products.forEach(item => {
            if(item.is_active)
                price_left += item.price * item.quantity;
        });

        this.setState({price_left: price_left});
    }

    handleToggleActive(product_id, is_active)
    {
        this.props.dispatch(setRecipeProductActivity(this.current_recipe.id,product_id,is_active));
    }

    render() {

        let products = '';
        if(this.current_recipe.products.length > 0)
        {
            products = this.current_recipe.products.map((product) => {
                return <Product product={product} key={product.id} onToggleActive={this.handleToggleActive.bind(this)}/>
            });
        }else
            products = <div className='center-align'><br /><i>Empty</i><br /><br /></div>;

        return (
            <div>
                <div className='row card-panel deep-orange darken-1 white-text card-panel-header'>
                    <div className='col s3'>
                        <Link className='white-text btn-back' to={'/'}><i className='material-icons medium'>navigate_before</i></Link>
                    </div>
                    <div className='col s6 center-align card-panel-header-title'>
                        <strong>{this.current_recipe.name}</strong>
                    </div>
                    <div className='col s3 right-align'>
                        <Link className='white-text btn-control' to={'/editRecipe/' + this.current_recipe.id}><i className='material-icons small'>edit</i></Link>
                    </div>
                </div>

                <br />
                <div className="row center-align" style={{fontWeight: "bold"}}>
                    <div className="col s5">Name</div>
                    <div className="col s2">Quantity</div>
                    <div className="col s2">Price</div>
                    <div className="col s2">Sum</div>
                    <div className="col s1" />
                </div>
                <hr />
                {products}
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