import Todo from './components/Todo/Todo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={2500} />
      <Todo />
    </div>
  );
}

export default App;
