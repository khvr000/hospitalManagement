// @flow
import React, { Component, Fragment } from 'react';
import { withTheme } from 'styled-components';
import SidebarComponent from "../../components/sidebar/sidebar.component";

import './default-private-template.scss';

type Props = {
    children: any,
}

class DefaultPrivateTemplate extends Component<Props> {
    componentDidMount() {
        // document.body.style.overflowY = 'hidden';
    }

    componentWillUnmount() {
        // document.body.style.overflowY = 'initial';
    }

    render() {
        const { children, theme } = this.props;
        return (
            <Fragment>
                <div className="dat-default-private-template">
                    <SidebarComponent />
                    <div className="dat-default-private-template-content-wrapper">{children}</div>
                </div>
            </Fragment>
        );
    }
}

export default withTheme(DefaultPrivateTemplate);
