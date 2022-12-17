import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId } from '../redux/filter/slice';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC = () => {
  const {categoryId} = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return (
            <li
              key={i}
              className={categoryId === i ? 'active' : ''}
              onClick={() => dispatch(setCategoryId(i))}
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
