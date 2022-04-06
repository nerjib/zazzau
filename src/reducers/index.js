
import { CHANGE_SITE } from "../constants/action-types"

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
  /*    if (action.type === ADD_ARTICLE) {
        return Object.assign({}, state, {
          articles: state.articles.concat(action.payload)
        });
      }
      */
    
  };
  
  export default rootReducer;