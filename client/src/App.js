import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import store from './store/store.js';
import Login from './pages/Login/Login.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup/Signup.jsx';

function App() {
  return (
    <div style={{ margin: "0px", padding: "0px" }}  >
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Router>
      </Provider>
      <ToastContainer position='top-center' />
    </div>
  );
}

export default App;
