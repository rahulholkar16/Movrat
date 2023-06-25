import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { fetchDataFromapi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/pageNotFound'

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state)=>state.home)
  useEffect(()=>{
    fetchApiConfigration();
    genresCall();
  }, [])
  const fetchApiConfigration = () => {
    fetchDataFromapi('configuration').then(function(res){
      const url = {
        back_drop  : res.images.secure_base_url + "original",
        poster : res.images.secure_base_url + "original",
        profile : res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url))
    })
  }

  const genresCall = async() => {
    let promise = []
    let endPoint = ["movie", 'tv']
    let allGenres = {}

    endPoint.forEach((url) => {
      promise.push(fetchDataFromapi(`genre/${url}/list`))
    })

    const data = await Promise.all(promise);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item))
    });

    dispatch(getGenres(allGenres))
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path=':mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
