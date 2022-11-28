import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentPage = useSelector((state) => state.pagination.currentPage);
  const { activeCategory, activeSort } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  useEffect(() => {
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
  }, [activeCategory, activeSort.sortProperty, searchValue, currentPage]);

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
