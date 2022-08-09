import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import './scss/app.scss';
import React from 'react';

function App() {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    fetch('https://62f2550618493ca21f317d6b.mockapi.io/react_project')
    .then((response) => response.json())
    .then((arr) => {
      setItems(arr)
    })
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
