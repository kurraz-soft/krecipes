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
        default:
            return state;
    }
}

function saveRecipes(recipes) {
    localStorage.recipes = JSON.stringify(recipes);
}