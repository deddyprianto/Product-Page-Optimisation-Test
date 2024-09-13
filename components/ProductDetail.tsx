import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PropsProductDetail {
  thumbnail: string;
  title: string;
  images: [];
  brand: string;
  price: number;
  description: string;
  rating: string;
  stock: string;
  category: string;
  discountPercentage: string;
}
const ProductDetail: React.FC<PropsProductDetail> = ({
  thumbnail,
  title,
  images,
  brand,
  price,
  description,
  rating,
  stock,
  category,
  discountPercentage,
}) => {
  return (
    <div className='max-w-4xl mx-auto p-4'>
      <Link href='/'>
        <div className='font-bold cursor-pointer my-6'>Back</div>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='space-y-4'>
          <Image
            width={500}
            height={500}
            src={thumbnail}
            alt={title}
            className='w-full h-auto object-cover rounded-lg shadow-lg'
          />
          <div className='grid grid-cols-4 gap-2'>
            {images.slice(0, 4).map((image, index) => (
              <Image
                width={400}
                height={400}
                key={index}
                src={image}
                alt={`${title} - Image ${index + 1}`}
                className='w-full h-20 object-cover rounded-md cursor-pointer hover:opacity-75 transition'
              />
            ))}
          </div>
        </div>
        <div className='space-y-4'>
          <h1 className='text-3xl font-bold'>{title}</h1>
          <p className='text-xl text-gray-600'>{brand}</p>
          <div className='flex items-center space-x-2'>
            <span className='text-2xl font-bold'>${price}</span>
            <span className='text-lg text-green-600'>
              {discountPercentage}% OFF
            </span>
          </div>
          <p className='text-gray-700'>{description}</p>
          <div className='space-y-2'>
            <p>
              <strong>Category:</strong> {category}
            </p>
            <p>
              <strong>Rating:</strong> {rating} / 5
            </p>
            <p>
              <strong>Stock:</strong> {stock} units
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
