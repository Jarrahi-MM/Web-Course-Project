import React, {Component} from 'react';
import {Link} from "react-router-dom";
import logo from '../logo.png'
import styled from "styled-components";
import SearchBox from "./searchbox";
import ChannelDD from "./ChannelsDD";

const Img = styled.img`
max-width: 20%;
`;

class Navbar extends Component {
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
                        <ChannelDD/>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;