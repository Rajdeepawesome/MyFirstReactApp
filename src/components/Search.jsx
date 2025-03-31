import React from 'react'

const Search = ({searchTerm,setSearchTerm, isChecked}) => {
    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="search" />
                <input
                type="text"
                placeholder= {`Search thorugh thousand of ${!isChecked?'movies':'tv shows'}`}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>
        </div>
    )
}
export default Search
