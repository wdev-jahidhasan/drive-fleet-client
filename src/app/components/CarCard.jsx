import Image from "next/image";

const CarCard = ({car}) => {
  const {capacity, carType, company, description, fuelType, imageUrl, location, model, price, transmission, _id} = car;
  return (
    <div>
      <Image
      alt={model}
      src={imageUrl}
      width={400}
      height={400}
      >

      </Image>
    </div>
  );
};

export default CarCard;