import React from 'react'
import PropTypes from 'prop-types'
import EditableText from "./EditableText";
import EditableTextModal from "./EditableTextModal";

export default class ProductEdit extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {...this.props.product};
    }

    handleDelete(e)
    {
        e.preventDefault();
        this.props.onDelete(this.state.id);
    }

    handleChangeQuantity(e)
    {
        this.setState({quantity: e.target.value}, () => {
            this.props.onInputChange(this.state);
        });
    }

    handleChangePrice(e)
    {
        this.setState({price: e.target.value},() => {
            this.props.onInputChange(this.state);
        });
    }

    handleChangeName(value)
    {
        this.setState({name: value},() => {
            this.props.onInputChange(this.state);
        })
    }

    /*handleFocus(e)
    {
        e.target.select();
    }*/

    render()
    {
        return (
            <div className="row">
                <div className="col s5">
                    <EditableTextModal text={this.state.name} onChange={this.handleChangeName.bind(this)} />
                </div>
                <div className="col s2">
                    <input
                        type="number"
                        value={this.state.quantity}
                        /*className="right-align"*/
                        onChange={this.handleChangeQuantity.bind(this)}
                        min="0"
                    />
                </div>
                <div className="col s2">
                    <input
                        type="number"
                        value={this.state.price}
                        /*className="right-align"*/
                        onChange={this.handleChangePrice.bind(this)}
                        min="0"
                    />
                </div>
                <div className="col s2">
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
    onDelete: PropTypes.func,
    onInputChange: PropTypes.func,
};

PropTypes.defaultProps = {
    product: {},
    onDelete: (id) => {},
    onInputChange: (product) => {}
};