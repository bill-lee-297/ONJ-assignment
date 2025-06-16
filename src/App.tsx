import { OverlayProvider } from '@toss/use-overlay';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';
import NotFoundPage from './pages/NotFoundPage';
import PreviewPage from './pages/PreviewPage';

const App = () => {
  return (
    <OverlayProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/edit/:id" element={<CreatePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </OverlayProvider>
  );
};

export default App;
