import { SchemaField } from '@/models/general';

export interface Props {
  schemaForm: {
    [key: string]: SchemaField;
  };
  initValueForm: {
    [key: string]: any;
  };
}
