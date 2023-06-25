import React, { useState } from "react";

import Carousel from "../../../components/caousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTab from "../../../components/switchTab/SwitchTab";

import useFetch from "../../../hooks/useFetch";

const TopRated = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`${endpoint}/top_rated`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper >
                <span className="carouselTitle">Top's Rated</span>
                <SwitchTab
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
};

export default TopRated;