
import { FiltersContext } from "./FiltersContext";
import { useContext } from "react";


function Filter({changeArrow}){

    const { filter, setFilter } = useContext(FiltersContext);
    const {sort, setSort} = useContext(FiltersContext);


    return(
       <section className="flex justify-evenly">
        <div className="flex flex-col mr-1 select-container" value={filter} onChange={(evt)=>setFilter(evt.target.value)}>      
            <label className="text-sm font-bold" htmlFor="difficulty">Filter By Difficulty</label>
            <select  id="difficulty" name="difficulty" onClick={(evt)=>{changeArrow(evt.target)}} className="text-blue-400 border-solid border-2 border-blue-200 text-bold rounded-md" > 
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>

            <div className="flex flex-col ml-1 select-container" value={sort} onChange={(evt)=>setSort(evt.target.value)}>
                <label className="text-sm font-bold" htmlFor="completed" >Filter By Status</label>
                <select id="completed" name="completed" onClick={(evt)=>{changeArrow(evt.target)}} className="text-blue-400 border-solid border-2 border-blue-200 text-bold rounded-md">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incompleted">Incompleted</option>
                </select>
            </div>
      </section>
    
    )
}

export default Filter;