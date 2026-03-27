import { useSelector } from "react-redux";
import Window from "../../components/ui/common/Window";
import type { AppComponentsProps } from "../../types/applicationTypes";
import { useState } from "react";
import type { RootState } from "../../../store";
import Personalization from "./NavItems/Personalization";

const NAV_ITEMS = [
  { id: "personalization", label: "Personalization", icon: "🎨" },
];

const Settings: React.FC<AppComponentsProps> = ({ isActive, onClose, onActive, onMinimize, app }) => {
  
  const [activeSection, setActiveSection] = useState("personalization");
  const titleColor = useSelector((state: RootState) => state.globalSettings.titleColor);
  
  const SECTION_COMPONENTS: Record<string, React.FC> = {
    personalization: Personalization,
  };

  return (
    <Window
      isActive={isActive}
      onClose={onClose}
      onActive={onActive}
      onMinimize={onMinimize}
      minHeight={420}
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
        style={{...titleColor.style}}
        className={`${titleColor.value} h-full flex overflow-hidden`}>
        
        <aside className="w-44 h-full bg-black/10 border-r border-white/20 flex flex-col py-2 shrink-0">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 mx-2 rounded-md text-sm font-medium transition-all text-left
                ${activeSection === item.id
                  ? "bg-white/30 text-black shadow-sm"
                  : "text-black/70 hover:bg-white/15 hover:text-black"
                }`}
            >
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