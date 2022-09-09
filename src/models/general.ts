export interface SchemaField {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  validator: Function;
  requiredMessage: string;
  errorMessage: string;
  regex: RegExp | string;
  [key: string]: any;
}

export interface SchemaForm<T = SchemaField> {
  userName: T;
  email: T;
  password: T;
  confirmPw: T;
  [key: string]: T;
}

export type FormKey = keyof SchemaForm;

export interface FormProps {
  schemaForm: SchemaForm;
  initValueForm: SchemaForm<string>;
}
