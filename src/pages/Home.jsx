import React from 'react'
import Carousel from '../components/Carousel'
import Features from '../components/Features'
import About from './About'

const Home = () => {
  return (
    <div>
      <Carousel/>
      <About />
      <Features/>
    </div>
  )
}

export default Home
