import React from 'react'
import PropTypes from 'prop-types'

export default class Product extends React.Component
{
    render()
    {
        return (
            <div className="row">
                <div className="col s8">{this.props.product.name}</div>
                <div className="col s1 right-align">{this.props.product.quantity}</div>
                <div className="col s1 right-align">{this.props.product.price}</div>
                <div className="col s1 right-align">{this.props.product.price * this.props.product.quantity}</div>
                <div className="col s1" />
            </div>
        );
    }
}

Product.propTypes = {
    product: PropTypes.object,
};