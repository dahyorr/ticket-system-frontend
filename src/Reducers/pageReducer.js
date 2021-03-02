const {ASSIGN_PAGE} = require("../Actions/types");

const pageReducer = (state='', action) => {
    switch (action.type) {
        case ASSIGN_PAGE:
            return action.payload
        default:
            return state
    }
}
export default pageReducer