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

const Img = styled.img`
max-width: 20%;
`;

class Navbar extends Component {
    onAlertsClick = (e) => {
    };

    onProfileClick = (e) => {
    };

    render() {
        return (
            <div>
                <nav className="navbar navbar-light shadow-sm rounded">
                    <div className="container">
                        <Link to={'/'}>
                            <Img src={logo} alt={'website logo'}/>
                            <span className="navbar-brand ml-2">Project</span>
                        </Link>
                        <SearchBox/>
                        <div className="col-2">
                            <ChannelDD/>
                        </div>
                        <div>
                            <IconButton onClick={this.onAlertsClick}>
                                <Badge badgeContent={4} color={'secondary'}>
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