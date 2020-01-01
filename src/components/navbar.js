import React, {Component} from 'react';
import {Link} from "react-router-dom";
import logo from '../logo.png'
import styled from "styled-components";
import SearchBox from "./searchbox";
import ChannelDD from "./ChannelsDD";
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MediaQuery from "react-responsive/src/Component";
import SearchIcon from '@material-ui/icons/Search';

const Img = styled.img`
max-width: 20%;
margin-right: 3%;
`;

class Navbar extends Component {
    onAlertsClick = (e) => {
    };

    onProfileClick = (e) => {
    };

    onSearchClick = (e) => {

    };

    render() {
        return (
            <div>
                <nav className="navbar navbar-light shadow-sm rounded">
                    <div className="container">
                        <div>
                            <Link to={'/'} className="navbar-brand">
                                <MediaQuery minWidth={850}>
                                    <Img src={logo} alt={'website logo'}/>
                                    Project
                                </MediaQuery>
                            </Link>
                        </div>
                        <div>
                            <MediaQuery minWidth={510}>
                                <SearchBox/>
                            </MediaQuery>
                            <MediaQuery maxWidth={510}>
                                <IconButton onClick={this.onSearchClick}>
                                    <SearchIcon fontSize={"large"}/>
                                </IconButton>
                            </MediaQuery>
                        </div>
                        <div>
                            <ChannelDD/>
                            <IconButton onClick={this.onAlertsClick}>
                                <Badge badgeContent={1} color={'secondary'}>
                                    <NotificationsNoneIcon fontSize={"large"}/>
                                </Badge>
                            </IconButton>
                            <IconButton onClick={this.onProfileClick}>
                                <PermIdentityIcon fontSize={"large"}/>
                            </IconButton>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;