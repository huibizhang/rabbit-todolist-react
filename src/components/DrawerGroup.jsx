import GroupItem from "./GroupItem";

const DrawerGroup = ({ group, showGroupName, childs }) => {
  return (
    <div className="border-b py-3 pr-3 last:border-0">
      {showGroupName ? (
        <div className="mt-2 mb-4 w-full pl-5 text-xs text-gray-500">
          {group}
        </div>
      ) : (
        ""
      )}
      {childs.map((child) => {
        return (
          <GroupItem
            key={`${group}-${child.name}`}
            groupName={group}
            child={child}
          />
        );
      })}
    </div>
  );
};

export default DrawerGroup;
