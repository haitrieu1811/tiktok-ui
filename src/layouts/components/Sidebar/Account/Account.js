import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import AccountItem from './AccountItem';
import styles from './Account.module.scss';

const cx = classNames.bind(styles);

function Account({ headingTitle, data, viewOption, loading }) {
    return (
        <>
            <div className={cx('wrapper')}>
                <h4 className={cx('heading')}>{headingTitle}</h4>
                {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />}
                {data.map((result) => (
                    <AccountItem
                        key={result.id}
                        avatar={result.avatar}
                        fullname={result.full_name}
                        username={result.nickname}
                    />
                ))}
                {viewOption && !loading && (
                    <Link to="/see-all" className={cx('view-option')}>
                        {viewOption}
                    </Link>
                )}
            </div>
        </>
    );
}

Account.propTypes = {
    headingTitle: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    viewOther: PropTypes.string,
};

export default Account;
