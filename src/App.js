import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './components/Auth/AuthContext';
import './App.css'
import Home from './components/home';
import Quiz from './components/quiz'
import Grades from './components/Grades/grades';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/privateRoute';
import Create from './components/Questions/create';
import Logo from './components/Interface/logo';


function App() {
    return (
        <Container
            className="container"
            style={{ minHeight: "100vh" }}
        >
                <Router>
                    <div className="container">
                    <AuthProvider>
                    <Logo />
                        <Switch>
                            <PrivateRoute exact path="/" component={Home} />
                            <Route path="/signup" component={Signup} />
                            <Route path="/login" component={Login} />
                            <Route path="/grades" component={Grades} />
                            <Route path="/quiz" component={Quiz} />
                            <Route path="/create" component={Create} />
                        </Switch>
                    </AuthProvider>
                    </div>
                </Router>
      </Container>
    )
  }

export default App;