import React, { useState, useEffect } from 'react'
import './HeroBanner.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImage/img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'


function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("movie/upcoming")
  const { url } = useSelector((state) => state.home)
  useEffect(()=>{
    const bg = url.back_drop + data?.results[Math.floor(Math.random()*20)].backdrop_path
    setBackground(bg);
  }, [data])
  const searchQueryHandler = (event) => {
    if(event.key === 'Enter' && query.length > 0){
      navigate(`/search/${query}`)
    }
  };

  return (
    <div className="heroBanner">

      {!loading && <div className="backdrop-img">
        <Img src={background} />
      </div>}
      <div className="opacity-layer"></div>
      <ContentWrapper>
          <div className="heroBannerContent">
            <span className="titel">Welcom.</span>
            <span className="subTitel">Millions of movies, TV show and people tp discover. Explore now.</span>
            <div className="searchInput">
              <input type="text" placeholder='Search for a movie and tv show....' onChange={(e)=>setQuery(e.target.value)} onKeyUp={searchQueryHandler} />
              <button>Search</button>
            </div>
          </div>
      </ContentWrapper>
      
    </div>
  )
}

export default HeroBanner