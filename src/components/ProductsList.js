import React from 'react'
import {Link} from 'react-router-dom'
import ProductEdit from './ProductEdit'
import PropTypes from 'prop-types'
import shortid from 'shortid'

export default class ProductsList extends React.Component
{
    render()
    {
        return (
            <div>
                <div className="row" style={{fontWeight: "bold"}}>
                    <div className="col s8">Name</div>
                    <div className="col s1">Quantity</div>
                    <div className="col s1">Price</div>
                    <div className="col s1">Sum</div>
                    <div className="col s1" />
                </div>
                <hr />
                {this.props.products.map(product => {
                    return <ProductEdit product={product} onDelete={this.props.onDelete} key={shortid.generate()}/>
                })}
                <Link className="btn" to={'/addProduct/' + this.props.recipeId}>+</Link>
            </div>
        );
    }
}

ProductsList.propTypes = {
    products: PropTypes.array,
    recipeId: PropTypes.string,
    onDelete: PropTypes.func,
};