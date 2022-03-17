const GroupItem = (props) => {
  const { child, groupName } = props;

  return (
    <label htmlFor={`${groupName}-${child.name}`}>
      <input
        type="radio"
        name="groupItem"
        className="peer sr-only"
        id={`${groupName}-${child.name}`}
        checked={child.checked}
      />
      <div className="rounded-[0px_10px_10px_0px] p-3 pl-5 hover:bg-gray-100 peer-checked:bg-gray-100">
        {child.name}
      </div>
    </label>
  );
};

export default GroupItem;
