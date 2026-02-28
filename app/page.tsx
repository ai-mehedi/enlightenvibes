import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MajorClients from '@/components/MajorClients'
import About from '@/components/About'
import HowWeWork from '@/components/HowWeWork'
import Services from '@/components/Services'
import WeAreCreative from '@/components/WeAreCreative'
import OurProcess from '@/components/OurProcess'
import OurNumbers from '@/components/OurNumbers'
import OurSkills from '@/components/OurSkills'
import Team from '@/components/Team'
import OurWork from '@/components/OurWork'
import Testimonials from '@/components/Testimonials'
import WhereWeAre from '@/components/WhereWeAre'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import React from 'react'

export default function page() {
  return (
    <div>
      <Header />
      <Hero />
   <div
  className="min-h-screen bg-no-repeat bg-center bg-cover"
  style={{ backgroundImage: "url('/bg.png')" }}
>
  <MajorClients />
  <About />
</div>
      <HowWeWork />
      <Team />
      <Services />
      <WeAreCreative />
      <OurWork />
       
      <OurProcess />
      <OurNumbers />
     
      <OurSkills />
      {/* <Testimonials /> */}
      <WhereWeAre />
      <Contact />
      {/* <Footer /> */}
    </div>
  )
}
