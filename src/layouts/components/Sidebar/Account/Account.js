import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AccountItem from './AccountItem';

function Account({ headingTitle, data, viewOther }) {
    return (
        <>
            <div>
                <h4>{headingTitle}</h4>
                {data.map((result) => (
                    <AccountItem
                        key={result.id}
                        avatar={result.avatar}
                        fullname={result.full_name}
                        username={result.nickname}
                    />
                ))}
                {viewOther && <Link to="/see-all">viewOther</Link>}
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
