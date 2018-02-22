export default function (state = {
    products: [],
}, action) {
    switch (action.type)
    {
        case 'CREATE_PRODUCT':
        {
            let products = state.products.filter(item => {
                return item.name !== action.name;
            });

            products = [
                ...products,
                {
                    name: action.name,
                    price: 0,
                }
            ];

            return {
                ...state,
                products: products,
            };
        }
        case 'SAVE_RECIPE_PRODUCTS':
        {
            let products = state.products.map((state_product) => {
                const act_product = action.products.find((action_product) => {
                    return state_product.name === action_product.name
                });

                if(act_product)
                {
                    return {
                        ...act_product,
                        price: act_product.price,
                    };
                }else
                    return state_product;
            });

            const new_products = action.products.filter((action_product) => {
                return state.products.findIndex(state_product => {
                    return state_product.name === action_product.name;
                }) === -1;
            });

            new_products.forEach((product) => {
                products = [
                    ...products,
                    {
                        name: product.name,
                        price: product.price,
                    }
                ];
            });

            return {
                ...state,
                products: products,
            };
        }
        default:
            return state;
    }
}