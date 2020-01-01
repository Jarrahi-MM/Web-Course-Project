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
import {useMediaQuery} from "@material-ui/core";

const Img = styled.img`
max-width: 20%;
margin-right: 3%;
`;

class Navbar extends Component {
    onAlertsClick = (e) => {
    };

    onProfileClick = (e) => {
    };

    onSmallSearchClick = (e) => {

    };

    render() {
        return (
            <div>
                <nav className="navbar navbar-light shadow-sm rounded">
                    <div className="container-lg">
                        <div className={'text-center'}>
                            <Link to={'/'} className="navbar-brand">
                                <MediaQuery minWidth={750}>
                                    <Img src={logo} alt={'website logo'}/>
                                    Project
                                </MediaQuery>
                            </Link>
                        </div>
                        <div className={'text-center'}>
                            <MediaQuery minWidth={586}>
                                <SearchBox onSub/>
                            </MediaQuery>
                            <MediaQuery maxWidth={585}>
                                <IconButton onClick={this.onSmallSearchClick}>
                                    <SearchIcon fontSize={"large"}/>
                                </IconButton>
                            </MediaQuery>
                        </div>
                        <div className={'text-center'}>
                            <MediaQuery minWidth={435}>
                                <ChannelDD compact={false}/>
                            </MediaQuery>
                            <MediaQuery maxWidth={434}>
                                <ChannelDD compact={true}/>
                            </MediaQuery>
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