import React from 'react'
import PropTypes from 'prop-types'

export default class ProductEdit extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            quantity: 1,
            price: 0,
        };
    }

    render()
    {
        return (
            <div className="row">
                <div className="col s8">{this.state.name}</div>
                <div className="col s1">
                    <input type="number" value={this.state.quantity}/>
                </div>
                <div className="col s1">
                    <input type="number" value={this.state.price}/>
                </div>
                <div className="col s1">{this.state.price * this.state.quantity}</div>
                <div className="col s1">
                    <a href="#"><i className="material-icons">delete</i></a>
                </div>
            </div>
        );
    }
}

ProductEdit.propTypes = {
    product: PropTypes.object,
};