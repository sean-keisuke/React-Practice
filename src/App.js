import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/header';
import About from './components/pages/About';
import TodosPage from './components/pages/TodosPage'

export function App () {
    return (
        <Router>
            <div className="App">
                <div className="container">
                    <Header />
                    <Route exact path="/" component={TodosPage} />
                    <Route path="/about" component={About} />
                </div>
            </div>
        </Router>
    );
}  
export default App;
