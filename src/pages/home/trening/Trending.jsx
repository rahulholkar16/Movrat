import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
import SwitchTab from '../../../components/switchTab/SwitchTab'
import Carousel from '../../../components/caousel/Carousel'

export default function Trending() {
  const [endPoint, setEndPoint] = useState('day')
  const { data, loading } = useFetch(`trending/all/${endPoint}`)
  const onTabHandel = (tab, index) => {
    setEndPoint(tab === "Day" ? "day" : "week")
  }
  return (
    <div className='carouselSection'>
        <ContentWrapper >
            <span className='carouselTitle'>Trendin</span>
            <SwitchTab data = {["Day", "Week"]} onTabChange={onTabHandel}></SwitchTab>
        </ContentWrapper>
        <Carousel data ={data?.results} loading={loading} endPoint={endPoint}/>
    </div>
  )
}
