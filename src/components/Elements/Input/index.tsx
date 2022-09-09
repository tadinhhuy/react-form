import { forwardRef, ChangeEvent, FocusEvent, RefObject } from "react";

interface Props {
  errors: {
    [key: string]: any;
  };
  handleOnBlur: (e: FocusEvent<HTMLInputElement>) => void;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  field: { [key: string]: any };
  form: { [key: string]: any };
}

const Input: React.FC<Props> = forwardRef(
  (
    { form, field, handleOnChange = () => { }, handleOnBlur = () => { }, errors },
    ref
  ) => {
    return (
      <>
        <div>{field?.label}</div>
        <input
          ref={ref as RefObject<HTMLInputElement>}
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
