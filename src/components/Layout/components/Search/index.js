import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import * as searchServices from '~/apiServices/searchServices';
import AccountItem from '~/components/AccountItem';
import { SearchIcon, XmarkIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hook';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const searchRef = useRef();

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showRessult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounced);

            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounced]);

    const handleClearInput = () => {
        setSearchValue('');
        setSearchResult([]);
        searchRef.current.focus();
    };

    const handleShowResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <HeadlessTippy
            visible={searchResult.length > 0 && showRessult}
            interactive={true}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((data) => (
                            <AccountItem key={data.id} data={data} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleShowResult}
        >
            <div className={cx('search')}>
                <input
                    ref={searchRef}
                    value={searchValue}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                />
                <button className={cx('clear')} onClick={handleClearInput}>
                    {searchValue && !loading && <XmarkIcon width="1.467rem" height="1.467rem" />}
                </button>
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <SearchIcon width="2.4rem" height="2.4rem" />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
