import React from 'react';
import classNames from 'classnames';

function TodoItem({todo, toggleComplete,checked, deleteTodo, id, onInputChange}){

   const completedClass = classNames({
    'completed line-through text-gray-500': todo.completed, 
    'pending': !todo.completed   
     });

    const checkedClass = classNames({
    'checked': todo.completed, 
    'unchecked': !todo.completed   
     });

     const difficultyClass = classNames({
    'high border-3 bg-red-200  border-red-200': todo.difficulty === 'high', 
    'medium border-3 bg-orange-200  border-orange-200': todo.difficulty === 'medium',
    'low border-3 bg-green-200 border-green-200': todo.difficulty === 'low'  
    });

   const todoClasss = classNames(completedClass, difficultyClass, 'basis-1/2 py-3 mr-2 w-full content-center border-2 rounded-md' );
   const checkBtnClass = classNames(checkedClass, difficultyClass, 'basis-1/8 w-12 h-auto border-2  rounded mr-2')

    return(
        <li className='todo-item flex flex-wrap  relative justify-center' id={id} style={{marginTop:'20px', textAlign:'start'}}>
            <input 
            checked={checked}
            type="checkbox"
            onChange={(evt)=>(toggleComplete(todo.id, evt))}
            className={checkBtnClass}
            id={id}
            />
            <input  className={todoClasss} onChange={(e)=>(onInputChange(todo.id, e.target.value))} value={todo.text}/>
            <button  onClick={(evt)=>(deleteTodo(todo.id))} className='basis-1/5 self-end bg-fuchsia-400 rounded-md text-white'>DELETE</button>
        </li>
    )

}

export default TodoItem;