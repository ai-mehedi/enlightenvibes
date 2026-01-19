import Hero from '@/components/Hero'
import About from '@/components/About'
import HowWeWork from '@/components/HowWeWork'
import Services from '@/components/Services'
import OurProcess from '@/components/OurProcess'
import OurNumbers from '@/components/OurNumbers'
import OurSkills from '@/components/OurSkills'
import Team from '@/components/Team'
import OurWork from '@/components/OurWork'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import React from 'react'

export default function page() {
  return (
    <div>
      <Hero />
      <About />
      <HowWeWork />
      <Services />
      <OurWork />
      <OurProcess />
      <OurNumbers />
      <Team />
      <OurSkills />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}
