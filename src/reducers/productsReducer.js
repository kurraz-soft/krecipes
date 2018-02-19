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
        default:
            return state;
    }
}