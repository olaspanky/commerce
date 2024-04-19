import Image from 'next/image';
import locationIcon from '../../../public/assets/location-icon.svg';

const LocationCarousel = () => {
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia',
    // ... (add all countries here)
  ];

  return (
    <div className="flex flex-col items-center">
      
      <div className="grid grid-cols-3 gap-4">
        {countries.map((country, index) => (
            <div>
            <div className="mb-4 bg-flex">
            <Image src={locationIcon} alt="Location Icon" width={50} height={50} />
            <h2 className="mt-2 text-xl font-semibold">Location</h2>
          </div>
          <span key={index} className="text-center">{country}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationCarousel;
