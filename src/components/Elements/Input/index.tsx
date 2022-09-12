import { FormKey, SchemaForm } from '@/models/general';
import { forwardRef, ChangeEvent, FocusEvent, ForwardedRef } from 'react';
import { ErrorText } from './Input.style';

interface Props {
  handleOnBlur: (e: FocusEvent<HTMLInputElement>) => void;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: SchemaForm<string>;
  field: { [key in FormKey]: any };
  form: SchemaForm<string>;
}

const Input: React.FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ form, field, handleOnChange = () => { }, handleOnBlur = () => { }, errors }, ref: ForwardedRef<HTMLInputElement>) => {
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
          <ErrorText>
            {errors[field?.name]}
          </ErrorText>
        )}
      </>
    );
  }
);

export default Input;
