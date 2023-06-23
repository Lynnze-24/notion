import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './App.css';
import { routes } from './Router/routes';



function App() {
  

  return (
  
    <div className="App">
        <Router>
       <Routes>
       {
         routes.map((r,i) => (<Route key={i} exact path={r.path} element={r.element} />))
       }
      </Routes>
      </Router>
    </div>
    
  );
}

export default App;
