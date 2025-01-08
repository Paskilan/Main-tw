import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { FaCheck, FaRegClock } from "react-icons/fa";
import { IoLocationOutline, IoStarOutline } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import EventReportPopup from "@/components/layouts/event/EventReportPopup";

/*TODO : replace and delete this in PROD  */
import HeaderPicture from "@/sample_data/sample_header/sample_header.jpeg";
import OrgPicture from "@/sample_data/sample_orgs/cisco_connect.jpg";
import { events } from "@/sample_data/features/homepage";
const event = events[1];
const hosts = [
  { name: "Sean Almeda", picture: OrgPicture },
  { name: "Charles Beethoven Putin Abuela", picture: OrgPicture },
  { name: "Syke Domingo", picture: OrgPicture },
  { name: "Manuel Muhi", picture: OrgPicture },
  { name: "Another Host", picture: OrgPicture },
];

const EventView = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-4 px-4 py-4">
      {/* Left Side: Header, Title, Registration, and Details */}
      <div className="col-span-2 space-y-4">
        {/* Header Section */}
        <div className="h-[210px] div-shadow-sm rounded-xl overflow-hidden">
          <img
            src={HeaderPicture}
            alt="Event Header"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Title */}
        <div className="div-shadow-sm rounded-xl bg-white h-[388px] p-4">
          <div className="m-3">
            <h2 className="text-3xl font-bold text-pup-maroon2">
              {event.name}
            </h2>
            <div className="py-4">
              <span className="text-xl font-bold text-gray-800 py-3 block">Details</span>
              <p className="text-base text-gray-600 leading-1/2 text-justify">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Sticky Divs */}
      <div className="space-y-4 sticky top-4">

        {/* Organization Details */}
        <div className="div-shadow-sm rounded-xl bg-white p-4">
          <div className="flex items-center gap-4">
            <img
              src={OrgPicture}
              alt="Organization"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-lg">{event.host}</h3>
              <p className="text-sm text-gray-500">Organizer</p>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="div-shadow-sm rounded-xl bg-white p-4">
          {/* Registration */}
          <p className="flex items-center text-base text-gray-600 mt-4">
            <FaCheck className="mr-2" /> Registration is open
          </p>

          {/* Date */}
          <div className="text-base text-gray-600 mt-8">
            <div className="flex items-center">
              <FaRegClock className="mr-2" />
              <div>
                <p className="font-semibold">Wednesday, October 16, 2024</p>
                <p className="text-sm">7:00 AM - 12:00 PM</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="text-base text-gray-600 mt-8">
            <div className="flex items-center">
              <IoLocationOutline className="mr-2 text-xl" />
              <div>
                <p className="font-semibold">Facebook Live</p>
                <p className="text-sm">Online</p>
              </div>
            </div>
          </div>

          {/* Report this event */}
          <div className="text-center mt-6 z-50 relative">
            <Button
              variant="link"
              className="font-light text-lg text-pup-maroon1"
              onClick={() => setIsDialogOpen(true)}
            >
              Report this event
            </Button>
            </div>
            {isDialogOpen && (
                <EventReportPopup onClose={() => setIsDialogOpen(false)} />
            )}
          </div>

          {/* Hosted By */}
          <div className="div-shadow-sm rounded-xl bg-white p-4">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Hosted by</h3>
            <div className="relative">
              <Carousel className="flex gap-4 overflow-hidden">
                <CarouselContent>
                  {hosts.map((host, index) => (
                    <CarouselItem key={index} className="flex-shrink-0 basis-1/3">
                      <div className="flex flex-col items-center text-center">
                        <img
                          src={host.picture}
                          alt={host.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <p className="text-sm text-gray-600">{host.name}</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* Carousel Navigation */}
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 cursor-pointer">
                  &#8249;
                </CarouselPrevious>
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 cursor-pointer">
                  &#8250;
                </CarouselNext>
              </Carousel>
            </div>
          </div>
        </div>

        {/* RSVP Box (Maximized and Sticky) */}
        <div className="w-full ticky top-4 col-span-3 div-shadow-sm rounded-xl bg-white p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className=" text-gray-800">Wednesday, October 16, 2024</p>
              <p className="text-2xl font-bold text-gray-800 py-1">{event.name}</p>
              <div className="flex items-center space-x-2 text-gray-600">
                <MdGroups />
                <p>100 attendees</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 ">
              <IoStarOutline className="text-pup-maroon2 text-2xl" />
              <Button
                variant="outline"
                className="bg-white border-1 border-pup-maroon1  border-2
               text-pup-maroon1 rounded-md hover:bg-pup-maroon1 hover:text-white
               text-lg">
                Share
              </Button>
              <Button className="text-lg bg-pup-maroon2  hover:bg-pup-maroon1 rounded-md">
                RSVP me!
              </Button>
            </div>
          </div>
        </div>
      </div>
      );
};

      export default EventView;
