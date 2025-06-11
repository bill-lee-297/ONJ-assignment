import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import ListPage from './pages/ListPage';
import EditPage from './pages/EditPage';
import CreatePage from './pages/CreatePage';
import PreviewPage from './pages/PreviewPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/:id/edit" element={<EditPage />} />
          <Route path="/:id/preview" element={<PreviewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
