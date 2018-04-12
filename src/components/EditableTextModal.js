import React from 'react'
import PropTypes from 'prop-types'
import MaterializeModal from "./MaterializeModal";
import i18next from './../i18n'

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
        this.fakeInput.focus();
        setTimeout(() => {
            this.input.focus();
            this.moveCaretAtEnd(this.input);
        },600);
    }

    handleEditSubmit(e)
    {
        e.preventDefault();
        this.closeModal();
        this.props.onChange(this.input.value = this.input.value.trim());
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
                            <div className='input-field'>
                                <input type='text' defaultValue={this.props.text} ref={(input) => this.input = input} />
                                <label>{this.props.label}</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type='button' onClick={this.handleEditCancel.bind(this)} className="modal-action modal-close waves-effect waves-green btn-flat">{i18next.t('Cancel')}</button>
                            <button type='submit' className="modal-action modal-close waves-effect waves-green btn-flat">{i18next.t('Save')}</button>
                        </div>
                    </form>
                </MaterializeModal>
                <div>
                    { this.props.text }
                    <input type='text' style={{position: 'absolute', height: 0, width: '100px', opacity: 0}} ref={(input) => this.fakeInput = input}/>
                    &nbsp;
                    <a href="#" onClick={ (e) => {e.preventDefault(); this.openModal(e);} }>
                        <i className="material-icons">edit</i>
                    </a>
                </div>
            </div>
        );
    }
}

EditableTextModal.propTypes = {
    label: PropTypes.string,
    text: PropTypes.string,
    onChange: PropTypes.func,
};

EditableTextModal.defaultProps = {
    text: '',
    onChange: (value) => {},
};