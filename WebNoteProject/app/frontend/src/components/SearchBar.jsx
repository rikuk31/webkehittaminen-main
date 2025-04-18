function SearchBar({ search, setSearch }) {
    return (
      <input
        type="text"
        placeholder="Hae muistiinpanoja"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    );
  }
  
  export default SearchBar;
  