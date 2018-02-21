import React from 'react'
import {Link} from 'react-router-dom'
import ProductEdit from './ProductEdit'
import PropTypes from 'prop-types'

export default class ProductsEditList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            products: [...this.props.products],
        };
    }

    handleInputChange(product)
    {
        //assign product to state
        const index = this.state.products.findIndex((item) => {
            return item.id === product.id;
        });

        const products = this.state.products;
        products[index] = product;
        this.setState({products: products});
    }

    render()
    {
        return (
            <div>
                <div className="row center-align" style={{fontWeight: "bold"}}>
                    <div className="col s5">Name</div>
                    <div className="col s2">Quantity</div>
                    <div className="col s2">Price</div>
                    <div className="col s2">Sum</div>
                    <div className="col s1" />
                </div>
                <hr />
                {this.props.products.map(product => {
                    return <ProductEdit
                        product={product}
                        onDelete={this.props.onDelete}
                        key={product.id}
                        onInputChange={this.handleInputChange.bind(this)}
                    />
                })}
                <Link className="btn" to={'/addProduct/' + this.props.recipeId}>+</Link>
            </div>
        );
    }
}

ProductsEditList.propTypes = {
    products: PropTypes.array,
    recipeId: PropTypes.string,
    onDelete: PropTypes.func,
};