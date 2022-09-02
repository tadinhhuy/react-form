//@ts-nocheck
import { useState, useRef, useMemo, useCallback, memo } from "react";
import Input from "../../../components/Elements/Input";

const FormUnControlled = ({ schemaForm, initValueForm }) => {
  const [errors, setErrors] = useState();
  const formRef = useRef<React.RefObject<HTMLInputElement>>({});
  const keyOfFormFields = Object.keys(initValueForm);
  const { userName, email, password, confirmPw } = schemaForm;

  const formValues = useMemo(() => {
    const values = keyOfFormFields.reduce((accumulator, key) => {
      return {
        ...accumulator,
        [key]: formRef?.current[key]?.value
      };
    }, {});
    return values;
  }, [keyOfFormFields, formRef]);

  const validateFormMessage = useCallback(() => {
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

      const messages = validator(...currentParams);

      return {
        ...accumulator,
        [currentKey]: messages
      };
    }, {});
    console.log("new messages", newMessages);
    return newMessages;
  }, [formValues, schemaForm, keyOfFormFields]);

  const checkValidate = useCallback(() => {
    const values = formValues;

    const areInvalidFields = keyOfFormFields.every(
      (field) => !values[field]?.trim()
    );

    const areInvalidErrors = keyOfFormFields.every(
      (field) => errors && errors[field]
    );

    return areInvalidFields || areInvalidErrors;
  }, [formValues, keyOfFormFields, errors]);

  const callAPI = useCallback(() => {
    console.log("Call API...", formValues);
  }, [formValues]);

  const onHandleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log("validateFormMessage", validateFormMessage());
      if (checkValidate()) {
        const messagesErrors = validateFormMessage();
        setErrors(messagesErrors);
        return;
      }
      callAPI();
    },
    [callAPI, checkValidate, validateFormMessage]
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
            errors={errors}
            ref={(el) => (formRef.current[userName?.name] = el)}
          />
        </div>
        <div style={{ padding: "15px 0" }}>
          <Input
            field={email}
            errors={errors}
            ref={(el) => (formRef.current[email?.name] = el)}
          />
        </div>
        <div style={{ padding: "15px 0" }}>
          <Input
            field={password}
            errors={errors}
            ref={(el) => (formRef.current[password?.name] = el)}
          />
        </div>
        <div style={{ padding: "15px 0" }}>
          <Input
            field={confirmPw}
            errors={errors}
            ref={(el) => (formRef.current[confirmPw?.name] = el)}
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
