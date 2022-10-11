import React, { useState, useRef, useCallback, memo, FormEvent } from 'react';
import Input from '../../../components/Elements/Input';
import { FormProps, SchemaForm } from '@/models/general';

const initErrors = {
  userName: '',
  email: '',
  password: '',
  confirmPw: '',
};

const FormUnControlled: React.FC<FormProps> = ({ schemaForm, initValueForm }) => {
  const [errors, setErrors] = useState<SchemaForm<string>>(initErrors);
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPwRef = useRef<HTMLInputElement | null>(null);

  const keyOfFormFields = Object.keys(initValueForm);
  const { userName, email, password, confirmPw } = schemaForm;

  const validateFormMessage = useCallback(
    (formValues: SchemaForm<string>): SchemaForm<string> => {
      const newMessages = keyOfFormFields.reduce((accumulator, currentKey) => {
        const { regex, requiredMessage, errorMessage, validator, name } = schemaForm[currentKey];

        const currentValue = formValues[currentKey];
        const { password: passwordValue } = formValues;

        const currentParams =
          name === 'confirmPw'
            ? [passwordValue, currentValue, requiredMessage, errorMessage, regex]
            : [currentValue, requiredMessage, errorMessage, regex];

        const messages: string = validator(...currentParams);

        return {
          ...accumulator,
          [currentKey]: messages,
        };
      }, {});
      return newMessages as SchemaForm<string>;
    },
    [schemaForm, keyOfFormFields]
  );

  const checkValidate = useCallback(
    (formValues: SchemaForm<string>) => {

      const areValidFields = keyOfFormFields.every((field) => formValues[field].trim());
      console.log('areValidFields: ', areValidFields);

      const haveErrors = keyOfFormFields.some((field) => errors && errors[field]);
      console.log('haveErrors: ', haveErrors);

      return !haveErrors && areValidFields;
    },
    [errors, keyOfFormFields]
  );

  const onHandleSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const formValues = {
        userName: userNameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        confirmPw: confirmPwRef.current?.value,
      };
      console.log('formValues: ', formValues);
      if (checkValidate(formValues as SchemaForm<string>)) {
        console.log('Call API...', formValues);
        return;
      };
      const messagesErrors = validateFormMessage(formValues as SchemaForm<string>);
      setErrors(messagesErrors);
    },
    [checkValidate, validateFormMessage]
  );

  return (
    <div style={{ height: '100%' }}>
      Form Uncontrolled:
      <form
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={onHandleSubmitForm}
      >
        <div style={{ padding: '15px 0' }}>
          <Input field={userName} errors={errors as SchemaForm<string>} ref={userNameRef} />
        </div>
        <div style={{ padding: '15px 0' }}>
          <Input field={email} errors={errors as SchemaForm<string>} ref={emailRef} />
        </div>
        <div style={{ padding: '15px 0' }}>
          <Input field={password} errors={errors as SchemaForm<string>} ref={passwordRef} />
        </div>
        <div style={{ padding: '15px 0' }}>
          <Input field={confirmPw} errors={errors as SchemaForm<string>} ref={confirmPwRef} />
        </div>
        <button style={{ alignSelf: 'center', marginTop: '25px' }}>Submit</button>
      </form>
    </div>
  );
};

export default memo(FormUnControlled);
