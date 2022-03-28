// @flow
import * as React from 'react';
import styled, { withTheme } from 'styled-components';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import './sidebar-menu-item.component.scss';

const SidebarMenuItemComponentSC = styled(NavLink)`
    background: transparent;
    border: none;
    color: ${props => props.theme.textLabel.default.flat.default.color};

    &:hover:not(:disabled) {
        background-color: ${props => props.theme.textLabel.default.flat.hover.backgroundColor};
    }

    &:disabled {
        color: ${props => props.theme.textLabel.default.flat.disabled.color};

        .dat-sidebar-menu-item-icon {
            color: ${props => props.theme.textLabel.default.flat.disabled.color};
        }
    }

    .dat-sidebar-menu-item-icon {
      color: ${props => props.theme.textColor.default.contrast3};
    }

    .dat-sidebar-menu-item-selected-notch {
            background-color: ${props => props.theme.textColor.default.contrast1};
    }

    &.active {
          background-color: ${props => props.theme.textLabel.default.flat.hover.backgroundColor};
         color: ${props => props.theme.textColor.default.contrast1};

        .dat-sidebar-menu-item-icon {
          color: ${props => props.theme.textColor.default.contrast1};
        }

        .dat-sidebar-menu-item-title {
            color: ${props => props.theme.textColor.default.contrast1};
            font-weight: 500;
        }
    }
`;

type Props = {
    /**
     * Theme for the component. Default theme is consumed from styled components theme
     */
    theme?: any,
    /**
     * Icon for the menu item
     */
    icon?: string | React.Node,
    /**
     * Title for the menu item
     */
    title?: string | number,
    /**
     * Custom class name for the component
     */
    className?: string,
    /**
     * Custom class name for the menu item
     */
    buttonClassName?: string,
    /**
     * If set to `true`, marks the item as active
     */
    active?: boolean,
    /**
     * If set to `true`, disables menu item
     */
    disabled?: boolean,
    /**
     * URL to go to when clicked on the menu item
     */
    url?: string | Object,
    /**
     * Component host element type
     */
    as?: string,
    /**
     * Icon to render on the right side of the menu item
     */
    suffixIcon?: string | React.Node,
    divider?: boolean,
    header?: boolean,
    hasSubMenu?: boolean,
    children?: React.Node | string,
    name: string,
};

/**
 * Navigation Menu Item for the Sidebar
 * @visibleName SidebarMenuItemComponent
 */
const SidebarMenuItemComponent = (props: Props) => {
    const { icon, title, className, buttonClassName, active, theme, disabled, url = '', as, suffixIcon, divider, header, children, name, hasSubMenu, ...additionalProps } = props;

    if (divider) {
        return (
            <div
                className={classNames("dat-sidebar-menu-item-container divider", className)}
                css={`border-bottom: 1px solid ${theme.paper.borderColor};`}
            />
        )
    }

    if (header) {
        return (
            <div
                className={classNames("dat-sidebar-menu-item-container header", className)}
                css={`color: ${theme.textColor.default.contrast3};`}
            >{children}</div>
        )
    }

    return (
        <React.Fragment>
            <div
                className={classNames('dat-sidebar-menu-item-container', className)}
            >
                <SidebarMenuItemComponentSC
                    className={classNames("dat-sidebar-menu-button", buttonClassName, { active })}
                    activeClassName="active"
                    to={url}
                    disabled={disabled}
                    as={as}
                    title={title}
                    {...additionalProps}
                >
                    {/*<div className="dat-sidebar-menu-item-selected-notch" />*/}

                    {icon ? (
                        <div className="dat-sidebar-menu-item-icon">
                            {typeof icon === 'string' ? (<i className="material-icons-outlined">{icon}</i>) : icon}
                        </div>
                    ) : null}
                    <div className="dat-sidebar-menu-item-title">{name}</div>
                </SidebarMenuItemComponentSC>

            </div>
        </React.Fragment>
    );
};

SidebarMenuItemComponent.displayName = 'SidebarMenuItemComponent';

export default withTheme(SidebarMenuItemComponent);
