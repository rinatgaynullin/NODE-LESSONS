import {getJson, postJson} from './rest.service'
import Registration from './registration'


const registr = new Registration

registr.getInputsValue()
console.log(registr.fullName)