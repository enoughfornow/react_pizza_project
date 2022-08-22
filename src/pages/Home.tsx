import React from 'react';

import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import Categories from '../components/Categories';
import Sort, { list } from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Index';

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/items/selectors';
import { fetchPizzas } from '../redux/items/asyncActions';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const sortType = sort.sortProperty;
  const isMounted = React.useRef(false);

  const fetchItems = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        search,
        currentPage: String(currentPage),
        categoryId,
        sortType,
      }),
    );

    window.scrollTo(0, 0);
  };

  const onClickCategoryId = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // при первом рендере нельзя вшивать параметры в URL
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   // после первого рендера вшиваем параметры в URL
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  // если был первый рендер, то проверяем параметры и сохраняем в редаксе
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = list.find((obj) => obj.sortProperty === params.sortType);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: params.categoryId,
  //         currentPage: Number(params.currentPage),
  //         sort: sort || list[0],
  //       }),
  //     );
  //   }
  //   isMounted.current = true;
  // }, []);

  // если был первый рендер, то запрашиваем айтемы с сервера
  React.useEffect(() => {
    fetchItems();
  }, [categoryId, sortType, currentPage, searchValue]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategoryId={onClickCategoryId} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Невозможно найти информацию связанную с вашим запросом.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
