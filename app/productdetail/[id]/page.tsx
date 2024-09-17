import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';

interface ProductPageParams {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    const response = await fetch('https://dummyjson.com/products', {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    if (!Array.isArray(data?.products)) return [];

    return data.products.map((product: { id: string }) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 3600 },
    headers: {
      Accept: 'application/json',
      'User-Agent': 'NextJS 14 App',
    },
  });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error(`Failed to fetch product. Status: ${res.status}`);
  }

  return res.json();
}

export default async function ProductPage({
  params,
}: Readonly<ProductPageParams>) {
  try {
    const product = await getProduct(params.id);
    return (
      <ProductDetail
        brand={product.brand}
        category={product.category}
        description={product.description}
        discountPercentage={product.discountPercentage}
        images={product.images}
        price={product.price}
        rating={product.rating}
        stock={product.stock}
        thumbnail={product.thumbnail}
        title={product.title}
      />
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return <div>Failed to load product. Please try again later.</div>;
  }
}
