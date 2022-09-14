import { Fragment } from 'react';

import classes from './Layout.module.css';
import MainNavgation from './MainNavgation';

export default function Layout(props) {
    // as a wrapper component
    return (
        <Fragment>
            <MainNavgation />
            <main className={classes.main}> {props.children}</main>
        </Fragment>
    );
}
