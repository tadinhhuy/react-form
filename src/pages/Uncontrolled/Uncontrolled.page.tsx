import { schemaForm } from '../../common/schema';
import { Fragment } from 'react';
import UncontrolledForm from './components/UncontrolledForm';

const initValueForm = {
  userName: "",
  email: "",
  password: "",
  confirmPw: ""
};

const UncontrolledPage = (): JSX.Element => {
  return (
    <Fragment>
      <UncontrolledForm schemaForm={schemaForm} initValueForm={initValueForm} />
    </Fragment>
  )
}
export default UncontrolledPage;