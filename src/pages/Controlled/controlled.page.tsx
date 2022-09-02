import { schemaForm } from '../../common/schema';
import { Fragment } from 'react';
import ControlledForm from './components/Controlled';

const initValueForm = {
  userName: "",
  email: "",
  password: "",
  confirmPw: ""
};

const ControlledPage = (): JSX.Element => {
  return (
    <Fragment>
      <ControlledForm schemaForm={schemaForm} initValueForm={initValueForm} />
    </Fragment>
  )
}
export default ControlledPage;