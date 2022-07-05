import { memo } from 'react';
import AccountItem from '~/components/AccountItem';

function SearchResult({ data }) {
    return data.map((result) => <AccountItem key={result.id} data={result} />);
}

export default memo(SearchResult);
