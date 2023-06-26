

import React, { useRef } from "react";
import { BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill, } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import "./Carousel.scss";
import Genres from "../genres/Genres";


function Carousel({ data, loading, endpoint, title, endPoint }) {
  const carouselContaier = useRef();
  const { url } = useSelector((state) => state.home)
  const nevigate = useNavigate()

  const navigation = (direction) =>{
    const container = carouselContaier.current;
    const scrollAmmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20)
    container.scrollTo({
      left: scrollAmmount,
      behavior: "smooth",
    })
  }
  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skelaton"></div>
        <div className="textBlock">
          <div className="title skelaton"></div>
          <div className="date skelaton"></div>
        </div>
      </div>
    )
  }
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={()=>navigation("left")}/>
        <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={()=>navigation("right")}/>
        {!loading ? (
          <div className="carouselItems" ref={carouselContaier}>
            {data?.map((item)=>{
              const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
              return (
                <div className="carouselItem" key={item.id} onClick={() => nevigate(`/${item.media_type || endpoint}/${item.id}`)}>
                  <div className="posterBlock">
                   <Img src={posterUrl}/>
                   <CircleRating rating={item.vote_average.toFixed(1)}/>
                   <Genres data={item.genre_ids.slice(0, 2)}/>
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">{dayjs(item.release_Date).format("MMM D, YYYY")}</span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

export default Carousel