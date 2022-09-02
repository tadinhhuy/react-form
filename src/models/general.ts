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
