import clsx from "clsx";
import DrawerGroup from "./DrawerGroup";

const Drawer = ({ opened, setDrawerOpened }) => {
  const menu = [
    {
      group: "功能",
      showGroupName: false,
      childs: [{ name: "待辦事項", link: "/", checked: true }],
    },
    {
      group: "標籤",
      showGroupName: true,
      childs: [],
    },
    {
      group: "其他功能",
      showGroupName: true,
      childs: [
        { name: "設定", link: "/setting/", checked: false },
        { name: "關於", link: "/about/", checked: false },
      ],
    },
  ];

  const closing = () => {
    setDrawerOpened(false);
  };

  return (
    <div
      className={clsx([
        "absolute top-0 h-screen w-screen",
        !opened && "pointer-events-none",
      ])}
    >
      {/* Overlay */}
      <div
        className={clsx([
          "h-full w-full bg-black/50 transition-all",
          opened ? "opacity-100" : "opacity-0",
        ])}
        onClick={closing}
      />

      {/* Drawer */}
      <div
        className={clsx([
          "absolute top-0 h-screen w-2/3 max-w-[300px] bg-white shadow-xl transition-all",
          !opened && "-translate-x-full",
        ])}
      >
        {menu.map((group) => {
          return <DrawerGroup key={group.group} {...group}></DrawerGroup>;
        })}
      </div>
    </div>
  );
};

export default Drawer;
