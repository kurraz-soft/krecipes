export default function (state = {
    products: [],
}, action) {
    switch (action.type)
    {
        case 'LOAD_LOCAL_DATA':
        {
            let products = state.products;
            //Load products from localStorage
            if(typeof localStorage.products !== 'undefined' && localStorage.products.length > 0)
            {
                try
                {
                    products = JSON.parse(localStorage.products);
                }catch (e) {}
            }

            return {
                ...state,
                products: products,
            };
        }
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

            saveProducts(products);

            return {
                ...state,
                products: products,
            };
        }
        default:
            return state;
    }
}

function saveProducts(products) {
    localStorage.products = JSON.stringify(products);
}