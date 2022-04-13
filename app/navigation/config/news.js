import React from "react";
import Feedback from "@screens/Feedback";
import Filter from "@screens/Filter";
import Messages from "@screens/Messages";
import Messenger from "@screens/Messenger";
import Notification from "@screens/Notification";
import PostDetail from "@screens/PostDetail";
import NewsDetails from "@screens/NewsDetails";
import EventDetails from "@screens/EventDetails";
import Search from "@screens/Search";
import SearchHistory from "@screens/SearchHistory";
/* Bottom News Screen */
import Home from "@screens/Home";
import Post from "@screens/Post";
import News from "@screens/News";
import Events from "@screens/Events";
import Profile from "@screens/Profile";
import Category from "@screens/Category";
import Favourite from "@screens/Favourite";
import { tabBarIcon,  tabBarIconHaveNoty, BottomTabNavigatorMazi } from "@navigation/components";

export const NewsTabScreens = {
    Home: {
        component: Home,
        options: {
            title: "home",
            tabBarIcon: ({ color }) => tabBarIcon({ color, name: "home" }),
        },
    },
    News: {
        component: News,
        options: {
            title: "news",
            tabBarIcon: ({ color }) => tabBarIcon({ color, name: "file" }),
        },
    },
    Events: {
        component: Events,
        options: {
            title: "events",
            tabBarIcon: ({ color }) => tabBarIcon({ color, name: "file" }),
        },
    },
    Profile: {
        component: Profile,
        options: {
            title: "account",
            tabBarIcon: ({ color }) =>
                tabBarIcon({ color, name: "user-circle" }),
        },
    },
};

const NewsMenu = () => <BottomTabNavigatorMazi tabScreens={NewsTabScreens} />

export default {
    NewsMenu: {
        component: NewsMenu,
        options: {
            title: "home"
        }
    },
    Feedback: {
        component: Feedback,
        options: {
            title: "feedback"
        }
    },
    Filter: {
        component: Filter,
        options: {
            title: "filtering"
        }
    },
    Messages: {
        component: Messages,
        options: {
            title: "message"
        }
    },
    Messenger: {
        component: Messenger,
        options: {
            title: "messenger"
        }
    },
    Notification: {
        component: Notification,
        options: {
            title: "notification"
        }
    },
    PostDetail: {
        component: PostDetail,
        options: {
            title: "post_detail"
        }
    },
    EventDetails: {
        component: EventDetails,
        options: {
            title: "event_detail"
        }
    },
    NewsDetails: {
        component: NewsDetails,
        options: {
            title: "news_detail"
        }
    },
    Search: {
        component: Search,
        options: {
            title: "search"
        }
    },
    SearchHistory: {
        component: SearchHistory,
        options: {
            title: "search_history"
        }
    },
};
