import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LearningMode from './pages/LearningMode';
import QuizMode from './pages/QuizMode';
import WritingMode from './pages/WritingMode';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LearningMode />} />
          <Route path="/quiz" element={<QuizMode />} />
          <Route path="/write" element={<WritingMode />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
