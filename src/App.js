import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './App.css';
import { routes } from './Router/routes';
import AuthHandler from './components/AuthHandler';



function App() {

  return (
    <div className="App">
       
        <Router>
          <AuthHandler />
            <Routes>
                  {
                    routes.map((r,i) => (<Route key={i} exact path={r.path} element={r.element} >
                        {r.subRoutes && r.subRoutes.map((sub,j) => (<Route key={'sub'+j} exact path={sub.path} element={sub.element} />))}
                    </Route>))
                  }
            </Routes>
        </Router>
   </div>
    
  );
}

export default App;
