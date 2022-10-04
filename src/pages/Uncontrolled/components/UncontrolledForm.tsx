import React, { useState, useRef, useMemo, useCallback, memo, FormEvent } from "react";
import Input from '../../../components/Elements/Input';
import { FormProps, SchemaForm } from '@/models/general';

const FormUnControlled: React.FC<FormProps> = ({ schemaForm, initValueForm }) => {
  const [errors, setErrors] = useState<SchemaForm<string>>();
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPwRef = useRef<HTMLInputElement | null>(null);

  const keyOfFormFields = Object.keys(initValueForm);
  const { userName, email, password, confirmPw } = schemaForm;

  const formRef: { [key: string]: any } = useMemo(() => {
    return {
      userName: userNameRef,
      email: emailRef,
      password: passwordRef,
      confirmPw: confirmPwRef
    }
  }, []);

  const formValues = useMemo(() => {
    const values = keyOfFormFields.reduce((accumulator, key) => {
      return {
        ...accumulator,
        [key]: formRef?.[key]?.current?.value
      };
    }, {});
    return values as SchemaForm;
  }, [formRef, keyOfFormFields]);

  const validateFormMessage = useCallback((): SchemaForm<string> => {
    const newMessages = keyOfFormFields.reduce((accumulator, currentKey) => {
      const {
        regex,
        requiredMessage,
        errorMessage,
        validator,
        name
      } = schemaForm[currentKey];

      const currentValue = formValues[currentKey];
      const { password: passwordValue } = formValues;

      const currentParams =
        name === "confirmPw"
          ? [passwordValue, currentValue, requiredMessage, errorMessage, regex]
          : [currentValue, requiredMessage, errorMessage, regex];

      const messages: string = validator(...currentParams);

      return {
        ...accumulator,
        [currentKey]: messages
      };
    }, {});
    return newMessages as SchemaForm<string>;
  }, [formValues, schemaForm, keyOfFormFields]);

  const checkValidate = useCallback(() => {
    const values = formValues;
    console.log('values: ', values);

    const areInvalidFields = keyOfFormFields.every(
      (field) => !values[field]?.trim()
    );

    const areInvalidErrors = keyOfFormFields.every(
      (field) => errors && errors[field]
    );

    return areInvalidFields || areInvalidErrors;
  }, [formValues, keyOfFormFields, errors]);

  const onHandleSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (checkValidate()) {
        const messagesErrors = validateFormMessage();
        setErrors(messagesErrors);
        return;
      }
      console.log("Call API...", formValues);
    },
    [checkValidate, formValues, validateFormMessage]
  );

  return (
    <div style={{ height: "100%" }}>
      Form Uncontrolled:
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
        onSubmit={onHandleSubmitForm}
      >
        <div style={{ padding: "15px 0" }}>
          <Input
            field={userName}
            errors={errors as SchemaForm<string>}
            ref={userNameRef}
          />
        </div>
        <div style={{ padding: "15px 0" }}>
          <Input
            field={email}
            errors={errors as SchemaForm<string>}
            ref={emailRef}
          />
        </div>
        <div style={{ padding: "15px 0" }}>
          <Input
            field={password}
            errors={errors as SchemaForm<string>}
            ref={passwordRef}
          />
        </div>
        <div style={{ padding: "15px 0" }}>
          <Input
            field={confirmPw}
            errors={errors as SchemaForm<string>}
            ref={confirmPwRef}
          />
        </div>
        <button style={{ alignSelf: "center", marginTop: "25px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default memo(FormUnControlled);
