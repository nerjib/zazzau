
import {  CHANGE_SITE} from "./constants";
import {  CHANGE_ROLE,CHANGE_PROPERTIES } from "./constants";

export function changeSite(payload) {
  return { type: CHANGE_SITE, site:payload }
};

export function changeRole(payload) {
    return { type: CHANGE_ROLE, role:payload }
  };

  export function changeProperties(payload) {
    return { type: CHANGE_PROPERTIES, properties:payload }
  };