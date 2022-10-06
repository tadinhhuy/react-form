import React, {
  useState,
  useCallback,
  useMemo,
  memo,
  ChangeEvent,
  FocusEvent,
  FormEvent,
} from 'react';
import { FormKey, FormProps, SchemaForm } from '@/models/general';
import Input from '../../../components/Elements/Input';

const initErrors = {
  userName: '',
  email: '',
  password: '',
  confirmPw: '',
};

const FormControlled: React.FC<FormProps> = ({ schemaForm, initValueForm }) => {
  const [form, setForm] = useState<SchemaForm<string>>(initValueForm);
  const [errors, setErrors] = useState<SchemaForm<string>>(initErrors);
  const { userName, email, password, confirmPw } = schemaForm;

  const isDisabled = useMemo(() => {
    const keys = Object.keys(form);
    const areValidFields = keys.every((field) => form[field].trim().length > 0 && !errors?.[field]);
    return !areValidFields;
  }, [form, errors]);

  const validateForm = useCallback(
    (fieldName: string, newValues: SchemaForm<string>): { [fieldName: FormKey]: string } => {
      const currentSchema = schemaForm[fieldName];
      const { regex, requiredMessage, errorMessage, validator, name } = currentSchema;

      const { password: passwordValue } = newValues;
      const currentValue = newValues[fieldName];

      const currentParams =
        name === 'confirmPw'
          ? [passwordValue, currentValue, requiredMessage, errorMessage, regex]
          : [currentValue, requiredMessage, errorMessage, regex];

      const messageField = validator(...currentParams);

      return { [fieldName]: messageField };
    },
    [schemaForm]
  );

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        value,
        name,
      }: {
        value: string;
        name: string;
      } = e.target;
      setForm((prevForm: SchemaForm<string>) => {
        const newValues = { ...prevForm, [name]: value };
        const messagesForm: { [fieldName: FormKey]: string } = validateForm(name, newValues);
        setErrors({ ...errors, ...messagesForm } as SchemaForm<string>);
        return newValues;
      });
    },
    [errors, validateForm]
  );

  const handleOnBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setForm((prevState: SchemaForm<string>) => {
        const newValues = { ...prevState, [name]: value };
        const messagesForm: { [key: FormKey]: string | undefined } = validateForm(name, newValues);
        setErrors({ ...errors, ...messagesForm } as SchemaForm<string>);
        return newValues;
      });
    },
    [errors, validateForm]
  );

  const onHandleSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (isDisabled) {
        return;
      }
      console.log('submitted', form);
      setForm(initValueForm);
      setErrors(initErrors);
    },
    [form, initValueForm, isDisabled]
  );

  return (
    <div>
      Form Controlled:
      <form onSubmit={onHandleSubmitForm}>
        <div style={{ padding: '15px 0' }}>
          <Input
            field={userName}
            form={form}
            handleOnChange={handleOnChange}
            handleOnBlur={handleOnBlur}
            errors={errors as SchemaForm<string>}
          />
        </div>
        <div style={{ padding: '15px 0' }}>
          <Input
            field={email}
            form={form}
            handleOnChange={handleOnChange}
            handleOnBlur={handleOnBlur}
            errors={errors as SchemaForm<string>}
          />
        </div>
        <div style={{ padding: '15px 0' }}>
          <Input
            field={password}
            form={form}
            handleOnChange={handleOnChange}
            handleOnBlur={handleOnBlur}
            errors={errors as SchemaForm<string>}
          />
        </div>
        <div style={{ padding: '15px 0' }}>
          <Input
            field={confirmPw}
            form={form}
            handleOnChange={handleOnChange}
            handleOnBlur={handleOnBlur}
            errors={errors as SchemaForm<string>}
          />
        </div>
        <button disabled={isDisabled} style={{ alignSelf: 'center', marginTop: '25px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default memo(FormControlled);
