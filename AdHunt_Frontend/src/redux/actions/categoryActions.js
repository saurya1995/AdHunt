import CategoryService from "../../services/CategoryService";

export const getCategories = () => {
    function onSuccess(categories) {
        return { type: "GET_CATEGORY_SUCCESS", category: categories };
    }
    function onFailure(error) {
        console.log("failed to load a profile", error);
    }

    return async (dispatch, getState) => {
        try {
            let categories = await CategoryService.getSubCategories();
            dispatch(onSuccess(categories));
        } catch (e) {
            onFailure(e);
        }
    };
};
