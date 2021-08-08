export const AddPartnerTag = (_tag) => {
    return{
        type: "ADD_PARTNER_TAG",
        payload: _tag
    }
}
export const RemovePartnerTag = (_id) => {
    return{
        type: "REMOVE_PARTNER_TAG",
        payload: _id
    }
}
export const DeleteAllPartnerTag = () => {
    return{
        type: "DELETE_ALL_PARTNER_TAG"
    }
}
export const AddProcessTag = (_tag) => {
    return{
        type: "ADD_PROCESS_TAG",
        payload: _tag
    }
}
export const RemoveProcessTag = (_id) => {
    return{
        type: "REMOVE_PROCESS_TAG",
        payload: _id
    }
}
export const DeleteAllProcessTag = () => {
    return{
        type: "DELETE_ALL_PROCESS_TAG"
    }
}