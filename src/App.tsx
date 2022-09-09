import React, { Fragment } from 'react';
import ContentLayout from './components/Layout/Content.layout';
import ControlledPage from './pages/Controlled';
// import UncontrolledPage from './pages/Uncontrolled';

const App: React.FC = (): JSX.Element => {
  return <React.Fragment>
    <ContentLayout>
      <Fragment>
        <ControlledPage />
        {/* <UncontrolledPage /> */}
      </Fragment>
    </ContentLayout>
  </React.Fragment>;
};

export default App;
