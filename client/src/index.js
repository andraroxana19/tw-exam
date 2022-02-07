import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Board from './Board';
import SpacecraftForm from './SpacecraftForm';
import AstronautForm from './AstronautForm';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="/spacecrafts/:spacecraftId" element={<SpacecraftForm />} />
      <Route path="/astronauts/:astronautId" element={<AstronautForm />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);
