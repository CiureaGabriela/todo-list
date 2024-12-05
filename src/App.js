
import TodoList from './components/TodoList';
import { FiltersProvider } from './components/FiltersContext';
import './App.css';
function App() {
  return (
    <div className="App">
      <FiltersProvider>
          <TodoList/>
      </FiltersProvider>
    
    </div>
  );
}

export default App;
