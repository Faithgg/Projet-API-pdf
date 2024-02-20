import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Generate from './components/Generate';
import Historique from './components/Home';
function App() {
  return (

<React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<Historique />}> </Route>
            <Route path="/generate">
              <Route index={true} element={<Generate />} />
            </Route>
          </Routes>
        </Router>
</React.StrictMode>
      



  );
}

export default App;
