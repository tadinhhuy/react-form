import React from 'react';
import ContentLayout from './components/Layout/Content.layout';
import ControlledPage from './pages/Controlled';

const App: React.FC = (): JSX.Element => {
  return <React.Fragment>
    <ContentLayout>
      <ControlledPage />
    </ContentLayout>
  </React.Fragment>;
};

export default App;
