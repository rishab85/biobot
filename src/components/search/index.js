import React, {useState, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import AutoFill from '../auto-fill';

const Search=()=>{

    const [search, setSearch] = useState([]);
    const [current, setCurrent] = useState(0);
    const [queryValue, setQueryValue]= useState('');

    async function saveInput(event){
        await axios.get(`http://localhost:5000/search-kit?id=${event.target.value}`).then((res)=>{
            setSearch(res.data)
        })
    }

    function handleKeyDown({keyCode}){

        //keyup
        if(keyCode===38) {
            const currentValue = (current||1)-1
            const value = search[currentValue].id
            setQueryValue(value)
            setCurrent(currentValue)
        }

        //keydown
        if(keyCode===40) {
            if(current>search.length) return;
            const currentValue = current +1;
            const value = search[currentValue].id
            setQueryValue(value)
            setCurrent(currentValue)
        }

    }
      
    const processChanges = debounce((event) => {
        saveInput(event)
        setQueryValue(event.target.value)
    },200);

    return (
        <>
            <label htmlFor='search-kit'>Search</label>
            <input id='search-kit' type='text' value={queryValue} onChange={(event)=>{processChanges(event); setQueryValue(event.target.value)}} onKeyDown={handleKeyDown}/>
            <AutoFill data={search} currentActive={current}/>
        </>
    )
}

export default Search;