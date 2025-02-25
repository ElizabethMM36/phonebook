const Filter = ({
  nameFilter,
  numberFilter,
  handleNameFilterChange,
  handleNumberFilterChange,
}) => {
  return (
    <div>
      <div>
        <input
          value={nameFilter}
          onChange={handleNameFilterChange}
          placeholder="Search by name"
        />
      </div>
      <div>
        <input
          value={numberFilter}
          onChange={handleNumberFilterChange}
          placeholder="Search by number"
        />
      </div>
    </div>
  );
};

export default Filter;