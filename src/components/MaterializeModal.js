import React from 'react'
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'

const modalRoot = document.getElementById('modal-root');

export default class MaterializeModal extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            is_open: false,
        };

        this.el = document.createElement('div');
    }

    componentDidMount()
    {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount()
    {
        modalRoot.removeChild(this.el);
    }

    open()
    {
        this.setState({is_open: true});
    }

    close()
    {
        this.setState({is_open: false});
    }

    toggle()
    {
        this.setState({is_open: !this.state.is_open});
    }

    handleOverlayClick()
    {
        this.close();
        this.props.onOverlayClick();
    }

    render()
    {
        const overlay =
            <div
                className={'modal-overlay ' + (this.state.is_open?'modal-overlay-opened':'')}
                onClick={this.handleOverlayClick.bind(this)}
            />;

        const content =
            <div>

                {overlay}

                <div className={'modal ' + (this.state.is_open?'modal-opened':'')}>
                    {this.props.children}
                </div>
            </div>;

        return ReactDOM.createPortal(content, this.el);
    }
}

MaterializeModal.propTypes = {
    onOverlayClick: PropTypes.func,
};

MaterializeModal.defaultProps = {
    onOverlayClick: () => {}
};