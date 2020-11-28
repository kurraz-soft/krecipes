import React, { Component } from 'react'
import RecipesList from "../components/RecipesList";
import { connect } from 'react-redux';
import {deleteRecipe, createRecipe, searchRecipe} from "../actions/recipeActions";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import shortid from 'shortid';
import SyncButton from "../components/SyncButton";
import { I18n } from 'react-i18next'
import i18next from './../i18n';

@connect((store) => {
    return {
        recipes: store.recipes.recipes,
        search: store.recipes.search,
    };
})
export default class RecipesListPage extends Component
{
    constructor()
    {
        super();

        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    createRecipe()
    {
        const id = shortid.generate();
        this.props.dispatch(createRecipe(id, i18next.t('New Recipe')));
        this.props.history.push('/editRecipe/' + id);
    }

    deleteRecipe(id) {
        this.props.dispatch(deleteRecipe(id));
    }

    handleSearch(search)
    {
        this.props.dispatch(searchRecipe(search));
    }

    filterRecipes(recipes)
    {
        let filtered = [];
        filtered = recipes.filter((item) => {
            return item.name.toLowerCase().includes(this.props.search.toLowerCase());
        });

        filtered.sort((x, y) => {
            if(x.name > y.name) return 1;
            if(x.name < y.name) return -1;

            return 0;
        })

        return filtered;
    }

    render() {
        return (
            <div>
                <div className='card-panel-header-block'>
                    <div className='row card-panel deep-orange darken-1 white-text card-panel-header'>
                        <div className='col s3'>
                            <SyncButton/>
                        </div>
                        <div className='col s6 center-align flow-text'>
                            <I18n ns="translations">
                                {
                                    (t) => (
                                        <strong>{t('Recipes')}</strong>
                                    )
                                }
                            </I18n>
                        </div>
                        <div className='col s3 right-align'>
                            <Link className='white-text btn-control' to={'/settings'}><i className='material-icons small'>settings</i></Link>
                        </div>
                    </div>
                </div>

                <div className='content-wrapper'>
                    <RecipesList
                        recipes={this.filterRecipes(this.props.recipes)}
                        deleteRecipe={this.deleteRecipe}
                        createRecipe={this.createRecipe.bind(this)}
                        search={this.props.search}
                        handleSearch={this.handleSearch}
                    />
                </div>
            </div>
        );
    }
}

RecipesList.propTypes = {
    createRecipe: PropTypes.func,
};