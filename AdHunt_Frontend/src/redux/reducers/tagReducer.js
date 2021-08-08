const INITIAL_STATE ={
    backgroundColor: "white",
    color: "black",
    hide: "block",
    show: "none",
    partnerTags: [],
    processTags: []
};

export const tagReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case "SET_COLOR_MODE":
            if(state.backgroundColor === "white" && state.color === "black"){
                return {...state, backgroundColor: "#181818", color: "white", dark:true};
            }else{
                return {...state, backgroundColor: "white", color: "black", dark:false};
            }
        case "ADD_PARTNER_TAG":
            return {...state, partnerTags: [...state.partnerTags, action.payload]};
        case "REMOVE_PARTNER_TAG":
            return {...state, partnerTags: state.partnerTags.filter((item, id)=> id !== action.payload)};
        case "DELETE_ALL_PARTNER_TAG":
            return {...state, partnerTags: [] };
        case "ADD_PROCESS_TAG":
            return {...state, processTags: [...state.processTags, action.payload]};
        case "REMOVE_PROCESS_TAG":
            return {...state, processTags: state.processTags.filter((item, id)=> id !== action.payload)};
        case "DELETE_ALL_PROCESS_TAG":
            return {...state, processTags: [] };
        default:
            return state;
    }
}