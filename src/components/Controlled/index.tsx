//@ts-nocheck
import { useState, useCallback, useMemo, memo } from "react";
import Input from "../Input";

const FormControlled = ({ schemaForm, initValueForm }) => {

  const [form, setForm] = useState(initValueForm);
  const [errors, setErrors] = useState({});
  const { userName, email, password, confirmPw } = schemaForm;

  const isDisabled = useMemo(() => {
    const keys = Object.keys(form);
    const areValidFields = keys.every(
      (field) => form[field].trim().length > 0 && !errors[field]
    );
    return !areValidFields;
  }, [form, errors]);

  const validateForm = useCallback(
    (fieldName, newValues) => {
      const currentSchema = schemaForm[fieldName];
      const {
        regex,
        requiredMessage,
        errorMessage,
        validator,
        name
      } = currentSchema;

      const { password: passwordValue } = newValues;
      const currentValue = newValues[fieldName];

      const currentParams =
        name === "confirmPw"
          ? [passwordValue, currentValue, requiredMessage, errorMessage, regex]
          : [currentValue, requiredMessage, errorMessage, regex];

      const messageField = validator(...currentParams);

      return { [fieldName]: messageField };
    },
    [schemaForm]
  );

  const handleOnChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      setForm((prevState) => {
        const newValues = { ...prevState, [name]: value };
        const messagesForm = validateForm(name, newValues);
        setErrors({ ...errors, ...messagesForm });
        return newValues;
      });
    },
    [errors, validateForm]
  );

  const handleOnBlur = useCallback(
    (e) => {
      const { value, name } = e.target;
      setForm((prevState) => {
        const newValues = { ...prevState, [name]: value };
        const messagesForm = validateForm(name, newValues);
        setErrors({ ...errors, ...messagesForm });
        return newValues;
      });
    },
    [errors, validateForm]
  );

  const onHandleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (isDisabled) {
        return;
      }
      console.log("submited", form);
      setForm(initValueForm);
      setErrors({});
    },
    [form, initValueForm, isDisabled]
  );

  return (
    <div>
      Form Controlled:
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
            form={form}
            handleOnChange={handleOnChange}
            handleOnBlur={handleOnBlur}
            errors={errors}
          />
        </div>
        <div style={{ padding: "15px 0" }}>
          <Input
            field={email}
            form={form}
            handleOnChange={handleOnChange}
            handleOnBlur={handleOnBlur}
            errors={errors}
          />
        </div>
        <div style={{ padding: "15px 0" }}>
          <Input
            field={password}
            form={form}
            handleOnChange={handleOnChange}
            handleOnBlur={handleOnBlur}
            errors={errors}
          />
        </div>
        <div style={{ padding: "15px 0" }}>
          <Input
            field={confirmPw}
            form={form}
            handleOnChange={handleOnChange}
            handleOnBlur={handleOnBlur}
            errors={errors}
          />
        </div>
        <button
          disabled={isDisabled}
          style={{ alignSelf: "center", marginTop: "25px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default memo(FormControlled);
