interface ProgressBarProp {
  height?:number,
  minPercentage?:number,
  value:number,
  maxValue:number,
  className?: string,
}

const ProgressBar = ({height=13, minPercentage=0, value, maxValue, className}:ProgressBarProp) => {

  let percentage = ( value / maxValue) * 100
  percentage = Math.min(Math.max(percentage, minPercentage), 100);
  
  return (
    <div style={{height: height+"px" }} className={`relative w-full h-full border border-gray-400 bg-gray-200 ${className}`}>
      <div style={{ width: `${percentage}%` }} className=' absolute left-0 top-0 h-full bg-[#1a77c2]'></div>
    </div>
  )
}

export default ProgressBar