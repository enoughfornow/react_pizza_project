import React from "react"

function Categories({ value, onClickCategoryId}) {

  // const [activeIndex, setActiveIndex] = React.useState(0)

  // const onClickCategories = (index) => {
  //   setActiveIndex(index);
  // }
  const pizzaCategories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
    <ul>
      {pizzaCategories.map((categoryName, index) => 
      <li key={categoryName} onClick={() => onClickCategoryId(index)} className={value === index ? 'active' : ''}>
        {categoryName}
        </li>
      )}
    </ul>
  </div>
  )
}

export default Categories