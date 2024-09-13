'use client';
import { useState } from 'react';
import useSWR from 'swr';
import FilterSort from './FilterSort';
import Pagination from './Pagination';
import ProductList from './ProductList';

export default function ItemProducts() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const pageSize = 10;

  const { data, error } = useSWR(
    `https://dummyjson.com/products?limit=${pageSize}&skip=${
      (currentPage - 1) * pageSize
    }${category ? `&category=${category}` : ''}&sort=price&order=${sortOrder}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-3xl font-bold my-4'>Product List</h1>
      <FilterSort onCategoryChange={setCategory} onSortChange={setSortOrder} />
      <ProductList products={data.products} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.total / pageSize)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
