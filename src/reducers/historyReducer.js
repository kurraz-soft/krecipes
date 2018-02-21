export default function (state=null, action) {
    switch (action.type)
    {
        case 'LOAD_LOCAL_DATA':
        {
            return action.history;
        }
        default:
            return state;
    }
}