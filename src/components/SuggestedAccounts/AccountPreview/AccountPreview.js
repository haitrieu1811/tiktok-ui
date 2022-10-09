import PropTypes from 'prop-types';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';

const cx = className.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1665471600&x-signature=IXwldI3xV1qoxEAfPDi1KXGn6qg%3D"
                    alt=""
                />
                <Button className={cx('follow-btn')} primary>
                    Follow
                </Button>
            </div>
            <div className={cx('body')}>
                <h4 className={cx('nickname')}>
                    <strong>theanh28entertainment</strong>
                    <FontAwesomeIcon icon={faCheckCircle} className={cx('tick')} />
                </h4>
                <p className={cx('name')}>Theanh28 Entertainment</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>7.6M</strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>524.4M</strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {};

export default AccountPreview;
