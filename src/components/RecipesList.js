import React, { Component } from 'react'
import Recipe from "./Recipe";
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next'

export default class RecipesList extends Component
{
    render() {

        let recipes = <div className='center-align'>
            <I18n>
                {
                    (t) => (
                        <i>{t('No recipes')}</i>
                    )
                }
            </I18n>
        </div>;
        if(this.props.recipes.length > 0)
        {
            recipes = this.props.recipes.map((item) => {
                return <Recipe item={item} key={item.id} deleteRecipe={this.props.deleteRecipe}/>
            });
        }


        return (
            <I18n ns="translations">
                {
                    (t) => (
                        <div>
                            <div className='row'>
                                <button onClick={this.props.createRecipe} className="btn center-align col s12">
                                    {t('Create new Recipe')}
                                </button>
                            </div>

                            <div>
                                {recipes}
                            </div>

                            <div className="fixed-action-btn">
                                <button
                                    onClick={this.props.createRecipe}
                                    className="btn-floating btn-large waves-effect waves-light red"
                                >
                                    <i className="material-icons">{'add'}</i>
                                </button>
                            </div>
                        </div>
                    )
                }
            </I18n>

        );
    }
}

RecipesList.propTypes = {
    recipes: PropTypes.array,
    deleteRecipe: PropTypes.func,
    createRecipe: PropTypes.func,
};