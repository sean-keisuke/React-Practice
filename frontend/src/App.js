import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/header';
import About from './components/pages/About';
import TodosPage from './components/pages/TodosPage'
import ProjectsPage from './components/pages/ProjectsPage'

export function App () {
    return (
        <Router>
            <div className="App">
                <div className="container">
                    <Header />
                    <Route exact path="/" component={TodosPage} />
                    <Route path="/about" component={About} />
                    <Route path="/ProjectsPage" component={ProjectsPage}/>
                </div>
            </div>
        </Router>
    );
}  
export default App;
