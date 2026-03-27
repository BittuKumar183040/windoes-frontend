import { useSelector } from "react-redux";
import Window from "../../components/ui/common/Window";
import type { AppComponentsProps } from "../../types/applicationTypes";
import { useEffect, useState } from "react";
import type { RootState } from "../../../store";
import Personalization from "./NavItems/Personalization";
import { getUserFromLocal } from "../../components/utility/helper/localstorage";
import { getUserProfileImage } from "../../api/user.api";
import { UserProfileImage } from "../../components/ui/UserProfile";

const NAV_ITEMS = [
  { id: "personalization", label: "Personalization", icon: "🎨" },
  { id: "system", label: "System", icon: "💻" },
];

const Settings: React.FC<AppComponentsProps> = ({ isActive, onClose, onActive, onMinimize, app }) => {

  const [activeSection, setActiveSection] = useState("personalization");
  const titleColor = useSelector((state: RootState) => state.globalSettings.titleColor);

  const SECTION_COMPONENTS: Record<string, React.FC> = {
    personalization: Personalization,
  };

  const [logo, setLogo] = useState<string>("");
  const user = getUserFromLocal();

  useEffect(() => {
    if (!user?.id) return;
    const fetchProfileImage = async () => {
      try {
        setLogo(await getUserProfileImage(user.id))
      } catch (error) {
        console.error("Failed to fetch profile image", error);
      }
    };

    fetchProfileImage();
  }, [user?.id]);

  return (
    <Window
      isActive={isActive}
      onClose={onClose}
      onActive={onActive}
      onMinimize={onMinimize}
      minHeight={220}
      minWidth={520}
      windowTitle={app.name}
      titleHeight={35}
      Title={
        <div className="flex items-center gap-3 h-full pl-4">
          <div className="text-lg whitespace-nowrap">Settings</div>
        </div>
      }
    >
      <section
        style={{ ...titleColor.style }}
        className={`${titleColor.value} h-full flex overflow-hidden`}>

        <aside className="w-64 h-full bg-black/10 border-r border-white/20 flex flex-col py-2 shrink-0">
          <div className={`flex gap-3 items-center p-2 py-4`}>
            <UserProfileImage src={logo} size={40} />
            <div className=" leading-4">
               <strong className=" text-md">{user?.name}</strong>
              <p className=" text-sm">{user?.email}</p>
            </div>
          </div>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex relative items-center gap-2.5 px-4 py-2 mx-2 rounded-md text-md font-medium transition-all text-left
                ${activeSection === item.id
                  ? "bg-white/30 text-black dark:text-white"
                  : "text-black/70 dark:text-white hover:bg-white/15 hover:dark:text-white"
                }`}
            >
              <div className={` h-4 w-1 ${activeSection === item.id ? "bg-red-400 " : "bg-transparent"} rounded-r-xl absolute left-0 top-1/2 -translate-y-1/2`}></div>
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </aside>

        <div className="h-full w-full overflow-y-auto p-5">
          {(() => {
            const Component = SECTION_COMPONENTS[activeSection];
            return Component ? <Component /> : null;
          })()}
        </div>

      </section>
    </Window>
  );
};

export default Settings;