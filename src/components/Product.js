import React from 'react'
import PropTypes from 'prop-types'

export default class Product extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    handleToggleActive()
    {
        this.props.onToggleActive(this.props.product.id, !this.props.product.is_active);
    }

    render()
    {
        return (
            <div
                className={'row card-panel ' + (this.props.product.is_active?'':'teal lighten-2 cross-out')}
                onClick={this.handleToggleActive.bind(this)}
                style={{padding:'10px', lineHeight: '30px'}}
            >
                <div className="col s5" style={{textDecoration: 'inherit', fontSize: 'large'}}>{this.props.product.name}</div>
                <div className="col s2 right-align">{this.props.product.quantity}</div>
                <div className="col s2 right-align">{Number.parseFloat(this.props.product.price).toFixed(2)}</div>
                <div className="col s2 right-align">{(this.props.product.price * this.props.product.quantity).toFixed(2)}</div>
                <div className="col s1" style={{height: '34px'}}>
                    <i className='material-icons green-text text-darken-3' style={{fontWeight: 'bold'}}>{this.props.product.is_active?'':'check'}</i>
                </div>
            </div>
        );
    }
}

Product.propTypes = {
    product: PropTypes.object,
    onToggleActive: PropTypes.func,
};