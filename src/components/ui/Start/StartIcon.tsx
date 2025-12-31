
interface StartIconProps {
  cardSize: number,
  radius: number,
  gap?: number,
  className?: string,
}

const StartIcon = ({cardSize, radius, gap=1, className}: StartIconProps) => {
  return (
    <div style={{gap}} className={"flex flex-col " + className}>
      <div style={{gap}} className="flex">
        <div style={{ height: `${cardSize}px`, width: `${cardSize}px`, borderRadius: `${radius}px 0 0 0` }} className={` bg-linear-to-br from-[#47cbfc] to-[#2babec] bg-200`}></div>
        <div style={{ height: `${cardSize}px`, width: `${cardSize}px`, borderRadius: `0 ${radius}px 0 0` }} className={`bg-linear-to-br from-[#2aaaeb] to-[#118add] bg-200`}></div>
      </div>
      <div style={{gap}} className="flex">
        <div style={{ height: `${cardSize}px`, width: `${cardSize}px`, borderRadius: `0 0 0 ${radius}px` }} className={`bg-linear-to-br from-[#23a1e8] to-[#0179d4] bg-200`}></div>
        <div style={{ height: `${cardSize}px`, width: `${cardSize}px`, borderRadius: `0 0 ${radius}px 0` }} className={`bg-linear-to-br from-[#1089dd] to-[#0179d3] bg-200`}></div>
      </div>
    </div>
  )
}

export default StartIcon