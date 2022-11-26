import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState({name: 'популярности', sortProperty: 'rating'});



  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  useEffect(() => {
    setIsLoading(true);

    const category = activeCategory ? `category=${activeCategory}` : '';
    const sortType = activeSort.sortProperty.replace('-', '');
    const order = activeSort.sortProperty.includes('-') ? 'desc' : 'asc';

 
    fetch(`https://636fc345bb9cf402c81f2e03.mockapi.io/items/?${category}&sortBy=${sortType}&order=${order}`)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
  }, [activeCategory, activeSort.sortProperty]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <Sort activeSort={activeSort} setActiveSort={setActiveSort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};

export default Home;