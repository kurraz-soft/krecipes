import React from 'react'
import PropTypes from 'prop-types'

export default class AddProductButton extends React.Component
{
    /*handleDoneBtnClick(e)
    {
        e.preventDefault();
        e.target
            .parentElement
            .parentElement
            .dispatchEvent(new Event('submit'));
    }*/

    handleClear(e)
    {
        this.props.onClear(e);
        this.input.focus();
    }

    render ()
    {
        if(this.props.inputModeEnabled)
        {
            let clearBtn = '';
            if(this.props.value.length > 0)
            {
                clearBtn =
                    <a href='#' onClick={this.handleClear.bind(this)}>
                        <i className='prefix material-icons' style={{right: 0}}>cancel</i>
                    </a>
            }

            return (
                <div className='col s12' style={{padding: '5px'}}>
                    <form onSubmit={this.props.onSubmit}>
                        <div className='col s10 input-field'>
                            <input
                                type='text'
                                onChange={this.props.onChange}
                                value={this.props.value}
                                autoFocus={true}
                                ref={(input) => this.input = input}
                            />
                            {clearBtn}
                            <label style={{marginLeft: 0}}>Product Name</label>
                        </div>
                        <div className='col s2 flow-text' style={{lineHeight: '63px'}}>
                            <a href='#' onClick={this.props.onDone}>Done</a>
                        </div>
                    </form>
                </div>
            )
        }else
            return (
                <button className="btn col s12" onClick={this.props.onSwitchMode}>Add Item</button>
            )
    }
}

AddProductButton.propTypes = {
    inputModeEnabled: PropTypes.bool,
    onChange: PropTypes.func,
    onSwitchMode: PropTypes.func,
    onSubmit: PropTypes.func,
    onClear: PropTypes.func,
    onDone: PropTypes.func,
};

AddProductButton.defaultProps = {
    inputModeEnabled: false,
    onChange: (e) => {},
    onSwitchMode: () => {},
    onSubmit: (e) => {},
    onDone: (e) => {},
};