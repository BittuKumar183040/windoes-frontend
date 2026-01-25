import { CameraIcon, CircleUserRound, FolderClosed } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button, ButtonBar } from "../../../components/ui/input/Buttons";
import { uploadProfileImage } from "../../../api/user.api";
import type { User } from "../../../types/User";

type Props = {
  onChoose: (file: File) => void;
};

const ProfileImageContainer = ({ onChoose }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleFileSelect = (file?: File) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChoose(file);
  };

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  useEffect(() => {
    if (showCamera && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [showCamera, stream]);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "profile-photo.png", {
        type: "image/png",
      });

      setPreview(URL.createObjectURL(blob));
      onChoose(file);
      closeCamera();
    });
  };

  const closeCamera = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setShowCamera(false);
  };

  useEffect(() => {
    return () => closeCamera();
  }, []);

  return (
    <div className="w-full">
      <h3 className="mb-4 text-md font-semibold text-gray-700">
        Adjust you photo
      </h3>

      <div className="mb-5 flex justify-center">
        <div className=' h-60 w-60 border-4 border-gray-100/20 bg-gray-100/20 shrink-0 rounded-full overflow-hidden'>
          {preview ? <img src={preview} alt="Profile" className="h-full w-full object-cover" />
            : <CircleUserRound className='h-full w-full scale-140 text-gray-300' strokeWidth={0.5} />
          }
        </div>
      </div>

      <div className="flex text-black flex-col gap-3">
        <ButtonBar onClick={() => fileInputRef.current?.click()} Logo={FolderClosed} label="Choose a file" buttonLabel="Browse files" />
        <ButtonBar onClick={openCamera} Logo={CameraIcon} label="Take a photo" buttonLabel="Open Camera" />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files?.[0])}
      />

      {showCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-xl p-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="mb-3 h-full w-full rounded-2xl"
            />
            <canvas ref={canvasRef} className="hidden" />

            <div className="flex justify-end gap-3">
              <Button label="Cancel" type="secondary" onClick={closeCamera} />
              <Button label="Capture" type="primary" onClick={capturePhoto} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileImage = ({ onNext }: { onNext: () => void }) => {
  const [canProceed, setCanProceed] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const handleChoose = async (file: File) => {
    const user: User | null = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
    const id = user?.id;
    if(id) {
      setCanProceed(true)
      try {
        await uploadProfileImage(id, file)
      } catch (error: unknown) {
        setError(`Image Upload failed, Try again Later`)
      }
    } else {
      setError(`User: '${id}' - Not found, check storage permission`)
    }
  }

  return (
    <div className="relative flex flex-wrap h-full w-full">
      <div className="w-1/2 flex items-center justify-center opacity-80">
        <img src="/signup/profileImage.png" />
      </div>

      <div className="w-1/2 flex flex-col h-full gap-8 justify-center">
        <p className=' text-2xl font-bold text-black'>Give you Account a Face.</p>
        <div className=" overflow-auto flex-1">
          <ProfileImageContainer onChoose={handleChoose} />
          <p className={` text-sm text-red-500 ${!error && " invisible"}`}></p>
        </div>

        <div className=' flex gap-6 justify-end'>
          <button className=' text-xl text-blue-600' onClick={onNext}>Skip for now</button>
          <button
            disabled={!canProceed}
            className={`p-4 px-16 text-xl rounded-lg shadow-xl text-white font-medium
              ${canProceed
                ? "bg-linear-to-r from-blue-500 to-blue-600"
                : "bg-gray-400 cursor-not-allowed"
              }`}
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
