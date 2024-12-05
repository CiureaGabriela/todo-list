import React, {createContext, useState} from "react";

export const FiltersContext = createContext();
export const FiltersProvider = ({ children }) => {
    const [filter, setFilter] = useState("all"); 
    const [sort, setSort] = useState("all"); 

    return(
        <FiltersContext.Provider value={{filter, setFilter, sort, setSort}}> 
           {children}
        </FiltersContext.Provider>
    )

  };