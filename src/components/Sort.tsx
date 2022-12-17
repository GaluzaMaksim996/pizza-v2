import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from '../redux/filter/selectors';
import { setSort } from '../redux/filter/slice';
import { Sort as SortType,SortPropertyEnum } from '../redux/filter/types';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

type SortPopupProps = {
  value: SortType;
};

export const sortList: SortItem[] = [
  { name: 'популярности возр', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности убыв', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'цене возр', sortProperty: SortPropertyEnum.PRICE_DESC  },
  { name: 'цене убыв', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту возр', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту убыв', sortProperty: SortPropertyEnum.TITLE_ASC },
];

const Sort: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {sort} = useSelector(selectFilter);
  const dispatch = useDispatch();

  const sortRef = useRef<HTMLDivElement>(null);

  const onClickSort = (obj: SortItem) => {
    dispatch(setSort(obj));
    setIsOpen(false);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const _event = e as PopupClick
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', onClickOutside);

    return () => document.body.removeEventListener('click', onClickOutside);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sort.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickSort(sort)}
                className={obj.sortProperty === sort.sortProperty ? 'active' : ''}
              >
                {sort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
