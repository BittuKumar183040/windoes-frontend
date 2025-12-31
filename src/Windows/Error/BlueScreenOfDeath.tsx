import React from "react";

interface BlueScreenProps {
  progress?: number;
  stopCode?: string;
}

const BlueScreenOfDeath: React.FC<BlueScreenProps> = ({
  progress = 20,
  stopCode = "CRITICAL_PROCESS_DIED",
}) => {
  return (
    <div className="h-dvh w-full flex items-center bg-[#0078D7] text-white" >
      <div className=" flex flex-col md:ml-52 ml-20 gap-5">
        <div className="text-[120px] leading-none">:(</div>

        <p className="text-4xl leading-normal md:w-[620px] w-auto ">
          Your PC ran into a problem and needs to restart. We're just collecting some error info, and then you need to restart by youself.
        </p>

        <p className="text-[22px]">{progress}% was completed</p>

        <div className="h-[100px] flex gap-7 justify-between items-start">
          <div className="h-full w-[100px] shrink-0 relative overflow-hidden p-3 bg-white ">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://github.com/BittuKumar183040&color=0078D7&ecc=M" />
          </div>

          <div className="flex flex-col h-full justify-between text-xl leading-relaxed">
            <p>
              For more information about this issue and possible fixes, visit &nbsp;
              <span>https://github.com/BittuKumar183040</span>
            </p>

            <p className="text-md leading-relaxed">
              If you find this, fell free to fork and fix this.
              <br />
              Stop code: <span className="font-semibold">{stopCode}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueScreenOfDeath;
