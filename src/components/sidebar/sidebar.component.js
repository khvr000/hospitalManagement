import * as React from "react";
import SidebarMenuItemComponent from "./sidebar-menu-item/sidebar-menu-item.component";
import IconButton from '@mui/material/IconButton';

import "./sidebar.scss";
import {NavLink} from "react-router-dom";




type Props = {

}

class SidebarComponent extends React.Component<Props> {

    // mediaQuery = '(max-width: 700px)';
    // this.mediaQueryList = window.matchMedia(this.mediaQuery);
    // this.mediaQueryList.addEventListener('change', event => {
    //     console.log(window.innerWidth);
    // });


    handleDashboardClick = () => {
        const dashboardUrl = '/dashboard';
        // this.props.h
        console.log(' handleDashboardClick handleDashboardClick');
    }

    render() {
        console.log('rendering side  bar rendering side  bar ');
        const dashboardUrl = '/dashboard';
        const admitFormUrl = '/admitForm';
        const mql = window.matchMedia('(max-width: 768px)');
        let mobileView = mql.matches;
        if (mobileView) {
            return (
                <div className="dat-sidebar-container">
                    <div className="dat-sidebar-logo-container">
                        <div onClick={this.handleDashboardClick}>
                            <i className="material-icons-outlined">menu</i>
                        </div>
                    </div>

                    <NavLink to={dashboardUrl} className="sidebar-mobile-icon">
                        <div onClick={this.handleDashboardClick}>
                            <i className="material-icons-outlined">dashboard</i>
                        </div>
                    </NavLink>

                    <NavLink  to={admitFormUrl} className="sidebar-mobile-icon">
                        <div onClick={this.handleDashboardClick}>
                            <i className="material-icons-outlined">format_list_bulleted</i>
                        </div>
                    </NavLink>
                </div>
            )
        }
        return (
            <div className="dat-sidebar-container">
                <div className="dat-sidebar-logo-container">
                    Logo & Hospital Name
                </div>
                <div className="dat-sidebar-menu-item-list-wrapper">
                    <SidebarMenuItemComponent
                        icon={<span className="dat-icon dat-calibration" />}
                        name="Dashboard"
                        url={dashboardUrl}
                        isActive={(match, location) => {
                            return match || location.pathname.includes('/dashboard');
                        }}
                    />
                    <SidebarMenuItemComponent
                        icon={<span className="dat-icon dat-calibration" />}
                        name="Admit Form"
                        url={admitFormUrl}
                        isActive={(match, location) => {
                            return match || location.pathname.includes('/admitForm');
                        }}
                    />
                </div>

            </div>
        );
    }
}

export default SidebarComponent;
