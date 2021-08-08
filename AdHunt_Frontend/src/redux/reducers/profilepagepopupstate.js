const editUserPopUp = (state = "CLOSED", action) => {
    switch(action.type){
        case "OPEN":
            return true
        case "CLOSED":
            return false
        default: 
            return false
    }
}
export default editUserPopUp