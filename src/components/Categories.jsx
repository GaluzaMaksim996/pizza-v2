const Categories = ({activeCategory, setActiveCategory}) => {

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return (
            <li
              key={i}
              className={activeCategory === i ? 'active' : ''}
              onClick={() => setActiveCategory(i)}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
