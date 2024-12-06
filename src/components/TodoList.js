import React, {useState, useEffect, useContext, useCallback} from "react";
import { FiltersContext } from "./FiltersContext";
import TodoItem from "./TodoItem";
import Confetti from "react-confetti";
import DropdownTodo from "./DropdownTodo";
import Filter from "./Filter";


function TodoList() {
   const [todos, setTodos] = useState(getItemLocalStorage());
   const [newTodo, setNewTodo ] = useState('');
   const [showConfetti , setShowConfetti] = useState(false);
   const {filter, sort} = useContext(FiltersContext);

   function addTodo() {
    let difficulty = document.querySelector('#difficulty').value;
    if(newTodo.trim() === '') return;
        const newTask ={
            id: Date.now(),
            text: newTodo,
            completed: false,
            difficulty: difficulty
        }
        setTodos((prevTodos) => [...prevTodos, newTask]);
        setItemsLocalStorage(todos);
        setNewTodo('');  
     
   }

    function toggleComplete(id, evt){
        const updatedTodos = todos.map((todo) =>{
            if(todo.id === id){
              todo =  { ...todo, completed: !todo.completed }
            }return todo
        } );
     
        setTodos(updatedTodos);
    
        const selectedTodo = updatedTodos.find((todo) => todo.id === id);
        if (selectedTodo.completed) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false),2000 );
        }
        updatedTodos.forEach((todo) =>{
          if(todo.id === id) evt.target.classList.contains('unchecked') 
            ? evt.target.style.backgroundColor = 'rgb(96 165 250 )'
            : evt.target.style.backgroundColor = '';
            
        });
    }

    function onInputChange(id, value) {
       const updateEditTodo = todos.map((todo)=>
        todo.id === id ? { ...todo, text: value } :todo
        )
        setTodos(updateEditTodo);
        function removeError(elem) {
         let error = elem.closest('li').querySelector('.error-empty')
            if(error){error.remove()}
            
        }
      
        document.querySelectorAll('.todo-item input').forEach((elem)=>{
           let paragraph = document.createElement('p');
           paragraph.classList.add('error-empty');
           paragraph.innerText = "Your todo can't be empty!";
           let parent = elem.closest('li');
           elem.value === '' ? parent.appendChild(paragraph): removeError(elem);
           
        })
  
    }
    function changeArrow(target){
        
        const selectElement = target;
        const selectContainer= target.parentElement;
        selectElement.addEventListener('focus', () => {
        selectContainer.classList.add('active');
        });

        selectElement.addEventListener('blur', () => {
        selectContainer.classList.remove('active');
        });

    }
    
    const deleteTodo = (id) => {
        const todoElement = document.getElementById(`todo-${id}`);
        if (todoElement) {
            todoElement.classList.add("fade-out");
        }
          setTodos(todos.filter(todo => todo.id !== id));
       
    };

    function setItemsLocalStorage(array){
       localStorage.setItem("todos",JSON.stringify(array));
    }
    function getItemLocalStorage(){
        const getItems = JSON.parse(localStorage.getItem("todos"));
       return getItems ? getItems : [];
    }
    const filteredTodos = useCallback(()=>{
        let filteredUpdate = todos;
        if(filter !== 'all') {
            filteredUpdate = filteredUpdate.filter((todo)=> todo.difficulty === filter)
        }
        if(sort === 'completed') {
           filteredUpdate = filteredUpdate.filter((todo)=>todo.completed === true)
        }else if (sort === "incompleted") {
            filteredUpdate = filteredUpdate.filter((todo) => todo.completed === false);
        }
  
        return filteredUpdate;
    
    },[filter,sort,todos])


    useEffect(() => {
        setItemsLocalStorage(todos);
    }, [todos] );
     
    useEffect(() => {
        filteredTodos()
    }, [filteredTodos] ); 



    return(
        <div>
            <div className="text-center w-full"> {showConfetti && <Confetti />}</div>
            <h1 className="title text-5xl mt-5 font-bold shadow-lg p-6 text-center text-blue-400">My To Do List</h1>
            <div className="app-wrapper">

               <div className="my-10 flex justify-center">
                    <input
                            type='text'
                            value={newTodo}
                            onChange={(e)=>setNewTodo(e.target.value)}
                            placeholder="Add a new task"
                            className="add-input w-1/2 h-max self-end p-3 mr-2 border-solid border-2
                            border-blue-400 text-bold rounded-md"
                        />
                     <DropdownTodo
                      changeArrow={changeArrow}/>
                        <button onClick={addTodo}  className="add-item border-solid border-2 border-fuchsia-400 min-h-fit self-end rounded-md text-white">ADD</button>
                </div>

                <Filter
                  todos={todos}
                  setTodos={setTodos}
                  changeArrow={changeArrow}
                />
                
                <ul className="todo-list py-5"> 
                {filteredTodos().map((todo)=>(
                        <TodoItem
                        key={todo.id}
                        todo={todo} 
                        deleteTodo={deleteTodo}
                        toggleComplete={toggleComplete}
                        checked={todo.completed}
                        id={`todo-${todo.id}`}
                        onInputChange={onInputChange}
                       
                       
                            
                        />

                ))}
                    
                </ul>
          </div>

        </div>
    )

}

  

export default TodoList;