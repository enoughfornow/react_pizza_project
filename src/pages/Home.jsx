import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Index';
import { SearchContext } from '../App';

function Home() {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onClickCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setIsLoading(true);
    const search = searchValue ? `&search=${searchValue}` : '';

    // fetch(
    //   `https://62f2550618493ca21f317d6b.mockapi.io/react_project?page=${currentPage}&limit=8&${
    //     categoryId > 0 ? `category=${categoryId}` : ''
    //   }&sortBy=${sortType}&order=desc`,
    // )
    //   .then((response) => response.json())
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });
    axios.get(
      `https://62f2550618493ca21f317d6b.mockapi.io/react_project?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType}&order=desc&${search}`,
    ).then((response) => {
      setItems(response.data);  
      setIsLoading(false);
    });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage, searchValue]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategoryId={onClickCategoryId} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
