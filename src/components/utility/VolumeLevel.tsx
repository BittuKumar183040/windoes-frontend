import React, { useEffect, useRef, useState } from 'react'
import { TASKBAR_ICON_SIZE_BOUND, TASKBAR_SYSTEM_TRAY_ICON_SIZE } from '../../config/setting';
import { Wifi } from 'lucide-react';
import ToolTipNavbar from '../ui/ToolTipNavbar';

type VolumeLevelProps = {
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const lastVolume = Number(localStorage.getItem("global_volume"))

const VolumeLevel: React.FC<VolumeLevelProps> = ({ active, onClick }) => {
  const [vol, setVol] = useState(lastVolume || 0)
  const volumeRef = useRef<HTMLDivElement>(null);
  const [showTip, setShowTip] = useState<boolean>(false)
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
  };

  useEffect(() => {
    const currentVolumeRef = volumeRef.current;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      setVol((prev) => {
        const newVol = e.deltaY > 0 ? prev - 2 : prev + 2;
        localStorage.setItem("global_volume", String(newVol))
        return Math.max(0, Math.min(100, newVol));
      });
    };
    if (currentVolumeRef) {
      currentVolumeRef.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (currentVolumeRef) {
        currentVolumeRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, [])

  return (<>
    <ToolTipNavbar
      anchorRef={volumeRef}
      visible={showTip}
      placement="top"
    >
      <p>Speaker Volume: {vol === 0 ? 'Muted' : vol + "%"}</p>
    </ToolTipNavbar>
    <div
      ref={volumeRef}
      onMouseEnter={()=> setShowTip(true)}
      onMouseLeave={()=> setShowTip(false)}
      onClick={handleClick}
      style={{
        height: TASKBAR_ICON_SIZE_BOUND,
        width: "54px"
      }}
      className={`text-black flex gap-3 justify-center items-center
        rounded tracking-wider
        ${active ? "bg-white/30" : "bg-white/0"}
        hover:bg-white/50 transition-colors duration-200 ease-in-out
        `}>
      <Wifi absoluteStrokeWidth={true} strokeWidth={1.1} size={TASKBAR_SYSTEM_TRAY_ICON_SIZE} />
      
      {(() => {
        const mappedVol =
          vol === 0 ? 0 :
          vol <= 33 ? 1 :
          vol <= 66 ? 2 :
          3;
        return <img src={`./icons/volume/v${mappedVol}.png`} />;
      })()}
    </div>
  </>
  );
}

export default VolumeLevel;