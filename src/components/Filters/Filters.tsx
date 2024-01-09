import { useCallback, useState } from 'react';
import './Filters.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/getSearchWith';
import { SortValues } from '../../types/SortValues';
import { SortTitles } from '../../types/SortTitles';
import { SortParam } from '../../types/SortParams';

const SortParams: SortParam[] = [
  {
    name: SortTitles.age,
    value: SortValues.age,
  },

  {
    name: SortTitles.price,
    value: SortValues.price,
  },

  {
    name: SortTitles.name,
    value: SortValues.name,
  },
];

const PerPageValue = ['16', '8', '4', 'All'];

export const Filters = () => {
  const [searchParams] = useSearchParams();

  const sortValue = searchParams.get('sort') || SortValues.age;

  const perPage = searchParams.get('perPage') === 'all'
    ? 'All'
    : (Number(searchParams.get('perPage')) || 16);

  const sortQuery = SortParams.find(param => param.value === sortValue)?.name;

  const [isSortListOpened, setIsSortListOpened] = useState(false);
  const [isPerPageListOpened, setIsPerPageListOpened] = useState(false);

  const handleBlur = useCallback(
    (callback: React.Dispatch<React.SetStateAction<boolean>>) => {
      setTimeout(() => {
        callback(false);
      }, 150);
    }, [],
  );

  const handleOnClick = (param: string, value: string | number) => {
    return getSearchWith(searchParams, param, value).toString();
  };

  return (
    <div className="filters filters--margin-top-40">
      <div className="filters__wrapper">
        <p className="filters__caption">
          Sort by
        </p>

        <div className="filters__input-wrapper">
          <input
            type="text"
            className="filters__input"
            onFocus={() => setIsSortListOpened(true)}
            onBlur={() => handleBlur(setIsSortListOpened)}
            value={sortQuery}
            readOnly
          />

          <svg
            className="filters__input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.4714 5.52864C12.7317 5.78899 12.7317 6.2111 12.4714
                6.47145L8.47136 10.4714C8.21101 10.7318 7.7889 10.7318
                7.52855 10.4714L3.52855 6.47144C3.2682 6.2111 3.2682
                5.78899 3.52855 5.52864C3.7889 5.26829 4.21101 5.26829
                4.47136 5.52864L7.99996 9.05723L11.5286 5.52864C11.7889
                5.26829 12.211 5.26829 12.4714 5.52864Z"
              fill="#B4BDC4"
            />
          </svg>

          {isSortListOpened && (
            <ul className="filters__dropdown">
              {SortParams.map(param => (
                <li className="filters__dropdown-item" key={param.name}>
                  <Link
                    className="filters__dropdown-link"
                    to={{ search: handleOnClick('sort', param.value) }}
                  >
                    {param.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

      <div className="filters__wrapper">
        <p className="filters__caption">
          Items on page
        </p>

        <div className="filters__input-wrapper">
          <input
            type="text"
            className="filters__input filters__input--short"
            onFocus={() => setIsPerPageListOpened(true)}
            onBlur={() => handleBlur(setIsPerPageListOpened)}
            value={perPage}
            readOnly
          />

          <svg
            className="filters__input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.4714 5.52864C12.7317 5.78899 12.7317 6.2111 12.4714
                6.47145L8.47136 10.4714C8.21101 10.7318 7.7889 10.7318
                7.52855 10.4714L3.52855 6.47144C3.2682 6.2111 3.2682
                5.78899 3.52855 5.52864C3.7889 5.26829 4.21101
                5.26829 4.47136 5.52864L7.99996 9.05723L11.5286
                5.52864C11.7889 5.26829 12.211 5.26829 12.4714
                5.52864Z"
              fill="#B4BDC4"
            />
          </svg>

          {isPerPageListOpened && (
            <ul className="filters__dropdown">
              {PerPageValue.map(param => (
                <li className="filters__dropdown-item" key={param}>
                  <Link
                    className="filters__dropdown-link"
                    to={
                      { search: handleOnClick('perPage', param.toLowerCase()) }
                    }
                  >
                    {param}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
