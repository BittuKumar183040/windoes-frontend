import { Loader2 } from "lucide-react"
import StartIcon from "../components/ui/Start/StartIcon"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Boot = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    const wait = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/signup", { replace: true });

      // ping rest server 
      // ping socket server

    }

    wait();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div onContextMenu={(e)=>e.preventDefault()} className="flex flex-col gap-60 items-center justify-center h-dvh">
      <StartIcon cardSize={50} radius={3} gap={3} className="animate-pulse" />

      <div className="flex flex-col gap-5 items-center">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
};

export default Boot;
