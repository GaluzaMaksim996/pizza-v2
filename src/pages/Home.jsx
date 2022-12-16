import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/Skeleton';
import Sort, { sortList } from '../components/Sort';
import { setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/slices/asyncActions';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const currentPage = useSelector((state) => state.filter.currentPage);
  const { items, status } = useSelector((state) => state.pizza);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const { categoryId, sort } = useSelector((state) => state.filter);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const getPizzas = async () => {
    const category = categoryId ? `category=${categoryId}` : '';
    const sortType = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';

    dispatch(
      fetchPizzas({
        category,
        sortType,
        order,
        currentPage,
        searchValue,
      }),
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      params.sort = sortList.find((obj) => obj.sortProperty === params.sort);

      dispatch(setFilters(params));

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <>
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
          <Pagination />
        </>
      )}
    </div>
  );
};

export default Home;
