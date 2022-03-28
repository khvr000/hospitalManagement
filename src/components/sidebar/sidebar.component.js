import * as React from "react";
import SidebarMenuItemComponent from "./sidebar-menu-item/sidebar-menu-item.component";
import "./sidebar.scss";


type Props = {

}

class SidebarComponent extends React.Component<Props> {
    render() {
        const dashboardUrl = '/dashboard';
        const admitFormUrl = '/admitForm';
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
