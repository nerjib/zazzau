
import {  CHANGE_SITE} from "./constants";


export function changeSite(payload) {
  return { type: CHANGE_SITE, site:payload }
};