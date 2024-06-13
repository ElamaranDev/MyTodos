const PriorityDropdown = (props) => {
  // eslint-disable-next-line react/prop-types
  const { selectedPriority, onPriorityChange } = props;
  return (
    <div className="priority-field">
      <select
        id="priority-dropdown"
        value={selectedPriority}
        onChange={onPriorityChange}
      >
        <option value="urgent">Urgent</option>
        <option value="important">Important</option>
        <option value="negligible">Negligible</option>
      </select>
    </div>
  );
};

export default PriorityDropdown;
