'use client';
import Hero from '@/features/landingPage/layout/hero';
import Navbar from '@/features/landingPage/layout/navbar';
import Features from '@/features/landingPage/layout/features';
import Footer from '@/features/landingPage/layout/footer';

import { useEffect } from 'react';
import * as AOS from 'aos';

export default function HomeLading() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      disable: 'mobile',
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </>
  );
}
