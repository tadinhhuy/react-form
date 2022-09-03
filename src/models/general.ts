export interface SchemaField {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  validator: Function;
  requiredMessage: string;
  errorMessage: string;
  regex: RegExp | string;
}

export interface FormProps {
  schemaForm: {
    userName: SchemaField;
    email: SchemaField;
    password: SchemaField;
    confirmPw: SchemaField;
    [key: string]: SchemaField;
  };
  initValueForm: {
    [key: string]: any;
  };
}
