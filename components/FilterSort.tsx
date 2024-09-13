type Props = {
  onCategoryChange: (category: string) => void;
  onSortChange: (order: string) => void;
};

export default function FilterSort({ onCategoryChange, onSortChange }: Props) {
  return (
    <div className='mb-4 flex space-x-4'>
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        className='border p-2 rounded'
      >
        <option value=''>All Categories</option>
        <option value='smartphones'>Smartphones</option>
        <option value='laptops'>Laptops</option>
      </select>
      <select
        onChange={(e) => onSortChange(e.target.value)}
        className='border p-2 rounded'
      >
        <option value='asc'>Price: Low to High</option>
        <option value='desc'>Price: High to Low</option>
      </select>
    </div>
  );
}
