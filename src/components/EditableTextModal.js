import React from 'react'
import PropTypes from 'prop-types'
import MaterializeModal from "./MaterializeModal";

export default class EditableTextModal extends React.Component
{
    constructor(props)
    {
        super(props);

        this.closeModal.bind(this);
        this.openModal.bind(this);
    }

    closeModal()
    {
        this.modal.close();
    }

    openModal()
    {
        this.modal.open();
        setTimeout(() => {
            this.input.focus();
            this.moveCaretAtEnd(this.input);
        },600);
    }

    handleEditSubmit(e)
    {
        e.preventDefault();
        this.closeModal();
        this.props.onChange(this.input.value);
    }

    handleEditCancel()
    {
        this.input.value = this.props.text;
        this.closeModal();
    }

    moveCaretAtEnd(target)
    {
        const t = target.value;
        target.value = '';
        target.value = t;
    }

    render() {
        return (
            <div>
                <MaterializeModal ref={modal => this.modal = modal} onOverlayClick={this.handleEditCancel.bind(this)}>
                    <form onSubmit={this.handleEditSubmit.bind(this)}>
                        <div className="modal-content">
                            <input type='text' defaultValue={this.props.text} ref={(input) => this.input = input} />
                        </div>
                        <div className="modal-footer">
                            <button type='button' onClick={this.handleEditCancel.bind(this)} className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</button>
                            <button type='submit' className="modal-action modal-close waves-effect waves-green btn-flat">Save</button>
                        </div>
                    </form>
                </MaterializeModal>
                <div>
                    { this.props.text }
                    &nbsp;
                    <a href="#" onClick={ (e) => {e.preventDefault(); this.openModal();} }>
                        <i className="material-icons">edit</i>
                    </a>
                </div>
            </div>
        );
    }
}

EditableTextModal.propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func,
};

EditableTextModal.defaultProps = {
    text: '',
    onChange: (value) => {},
};