class Validation {

    constructor() {
        this.errors = [];
    }
    
    errors: Array<Object> = [];

    isTrue(value: any, message: String) {
        if(value) {
            this.errors.push({ message: message });
        }
    }
    isRequired(value: any, message: String) {
        if(!value || value.length <= 0) {
            this.errors.push({ message: message });            
        }
    }
    isEmail(value: any, message: String) {
        let reg = new RegExp(/^\w+([-+,']\w+)*@\w+([-,]\w+)*\.\w+([-.]\w+)*$/);
        if(!reg.test(value)) {
            this.errors.push({ message: message });
        }
    }
    isPasswordValid(value: any, message: String) {
        if(value.length < 6) {
            this.errors.push({ message: message });
        }
    }
}

export { Validation }