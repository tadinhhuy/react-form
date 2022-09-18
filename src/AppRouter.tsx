import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ContentLayout from './components/Layout/Content.layout';
import ControlledPage from './pages/Controlled';
import UncontrolledPage from './pages/Uncontrolled';

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ContentLayout />}>
            <Route path="/controlled" element={<ControlledPage />} />
            <Route path="/uncontrolled" element={<UncontrolledPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
