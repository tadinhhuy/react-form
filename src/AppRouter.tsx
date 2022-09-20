import { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const ContentLayout = lazy(() => import('./components/Layout/Content.layout'));
const ControlledPage = lazy(() => import('./pages/Controlled'));
const UncontrolledPage = lazy(() => import('./pages/Uncontrolled'));
const Page404 = lazy(() => import('./pages/404'));

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<>Loading page...</>}>
          <Routes>
            <Route path="/" element={<ContentLayout />}>
              <Route path="controlled" element={<ControlledPage />} />
              <Route path="uncontrolled" element={<UncontrolledPage />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
