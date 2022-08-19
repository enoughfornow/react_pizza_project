import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategoryId: (index: number) => void;
};
const pizzaCategories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategoryId }) => {
  return (
    <div className="categories">
      <ul>
        {pizzaCategories.map((categoryName, index) => (
          <li
            key={categoryName}
            onClick={() => onClickCategoryId(index)}
            className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categories;
