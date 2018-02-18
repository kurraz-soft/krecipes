import React, { Component } from 'react'
import { connect } from 'react-redux'

@connect((store) => {
    return {
        recipes: store.recipes.recipes,
    }
})
export default class ViewRecipePage extends Component
{
    constructor()
    {
        super();
    }

    componentWillMount()
    {
        this.current_recipe = this.props.recipes.find((item) => {
            return item.id === this.props.match.params.id;
        });
    }

    render() {
        return (
            <div>
                <h3>{ this.current_recipe.name }</h3>
            </div>
        );
    }
}