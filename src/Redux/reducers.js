
import { CHANGE_SITE } from "./constants"

const initialState = {
    site:'KAKURI'
  };
  
  function rootReducer(state = initialState, action) {
    
   switch(action.type) {
        case CHANGE_SITE:
          //  alert('fff')
            return { site:action.site}
           default:
               return state;
   }
    
  };
  
  export default rootReducer;