import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import i18next from './../i18n'

const rowStyle = {
    lineHeight: "40px",
};

export default class Recipe extends Component
{
    deleteRecord(e) {
        e.preventDefault();

        if(confirm(i18next.t('Delete the recipe?')))
            this.props.deleteRecipe(this.props.item.id);
    }

    render() {
        return (
            <div className="row recipe-row" style={rowStyle}>
                <Link to={ '/viewRecipe/' + this.props.item.id } className='black-text'>
                    <div className="col s10 clickable-list-cell">
                        <div className='col s1' style={{ paddingLeft: '0', position: 'relative'}}>
                            <i className='material-icons' style={{top: '8px', position: 'absolute'}}>book</i>
                        </div>
                        <div className='col s11'>{this.props.item.name}</div>
                    </div>
                </Link>
                {/*<div className="col s1 center-align clickable-list-cell">
                    <Link to={'/editRecipe/' + this.props.item.id} title="Edit" className='red-text'>
                        <i className="material-icons">edit</i>
                    </Link>
                </div>*/}
                <div className="col s2 center-align clickable-list-cell grey lighten-4" style={{position: 'relative'}}>
                    &nbsp;
                    <a href="#" title="Delete" onClick={this.deleteRecord.bind(this)} className='light-blue-text'
                       style={{position: 'absolute', top: 'calc(50% - 15px)', left: 'calc(50% - 15px)'}}>
                        <i className="material-icons small">delete</i>
                    </a>
                </div>
            </div>
        );
    }
}

Recipe.propTypes = {
    item: PropTypes.object,
    deleteRecipe: PropTypes.func,
};