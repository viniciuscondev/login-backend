class Validation {
  constructor() {
    this.errors = [];
  }

    errors: Array<Object> = [];

    isTrue(value: any, error: String) {
      if (value) {
        this.errors.push({ error });
      }
    }

    isRequired(value: any, error: String) {
      if (!value || value.length <= 0) {
        this.errors.push({ error });
      }
    }

    isEmail(value: any, error: String) {
      const reg = new RegExp(/^\w+([-+,']\w+)*@\w+([-,]\w+)*\.\w+([-.]\w+)*$/);
      if (!reg.test(value)) {
        this.errors.push({ error });
      }
    }

    isPasswordValid(value: any, error: String) {
      if (value.length < 6) {
        this.errors.push({ error });
      }
    }
}

export default Validation;
