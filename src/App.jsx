import React from 'react';
import FloatingVinylPlayer from './components/FloatingVinylPlayer';
import HeroCover from './components/HeroCover';
import JourneyRoadmap from './components/JourneyRoadmap';
import ScratchOffCard from './components/ScratchOffCard';
import EventItinerary from './components/EventItinerary';
import DirectRSVP from './components/DirectRSVP';

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-charcoal relative selection:bg-peach selection:text-charcoal">
      {/* Subtle fixed vintage paper deckle border frame */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-40 border-[6px] sm:border-[10px] border-parchment/80 shadow-inner"
      />

      {/* Discreet Floating Vinyl / Gramophone Audio Player */}
      <FloatingVinylPlayer />

      {/* Main Scrapbook Content */}
      <main>
        {/* 1. Hero Cover */}
        <HeroCover />

        {/* 2. The "Our Journey" Interactive Roadmap (Core Feature) */}
        <JourneyRoadmap />

        {/* 3. Interactive Scratch-Off Card ("Reveal the Secret") */}
        <ScratchOffCard />

        {/* 4. Event Details & Multi-Day Itinerary (Postcards & Luggage Tags) */}
        <EventItinerary />

        {/* 5. Direct 1-Tap WhatsApp RSVP */}
        <DirectRSVP />
      </main>
    </div>
  );
}

