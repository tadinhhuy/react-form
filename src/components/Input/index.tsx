//@ts-nocheck
import { forwardRef } from "react";

const Input = forwardRef(
  (
    { form, field, handleOnChange = () => {}, handleOnBlur = () => {}, errors },
    ref
  ) => {
    return (
      <>
        <div>{field?.label}</div>
        <input
          ref={ref}
          placeholder={field?.placeholder}
          name={field?.name}
          type={field?.type}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          value={form && form[field?.name]}
        />
        {errors && errors[field?.name] && (
          <div
            style={{
              color: "red",
              fontSize: "12px",
              position: "absolute"
            }}
          >
            {errors[field?.name]}
          </div>
        )}
      </>
    );
  }
);

export default Input;
