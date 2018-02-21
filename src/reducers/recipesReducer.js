import shortid from 'shortid';

export default function (state = {
    recipes: [],
}, action) {

    switch (action.type)
    {
        case 'LOAD_LOCAL_DATA':
        {
            let recipes = state.recipes;
            //Load recipes from localStorage
            if(typeof localStorage.recipes !== 'undefined' && localStorage.recipes.length > 0)
            {
                try
                {
                    recipes = JSON.parse(localStorage.recipes);
                }catch (e) {}
            }

            return {
                ...state,
                recipes: recipes,
            };
        }
        case 'DELETE_RECIPE':
        {
            const recipes = state.recipes.filter((item) => {
                return item.id !== action.payload;
            });

            saveRecipes(recipes);

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

            saveRecipes(recipes);

            return {
                ...state,
                recipes: recipes,
            };
        }
        case 'EDIT_NAME_RECIPE':

            const recipes = state.recipes.map((item) => {
                return item.id === action.id ? {...item, name: action.name} : item;
            });

            saveRecipes(recipes);

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
                            id: shortid.generate(),
                            name: action.name,
                            price: 0,
                            quantity: 1,
                        }
                    ],
                }:item;
            });

            saveRecipes(recipes);

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

            saveRecipes(recipes);

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

            saveRecipes(recipes);

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
        default:
            return state;
    }
}

function saveRecipes(recipes) {
    localStorage.recipes = JSON.stringify(recipes);
}