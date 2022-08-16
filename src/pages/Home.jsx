import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Index';
import { SearchContext } from '../App';

function Home() {
  const navigate = useNavigate();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const sortType = sort.sortProperty;
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const fetchItems = () => {
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
    axios
      .get(
        `https://62f2550618493ca21f317d6b.mockapi.io/react_project?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType}&order=desc&${search}`,
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
  };

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // при первом рендере нельзя вшивать параметры в URL
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    // после первого рендера вшиваем параметры в URL
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // если был первый рендер, то проверяем параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // если был первый рендер, то запрашиваем айтемы с сервера
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchItems();
    }

    isSearch.current = false;
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
