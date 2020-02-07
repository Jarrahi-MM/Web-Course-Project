import React, {Component} from 'react';
import {Tab, Menu, Loader} from 'semantic-ui-react'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import InfiniteScroll from 'react-infinite-scroller';
import MediaQuery from "react-responsive/src/Component";
import {FOLLOWED_TAB, HOTTEST_TAB, LATEST_TAB, PARTICIPATED_TAB} from "../redux/action_creators/types";
import {connect} from "react-redux";
import {loadMoreItems, setActiveTab} from "../redux/action_creators/homepageActions";
import PostCard from "./posts/PostCard";
import nextId from "react-id-generator";
import NoContent from "./NoContent";

class Homepage extends Component {
    panes = [
        {
            menuItem: (
                <Menu.Item key='followed'>
                    <StarBorderIcon className={'mr-2'}/>
                    <MediaQuery minWidth={485}>
                        Followed
                    </MediaQuery>
                </Menu.Item>
            ),
            render: () => this.inTabComponent()
        },
        {
            menuItem: (
                <Menu.Item key='hottest'>
                    <WhatshotIcon className={'mr-2'}/>
                    <MediaQuery minWidth={485}>
                        Hottest
                    </MediaQuery>
                </Menu.Item>
            ),
            render: () => this.inTabComponent()
        },
        {
            menuItem: (
                <Menu.Item key='latest'>
                    <FiberNewIcon className={'mr-2'}/>
                    <MediaQuery minWidth={485}>
                        Latest
                    </MediaQuery>
                </Menu.Item>
            ),
            render: () => this.inTabComponent()
        },
        {
            menuItem: (
                <Menu.Item key='participated'>
                    <EmojiPeopleIcon className={'mr-2'}/>
                    <MediaQuery minWidth={485}>
                        Participated
                    </MediaQuery>
                </Menu.Item>
            ),
            render: () => this.inTabComponent()
        },
    ];

    onTabChange(_, tabObj) {
        let tab = null;
        switch (tabObj.activeIndex) {
            case 0:
                tab = FOLLOWED_TAB;
                break;
            case 1:
                tab = HOTTEST_TAB;
                break;
            case 2:
                tab = LATEST_TAB;
                break;
            case 3:
                tab = PARTICIPATED_TAB;
                break;
            default:
                break
        }
        this.props.setActiveTab(tab)
    }

    componentDidMount() {
        this.props.setActiveTab(FOLLOWED_TAB);
    }

    inTabComponent() {
        // console.log(this.props.postObjs)
        return (
            <InfiniteScroll
                loadMore={() => this.loadMore()}
                hasMore={this.props.hasMoreItems}
                loader={this.getLoaderComponent()}>

                {
                    this.props.postObjs.length>0 ? this.props.postObjs.map(postObj => {
                    return (
                        <div key={nextId()}>
                            <PostCard channelId={postObj.channel} postNumber={postObj.postNumber}/>
                        </div>
                    )
                }) :
                        (this.props.hasMoreItems? [] :<NoContent/>)
                }

            </InfiniteScroll>
        )
    }

    loadMore() {
        this.props.loadMoreItems()
    }

    getLoaderComponent() {
        return (
            <Loader key={-1} active inline={"centered"}/>
        )
    }


    render() {
        return (
            <div className="container mt-3">
                <Tab
                    menu={{
                        attached: false,
                        borderless: true,
                        color: 'orange',
                        style: {
                            display: 'flex',
                            justifyContent: 'center'
                        }
                    }}
                    panes={this.panes}
                    onTabChange={(...args) => this.onTabChange(...args)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    hasMoreItems: state.homepage.hasMoreItems,
    postObjs: state.homepage.postObjs
});

export default connect(mapStateToProps, {setActiveTab, loadMoreItems})(Homepage);