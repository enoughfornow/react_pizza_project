import React, { useState } from "react"

function Categories() {

  const [activeIndex, setActiveIndex] = React.useState(0)

  const onClickCategories = (index) => {
    setActiveIndex(index);
  }
  const pizzaCategories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
    <ul>
      {pizzaCategories.map((value, index) => 
      <li onClick={() => onClickCategories(index)} className={activeIndex === index ? 'active' : ''}>
        {value}
        </li>
      )}
      
     
    </ul>
  </div>
  )
}

export default Categories