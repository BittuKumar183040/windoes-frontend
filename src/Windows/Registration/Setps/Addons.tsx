const Addons = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="flex h-full w-full">
      <div className="w-1/2 flex items-center justify-center">
        <img src="/illustrations/country.svg" />
      </div>

      <div className="w-1/2 flex flex-col justify-center gap-4">
        <p>Choose Your Preference</p>
        <button onClick={onNext}>Select</button>
      </div>
    </div>
  );
};

export default Addons;
