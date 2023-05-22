import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './searchBar.css'
;
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [myStates, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          'http://cdn-api.co-vin.in/api/v2/admin/location/states'
        );
        setStates(response.data.states);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterStates = myStates.filter((state) =>
    state.state_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search state..."
        value={searchTerm}
        onChange={handleInputChange}
        className="searchList"
      />
      <ul>
        {filterStates.map((state) => (
          <li key={state.state_id}>{state.state_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
