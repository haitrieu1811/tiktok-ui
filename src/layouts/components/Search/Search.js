import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import { SearchIcon, XmarkIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hook';
import * as searchServices from '~/services/searchService';
import styles from './Search.module.scss';
import SearchResult from './SearchResult';

const cx = classNames.bind(styles);

function Search() {
    const searchRef = useRef();

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showRessult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debouncedValue);

            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

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
        <div>
            <HeadlessTippy
                visible={searchResult.length > 0 && showRessult}
                interactive={true}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            <SearchResult data={searchResult} />
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
        </div>
    );
}

export default Search;
