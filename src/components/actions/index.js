
import {  CHANGE_SITE} from "../../constants/action-types";


  export function changeSite(payload) {
    return { type: CHANGE_SITE, site:payload }
  };