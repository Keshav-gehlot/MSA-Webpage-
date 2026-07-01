/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { SponsorsAccessPage } from './pages/SponsorsAccessPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sponsors" element={<SponsorsAccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}
