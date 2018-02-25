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
            products: [...props.products],
            price_total: this.calcTotalPrice(props.products),
        };
    }

    handleDelete(id)
    {
        const products = this.state.products.filter(item => {
            return item.id !== id;
        });
        this.setState({products: products});
        this.props.onDelete(id);
    }

    calcTotalPrice(products)
    {
        let price_total = 0;
        products.forEach(item => {
            price_total += item.price * item.quantity;
        });

        return price_total;
    }

    handleInputChange(product)
    {
        //assign product to state
        const index = this.state.products.findIndex((item) => {
            return item.id === product.id;
        });

        const products = this.state.products;
        products[index] = product;

        this.setState({products: products, price_total: this.calcTotalPrice(products)});
    }

    render()
    {
        let products = null;
        if(this.props.products.length > 0)
        {
            products = this.props.products.map(product => {
                return <ProductEdit
                    product={product}
                    onDelete={this.handleDelete.bind(this)}
                    key={product.id}
                    onInputChange={this.handleInputChange.bind(this)}
                />
            });
        }else
            products = <div className='center-align'><br /><i>Empty</i><br /><br /></div>;

        return (

            <div>
                <div className="row center-align flow-text" style={{fontWeight: "bold", fontSize:"small"}}>
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
            </div>
        );
    }
}

ProductsEditList.propTypes = {
    products: PropTypes.array,
    recipeId: PropTypes.string,
    onDelete: PropTypes.func,
    onClickAddItem: PropTypes.func,
};

ProductsEditList.defaultProps = {
    products: [],
    onDelete: (id) => {},
    onClickAddItem: () => {},
};