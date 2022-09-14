import { Fragment, useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

export default function QuoteDetails() {
    const match = useRouteMatch();
    const params = useParams();
    const { quoteId } = params;
    const {
        sendRequest,
        status,
        data: loadedQuote,
        error,
    } = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status === 'pending') {
        return (
            <div className='centeres'>
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className='centered'>{error}</p>;
    }

    if (!loadedQuote.text) {
        return <p>No Quote Found</p>;
    }
    return (
        <Fragment>
            <HighlightedQuote
                text={loadedQuote.text}
                author={loadedQuote.author}
            />
            <Route //nested routes
                path={`${match.path}`}
                exact
            >
                <div className='centered'>
                    <Link
                        to={`${match.url}/comments`}
                        className='btn--flat'
                    >
                        Load Comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    );
}
