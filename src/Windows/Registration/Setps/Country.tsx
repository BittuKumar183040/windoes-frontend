import { useState } from 'react';
import countries from '../../../assets/countries.json'
import Select from '../../../components/ui/input/Select';

const Country = ({ onNext }: { onNext: () => void }) => {

  const [country, setCountry] = useState("India");

  return (
    <div className="flex flex-wrap h-full w-full">
      <div className="w-1/2 flex items-center justify-center opacity-80 z-10">
        <img src="/signup/earth.png" />
      </div>

      <div className="w-1/2 flex flex-col gap-8 h-full justify-between">
        <p className=' text-2xl font-bold text-black'>Is this the right country or region?</p>
        <Select
          items={countries}
          value={country}
          placeholder="Select your country"
          onSelect={setCountry}
          className="overflow-scroll flex-1"
        />
        <div className=' flex justify-end'>
          <button className=' p-4 px-18 text-xl rounded-lg shadow-xl bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium w-fit'
            onClick={onNext}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default Country;
