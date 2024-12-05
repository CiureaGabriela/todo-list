import React, {useState} from "react";

function DropdownTodo({changeArrow}){
 const [difficulty, setDifficulty ] = useState('');
 
    return(
        <div className="dropdown select-container flex flex-col h-max" value={difficulty} onChange={(evt)=>{setDifficulty(evt.target.value)}}>
           <label className="text-sm font-bold indigo ml-1" htmlFor="difficulty">Difficulty</label>
           <select onClick={(evt)=>{changeArrow(evt.target)}} id="difficulty" className="add-input w-min h-full p-3 mr-2 border-solid border-2 border-blue-400 rounded-md"
            name="difficulty" >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
           </select>
      
        </div>

       )

}



export default DropdownTodo;