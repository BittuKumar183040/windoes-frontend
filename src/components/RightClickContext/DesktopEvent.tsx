import { useState } from "react";

const DesktopEvent = () => {
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
    });
  };

  const handleClick = () => {
    if (menu.visible) setMenu({ ...menu, visible: false });
  };

  return (
    <div
      onContextMenu={handleRightClick}
      onClick={handleClick}
      className=" absolute left-0 top-0 h-full w-full"
    >
      {menu.visible && (
        <div
          className="relative rounded-xl flex flex-col gap-4 p-4 w-fit text-black bg-[#dddbe3]/90 backdrop-blur-sm z-[101]"
          style={{
            position: "absolute",
            top: menu.y,
            left: menu.x,
          }}
        >
          <div className="menu-item">Option 1</div>
          <div className="menu-item">Option 2</div>
          <div className="menu-item">Option 3</div>
        </div>
      )}
    </div>
  );
}

export default DesktopEvent;