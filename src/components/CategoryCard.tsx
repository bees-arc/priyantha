import React from 'react';
import Link from 'next/link';
import { ArrowRight, Refrigerator, Tv, Bike, Bed, ShoppingBag } from 'lucide-react';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  productCount?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, productCount }) => {
  const getIcon = (name?: string) => {
    switch (name) {
      case 'Refrigerator':
        return <Refrigerator className="w-6 h-6 text-[#14213d]" />;
      case 'Tv':
        return <Tv className="w-6 h-6 text-[#14213d]" />;
      case 'Bike':
        return <Bike className="w-6 h-6 text-[#14213d]" />;
      case 'Bed':
        return <Bed className="w-6 h-6 text-[#14213d]" />;
      default:
        return <ShoppingBag className="w-6 h-6 text-[#14213d]" />;
    }
  };

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-[#14213d]/30 card-hover-elevation transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-[#14213d] transition-colors">
          <div className="group-hover:text-white transition-colors">
            {getIcon(category.iconName)}
          </div>
        </div>

        {productCount !== undefined && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            {productCount} {productCount === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#14213d] transition-colors">
        {category.name}
      </h3>

      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
        {category.description}
      </p>

      {/* Subcategory labels */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100">
          {category.subcategories.slice(0, 3).map((sub) => (
            <span
              key={sub.slug}
              className="text-[10px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100"
            >
              {sub.name}
            </span>
          ))}
          {category.subcategories.length > 3 && (
            <span className="text-[10px] text-slate-400 self-center">
              +{category.subcategories.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="mt-4 pt-2 flex items-center gap-1.5 text-xs font-bold text-[#14213d] group-hover:translate-x-1 transition-transform">
        <span>Browse Products</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
};
