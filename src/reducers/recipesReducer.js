import shortid from 'shortid';

const InitialProduct = {
    id: '',
    name: '',
    price: 0,
    quantity: 1,
    is_active: true,
};

export default function (state = {
    recipes: [],
}, action) {

    switch (action.type)
    {
        case 'DELETE_RECIPE':
        {
            const recipes = state.recipes.filter((item) => {
                return item.id !== action.payload;
            });

            return {
                ...state,
                recipes: recipes,
            };
        }
        case 'CREATE_RECIPE':
        {
            const recipes = [
                ...state.recipes,
                {
                    name: action.name,
                    id: action.id,
                    products: [],
                }
            ];

            return {
                ...state,
                recipes: recipes,
            };
        }
        case 'EDIT_NAME_RECIPE':

            const recipes = state.recipes.map((item) => {
                return item.id === action.id ? {...item, name: action.name} : item;
            });

            return {
                ...state,
                recipes: recipes,
            };
        case 'CREATE_PRODUCT':
        {
            const recipes = state.recipes.map((item) => {
                return item.id === action.recipe_id?{
                    ...item,
                    products: [
                        ...item.products,
                        {
                            ...InitialProduct,
                            id: shortid.generate(),
                            name: action.name,
                        }
                    ],
                }:item;
            });

            return {
                ...state,
                recipes: recipes,
            }
        }
        case 'DELETE_PRODUCT':
        {
            const recipes = state.recipes.map((item) => {
                if(item.id === action.recipe_id)
                {
                    const products = item.products.filter((item_product) => {
                        return item_product.id !== action.id;
                    });

                    return {
                        ...item,
                        products: products,
                    }
                }else
                    return item;
            });

            return {
                ...state,
                recipes: recipes,
                //timestamp: + new Date(),
            };
        }
        case 'SAVE_RECIPE_PRODUCTS':
        {
            const recipes = state.recipes.map((recipe) => {
                if(recipe.id === action.id)
                {
                    return {
                        ...recipe,
                        products: action.products,
                    };
                }else
                    return recipe;
            });

            return {
                ...state,
                recipes: recipes,
            };
        }
        case 'SET_DEFAULT_PRODUCT_PRICE':
        {
            /**
             * action = {name, recipe_id, price}
             */
            const recipes = state.recipes.map(recipe => {
                if(recipe.id === action.recipe_id)
                {
                    const products = recipe.products.map(product => {
                        if(product.name === action.name)
                        {
                            return {
                                ...product,
                                price: action.price,
                            };
                        }else
                            return product;
                    });
                    return {
                        ...recipe,
                        products: products,
                    };
                }else
                    return recipe;
            });
            return {
                ...state,
               recipes: recipes,
            };
        }
        case 'SET_RECIPE_PRODUCT_ACTIVITY':
        {
            const recipes = state.recipes.map(recipe => {
                if(recipe.id === action.recipe_id)
                {
                    const products = recipe.products.map(product => {
                        if(product.id === action.product_id)
                        {
                            return {
                                ...product,
                                is_active: action.is_active,
                            };
                        }else
                            return product;
                    });
                    return {
                        ...recipe,
                        products: products,
                    };
                }else
                    return recipe;
            });

            return {
                ...state,
                recipes: recipes,
            };
        }
        default:
            return state;
    }
}