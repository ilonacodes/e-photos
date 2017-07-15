import React from "react";
import {Search} from "../search/Search";
import {Logo} from "./Logo";

export const TopBar = ({search}) => {
    return <div className="row">
        <Logo />
        <Search search={search}/>
    </div>
}