// React
import { useState } from "react";

// Components
import { Navbar } from "@/components/commons/Navbar";
import OrgBanner from "@/components/layouts/org_page/OrgBanner";

// Function Component
const OrgPageStudent = ({ bannerImageUrl }) => {
  // Banner image URL
  bannerImageUrl = "https://via.placeholder.com/1920x1080";

  return (
    <>
      <div className="flex flex-col">
        <header>
          {/* Navbar */}
          <nav className="sticky top-0 z-50">
            <Navbar />
          </nav>
          {/* Banner */}
          <OrgBanner imageUrl={bannerImageUrl} />
        </header>
        <main>
          {/* Left Main Content */}
          <section>
            {/* Icons, Name, Buttons */}
            <div>
              {/* Icons */}
              <div></div>
              {/* Name */}
              <div></div>
              {/* Buttons */}
              <div></div>
            </div>
            {/* Highlights */}
            <div></div>
            {/* Upcoming Events */}
            <div></div>
          </section>
          {/* Right Main Content */}
          <section>
            {/* Description */}
            <div></div>
            {/* Org Details */}
            <div></div>
            {/* Org Heads */}
            <div></div>
            {/* Past Events */}
            <div></div>
          </section>
        </main>
      </div>
    </>
  );
};

export default OrgPageStudent;
