import React, { Component } from 'react'
import { connect } from 'react-redux'
import {editNameRecipe, saveRecipeProducts, setDefaultProductPrice} from "../actions/recipeActions";
import {createProduct, deleteProduct} from "../actions/productActions";
import ProductsEditList from "../components/ProductsEditList";
import {Link} from 'react-router-dom'
import EditableTextModal from "../components/EditableTextModal";
import AddProductButton from '../components/AddProductButton';
import AutocompleteVariants from '../components/AutocompleteVariants';
import i18next from './../i18n'

@connect((store) => {
    return {
        recipes: store.recipes.recipes,
        products: store.products.products,
    }
})
export default class EditRecipePage extends Component
{
    constructor(props)
    {
        super(props);

        this.recipe_index = props.recipes.findIndex((item) => {
            return item.id === props.match.params.id;
        });
        this.current_recipe = props.recipes[this.recipe_index];

        this.state = {
            is_add_item_mode: false,
            new_item_name: '',
        };
    }

    handleChangeName(value)
    {
        this.props.dispatch(editNameRecipe(this.current_recipe.id, value));
    }

    handleProductDelete(id)
    {
        this.props.dispatch(deleteProduct(id,this.current_recipe.id));
    }

    handleSave()
    {
        this.props.dispatch(saveRecipeProducts(this.current_recipe.id,this.productList.state.products));
    }

    handleSwitchAddItemMode()
    {
        //TODO move to store?
        //this.props.dispatch(toggleAddItemMode());

        this.setState({is_add_item_mode: !this.state.is_add_item_mode, new_item_name: ''});
    }

    handleAddItemClear(e)
    {
        e.preventDefault();
        this.setState({new_item_name: ''});
    }

    handleAddItemInputChange(e)
    {
        this.setState({new_item_name: e.target.value});
    }

    handleAddItemVariantSelect(value)
    {
        this.setState({new_item_name: value});
    }

    handleAddItemSubmit(e)
    {
        e.preventDefault();

        this.props.dispatch(createProduct(this.current_recipe.id, this.state.new_item_name));
        const product_from_lib = this.props.products.find((item) => {
            return item.name === this.state.new_item_name;
        });
        if(product_from_lib)
        {
            this.props.dispatch(setDefaultProductPrice(this.state.new_item_name,this.current_recipe.id,product_from_lib.price));
        }

        //TODO fix mess with repeated code & functions
        //this.handleAddItemClear(e);
        this.addProductButton.handleClear(e); //TODO How to get rid of refs??
    }

    handleAddItemDone(e)
    {
        e.preventDefault();
        if(this.state.new_item_name.length > 0)
        {
            this.handleAddItemSubmit(e);
        }
        this.handleSwitchAddItemMode();
    }

    componentDidMount()
    {
        this.headerWrapper.style.height = this.headerWrapper.clientHeight + 'px';
    }

    render() {

        const current_recipe = this.props.recipes[this.recipe_index];

        let list = null;
        if(this.state.new_item_name.length > 0)
        {
            list =
                <div className='flow-text' style={{margin: '15px'}}>
                    <AutocompleteVariants
                        variants={this.props.products.map(item => {
                            return item.name;
                        })}
                        onSelectResult={this.handleAddItemVariantSelect.bind(this)}
                        search={this.state.new_item_name}
                    />
                </div>
        }else
            list = <ProductsEditList
                    recipeId={current_recipe.id}
                    products={current_recipe.products}
                    onDelete={this.handleProductDelete.bind(this)}
                    ref={(productsList) => this.productList = productsList}
                />;

        return (
            <div>
                <div className='card-panel-header-block'>
                    <div className={'card-panel-header-wrapper' + (this.state.is_add_item_mode?' card-panel-header-wrapper-collapsed':'')} ref={wrapper => this.headerWrapper = wrapper}>
                        <div className={'row card-panel deep-orange darken-1 white-text card-panel-header'} style={{marginBottom: 0}}>
                            <div className='col s2'>
                                <Link title='Cancel' className='white-text btn-back' to={'/'}><i className='material-icons medium'>navigate_before</i></Link>
                            </div>
                            <div className='col s8 center-align card-panel-header-title'>
                                <strong>
                                    <EditableTextModal label={i18next.t('Recipe title')} text={ current_recipe.name } onChange={ this.handleChangeName.bind(this) }/>
                                </strong>
                            </div>
                            <div className='col s2 right-align'>
                                <Link title='Save' className='white-text btn-control' to={'/viewRecipe/' + this.current_recipe.id} onClick={this.handleSave.bind(this)}>
                                    <i className='material-icons small'>save</i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='row' style={{marginTop: '1px'}}>
                        <AddProductButton
                            inputModeEnabled={this.state.is_add_item_mode}
                            onChange={this.handleAddItemInputChange.bind(this)}
                            onSwitchMode={this.handleSwitchAddItemMode.bind(this)}
                            onSubmit={this.handleAddItemSubmit.bind(this)}
                            onClear={this.handleAddItemClear.bind(this)}
                            onDone={this.handleAddItemDone.bind(this)}
                            value={this.state.new_item_name}
                            ref={(obj) => this.addProductButton = obj}
                        />
                    </div>
                </div>

                <div className='content-wrapper'>
                {list}
                </div>

                <div className={"fixed-action-btn " + (this.state.is_add_item_mode?'left':'')}>
                    <button
                        onClick={this.handleSwitchAddItemMode.bind(this)}
                        className="btn-floating btn-large waves-effect waves-light red"
                    >
                        <i className="material-icons">{this.state.is_add_item_mode?'close':'add'}</i>
                    </button>
                </div>

                {this.state.is_add_item_mode &&
                    <div className="fixed-action-btn">
                        <button
                            onClick={this.handleAddItemSubmit.bind(this)}
                            className="btn-floating btn-large waves-effect waves-light red"
                        >
                            <i className="material-icons">check</i>
                        </button>
                    </div>
                }

            </div>
        );
    }
}