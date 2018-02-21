import React from 'react'
import PropTypes from 'prop-types'

export default class EditableText extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: props.text,
            edit_mode: false,
        };

        this.switchMode.bind(this);
    }

    switchMode()
    {
        this.setState({edit_mode: !this.state.edit_mode});
    }

    handleEditSubmit(e)
    {
        e.preventDefault();
        this.setState({text: this.input.value});
        this.switchMode();
        this.props.onChange(this.input.value);
    }

    handleEditCancel()
    {
        this.switchMode();
    }

    render() {

        let content = null;

        if(!this.state.edit_mode)
        {
            content =
                <div>
                    { this.state.text }
                    &nbsp;
                    <a href="#" onClick={ (e) => {e.preventDefault(); this.switchMode();} }>
                        <i className="material-icons">edit</i>
                    </a>
                </div>;
        }else
        {
            content =
                <div>
                    <form onSubmit={this.handleEditSubmit.bind(this)} className="row">
                        <div className="col s8">
                            <input type="text" defaultValue={ this.state.text } ref={input => this.input = input} autoFocus />
                        </div>
                        <div className="col s4">
                            <button className="btn" type="submit">OK</button>
                            &nbsp;
                            <button className="btn" type="button" onClick={this.handleEditCancel.bind(this)}>CANCEL</button>
                        </div>
                    </form>
                </div>;
        }

        return (
            <div>
                { content }
            </div>
        );
    }
}

EditableText.propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func,
};

EditableText.defaultProps = {
    text: '',
    onChange: (value) => {},
};