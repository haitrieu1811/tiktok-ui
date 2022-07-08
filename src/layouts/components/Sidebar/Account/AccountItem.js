import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { TickIcon } from '~/components/Icons';
import Image from '~/components/Image';
import styles from './Account.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ avatar, fullname, username }) {
    return (
        <Link to={`/@${username}`} className={cx('account-item')}>
            <Image src={avatar} className={cx('avatar')} />
            <div className={cx('info')}>
                <h4 className={cx('username')}>
                    {username} <span className={cx('tick')}>{<TickIcon width="1.4rem" height="1.4rem" />}</span>
                </h4>
                <span className={cx('fullname')}>{fullname}</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    avatar: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
};

export default AccountItem;
