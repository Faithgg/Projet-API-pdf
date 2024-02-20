import React from 'react';
import { BrowserRouter as Router, Route, Routes,useNavigate } from 'react-router-dom'
import './App.css';
import Generate from './Generate';
import Historique from './Home';
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
