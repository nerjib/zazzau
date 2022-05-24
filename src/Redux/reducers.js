
import { CHANGE_SITE, CHANGE_ROLE, CHANGE_PROPERTIES } from "./constants"

let Properties = [
    {
        id: 1,
        site: "Kakuri",
        plot: "1",
        amount: "20000",
        status: "Available", 
        url: "https://nairametrics.com/wp-content/uploads/2019/09/nigeria-real-estate.jpg"
    },
    {
        id: 2,
        site: "Kakuri",
        plot: "2",
        amount: "20000",
        status: "Not Available",
        url: "https://i0.wp.com/businessday.ng/wp-content/uploads/2021/05/Real-estate.jpg"
    },  
    {
        id: 3,
        site: "Kakuri",
        plot: "3",
        amount: "20000",
        status: "Available",
        url: "https://mercy-homes.com/wp-content/uploads/2014/12/amen-mansions2.jpg"
    },

]

const initialState = {
    site:'KAKURI',
    properties: Properties,
    role:'guest'
  };
  
  function rootReducer(state = initialState, action) {
    
   switch(action.type) {
        case CHANGE_SITE:
          //  alert('fff')
            return { site:action.site, role:state.role, properties: state.Properties };
        case CHANGE_ROLE:
            return { site:state.site, role:action.role, properties: state.Properties };
        case CHANGE_PROPERTIES:
            return { site:state.site, role:state.role, properties: action.Properties };
           default:
               return state;
   }
    
  };
  
  export default rootReducer;