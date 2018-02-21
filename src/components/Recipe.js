import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const rowStyle = {
    lineHeight: "40px",
};

export default class Recipe extends Component
{
    deleteRecord(e) {
        e.preventDefault();

        this.props.deleteRecipe(this.props.item.id);
    }

    render() {
        return (
            <div className="row" style={rowStyle}>
                <Link to={ '/viewRecipe/' + this.props.item.id }>
                    <div className="col s11 card-panel">
                        {this.props.item.name}
                    </div>
                </Link>
                <div className="col s1">
                    <a href="#" title="Delete" onClick={this.deleteRecord.bind(this)}><i className="material-icons">delete</i></a>
                </div>
            </div>
        );
    }
}

Recipe.propTypes = {
    item: PropTypes.object,
    deleteRecipe: PropTypes.func,
};