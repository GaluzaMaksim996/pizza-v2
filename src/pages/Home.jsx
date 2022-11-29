import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/Skeleton';
import Sort, { sortList } from '../components/Sort';
import { setFilters } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentPage = useSelector((state) => state.filter.currentPage);
  const { activeCategory, activeSort } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = activeCategory ? `category=${activeCategory}` : '';
    const sortType = activeSort.sortProperty.replace('-', '');
    const order = activeSort.sortProperty.includes('-') ? 'desc' : 'asc';
    axios
      .get(
        `https://636fc345bb9cf402c81f2e03.mockapi.io/items/?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}&search=${searchValue}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      params.activeSort = sortList.find((obj) => obj.sortProperty === params.activeSort);

      dispatch(setFilters(params));

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [activeCategory, activeSort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeSort: activeSort.sortProperty,
        activeCategory,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [activeCategory, activeSort.sortProperty, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
};

export default Home;
