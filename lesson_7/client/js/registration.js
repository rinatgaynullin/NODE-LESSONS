import {postJson} from './rest.service';


export default class Registration {
    constructor() {
        this.showErr = false
        
    }
    _init() {
        
    }
    getInputsValue () {
        this.email = document.querySelector('.inputEmail').value
        this.fullName = document.querySelector('.inputFullName').value
        this.password = document.querySelector('.inputPassword').value
        this.repassword = document.querySelector('.inputRepassword').value
        
    }
    
}


