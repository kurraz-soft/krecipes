export function deleteRecipe(id) {
    return {
        type: 'DELETE_RECIPE',
        payload: id,
    }
}

export function editNameRecipe(id, name) {
    return {
        type: 'EDIT_NAME_RECIPE',
        id: id,
        name: name,
    }
}

export function createRecipe(id, name) {
    return {
        type: 'CREATE_RECIPE',
        name: name,
        id: id,
    }
}

export function loadLocalData() {
    return {
        type: 'LOAD_LOCAL_DATA',
    }
}