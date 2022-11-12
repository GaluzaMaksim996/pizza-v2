import { useEffect, useState } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import { Skeleton } from './components/Skeleton';
import Sort from './components/Sort';
import './scss/app.scss';

// import items from './assets/pizzas.json';

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://636fc345bb9cf402c81f2e03.mockapi.io/items`)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
  }, []);

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
          <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
