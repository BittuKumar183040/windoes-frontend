import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { setTitleColor } from '../../../features/GlobalSettings';
import { TITLE_COLOR_PRESETS, type TypeTheme } from '../../../features/Themes';

const Personalization = () => {
  const dispatch = useDispatch();
  const titleColor = useSelector((state: RootState) => state.globalSettings.titleColor);

  const handleThemeChange = (preset: TypeTheme) => {
    dispatch(setTitleColor(preset));
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold text-black/50 uppercase tracking-widest mb-3">
          Title Bar Color
        </h2>

        {/* Preview */}
        <div className="mb-4 rounded-lg overflow-hidden shadow-sm border border-white/30">
          <div
            className={`${titleColor.value} h-9 flex items-center px-4`}
            style={titleColor.style}
          >
            <span className="text-sm font-medium select-none">
              Preview — Title Bar
            </span>
          </div>
          <div className="bg-white/20 h-14 flex items-center justify-center">
            <span className="text-xs text-black/40">Window content area</span>
          </div>
        </div>

        {/* Preset grid */}
        <div className="grid grid-cols-3 gap-2">
          {TITLE_COLOR_PRESETS.map((preset) => {
            const isSelected = titleColor.label === preset.label;
            return (
              <button
                key={preset.label}
                title={preset.label}
                onClick={() => handleThemeChange(preset)}
                className={`group relative flex flex-col items-start rounded-lg overflow-hidden border-2 transition-all
                  ${isSelected
                    ? "border-black/50 shadow-md scale-[1.02]"
                    : "border-white/20 hover:border-black/25 hover:scale-[1.01]"
                  }`}
              >
                <div
                  className="w-full h-8"
                  style={{ background: preset.preview }}
                />

                <div className="w-full px-2 py-1.5 bg-white/30 backdrop-blur-sm">
                  <span className="text-xs text-black/70 font-medium truncate block">
                    {preset.label}
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-black/50 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 fill-white">
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Personalization;