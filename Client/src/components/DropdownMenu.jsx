const DropdownMenu = ({ selectedOption, onOptionChange }) => {
  return (
    <div className="filter-field">
      <label id="dropdown-label" htmlFor="dropdown">
        Filter Todos :
      </label>
      <select id="dropdown" value={selectedOption} onChange={onOptionChange}>
        <option value="all">All</option>
        <option value="urgent">Urgent</option>
        <option value="important">Important</option>
        <option value="negligible">Negligible</option>
      </select>
    </div>
  );
};

export default DropdownMenu;
