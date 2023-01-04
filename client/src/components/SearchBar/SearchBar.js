import React, { useState } from "react";
import "./SearchBar.css";
import { Link } from 'react-router-dom';



function SearchBar({ placeholder, data }) {

  
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value) => {
            return (
              <Link className="dataItem"  to = "/userProfile" state= {{ _id: value._id } } onClick={clearInput} >
                 {value.name.concat(" ", value.surname)} 
              </Link>
            
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;