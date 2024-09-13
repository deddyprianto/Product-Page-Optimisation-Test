import ProductDetail from '@/components/ProductDetail';

interface ProductPageParams {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const responseData = await fetch('https://dummyjson.com/products');
  const responseJson = await responseData.json();
  if (!Array.isArray(responseJson?.products)) {
    return [];
  }

  return responseJson?.products.map((product: { id: string }) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return res.json();
}

export default async function ProductPage({
  params,
}: Readonly<ProductPageParams>) {
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
}
