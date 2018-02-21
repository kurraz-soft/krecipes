import React from 'react'
import PropTypes from 'prop-types'
import EditableText from "./EditableText";

export default class ProductEdit extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            id: this.props.product.id,
            name: this.props.product.name,
            quantity: this.props.product.quantity,
            price: this.props.product.price,
        };
    }

    handleDelete(e)
    {
        e.preventDefault();
        this.props.onDelete(this.state.id);
    }

    handleChangeQuantity(e)
    {
        this.setState({quantity: e.target.value});
    }

    handleChangePrice(e)
    {
        this.setState({price: e.target.value});
    }

    render()
    {
        return (
            <div className="row">
                <div className="col s8">
                    <EditableText text={this.state.name} />
                </div>
                <div className="col s1">
                    <input type="number" value={this.state.quantity} className="right-align" onChange={this.handleChangeQuantity.bind(this)}/>
                </div>
                <div className="col s1">
                    <input type="number" value={this.state.price} className="right-align" onChange={this.handleChangePrice.bind(this)}/>
                </div>
                <div className="col s1">
                    <input type="text" value={this.state.price * this.state.quantity} readOnly className="right-align"/>
                </div>
                <div className="col s1">
                    <a href="#" onClick={this.handleDelete.bind(this)}><i className="material-icons">delete</i></a>
                </div>
            </div>
        );
    }
}

ProductEdit.propTypes = {
    product: PropTypes.object,
    onDelete: (id) => {},
};