//import logo from './logo.svg';
import './App.css';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Login from './components/login/login';
import Menu from './components/navbar/navbar';
import AppRouter from './components/router/router';

function App() {
  return (
    <div className="App">
    <Container id="cont-app">
      <Menu />
      <AppRouter />
    </Container>
    </div>
  );
}

export default App;
