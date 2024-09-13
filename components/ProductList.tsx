'use client';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  const router = useRouter();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {products.map((product) => (
        <div
          key={product.id}
          className='border p-4 rounded-lg cursor-pointer'
          onClick={() => {
            router.push(`/productdetail/${product.id}`);
          }}
        >
          <Image
            width={400}
            height={400}
            src={product.thumbnail}
            alt={product.title}
            className='w-full h-48 object-cover mb-2'
          />
          <h2 className='text-xl font-semibold'>{product.title}</h2>
          <p className='text-gray-600'>{product.description}</p>
          <p className='text-lg font-bold mt-2'>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
