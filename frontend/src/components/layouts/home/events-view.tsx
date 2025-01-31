import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import MultiSelectInput from "@/components/commons/MultiSelectInput";
import { events } from "@/sample_data/features/homepage";
import { BsStarFill, BsFillStarFill } from "react-icons/bs";
import { FaRegShareFromSquare } from "react-icons/fa6";

const PUP_MAROON1 = "text-pup-maroon1";
const ITEMS_PER_PAGE = 5;

const formatEventDate = (startDate: string | Date, startTime: string, endTime: string) => {
  try {
    // Ensure startDate is a string; convert Date to ISO string if necessary
    const baseDate = startDate instanceof Date ? startDate.toISOString().split("T")[0] : startDate;

    // Parse start and end times
    const start = new Date(`${baseDate}T${startTime}`);
    const end = new Date(`${baseDate}T${endTime}`);

    // Validate parsing; fall back if parsing fails
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.warn("Invalid startTime or endTime provided:", { startDate, startTime, endTime });
      return "Invalid date/time format";
    }

    // Formatting options
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const startFormatted = start.toLocaleDateString("en-US", options); // Format date
    const startTimeFormatted = start.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true }); // Start time
    const endTimeFormatted = end.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true }); // End time

    return `${startFormatted} | ${startTimeFormatted} - ${endTimeFormatted}`;
  } catch (error) {
    console.error("Error formatting event date:", error);
    return "Error formatting date/time";
  }
};

const EventsView: FunctionComponent = () => {
  const navigate = useNavigate();
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const paginatedEvents = events.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

  const toggleFavorite = (eventId: string) => {
    setFavorites((prev) => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  const handleEventClick = (index: number) => {
    localStorage.setItem('selectedEventIndex', index.toString());
    navigate('/event');
  };

  return (
    <div className="relative p-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between mb-4">
        <h1 className="text-4xl font-semibold font-museo text-shadow-sm shadow-gray-800 text-pup-maroon2">
          Upcoming Events
        </h1>
        <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center">
          <MultiSelectInput
            value={selectedColleges}
            onChange={(selected) => setSelectedColleges(selected)}
            ButtonClassName="rounded-full h-[45px] w-full sm:w-[234px] text-base text-pup-maroon1
                            border-pup-maroon1 hover:bg-pup-maroon1 hover:text-white"
            placeholder="All colleges"
          />
        </div>
      </div>

      {/* Events List */}
      <div className="flex flex-col gap-6">
        {paginatedEvents.map((event, index) => (
          <div key={event.id} className="flex flex-col gap-2">
            <div
              className="flex flex-row gap-4 items-start p-4 rounded-md hover:shadow-lg cursor-pointer"
              onClick={() => handleEventClick(index)}
            >
              <img
                src={event.imageSrc}
                alt={event.name}
                className="w-[100px] h-[100px] object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-lg font-bold">{event.name}</h2>
                <p className="text-sm font-semibold text-gray-600">
                  {formatEventDate(event.start_date, event.start_time, event.end_time)}
                </p>
                <p className="text-sm text-gray-800">{event.description}</p>
              </div>
              <div className="flex flex-col items-center text-gray-600">
                {/* Toggle Favorite */}
                <button
                  className="text-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(event.id);
                  }}
                >
                  {favorites[event.id] ? (
                    <BsFillStarFill className="text-yellow-500" />
                  ) : (
                    <BsStarFill className="text-gray-500" />
                  )}
                </button>
                {/* Share Button */}
                <FaRegShareFromSquare className="text-xl mt-2 cursor-pointer" />
              </div>
            </div>
            {index < paginatedEvents.length - 1 && <hr className="border-pup-maroon1" />}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded-full ${PUP_MAROON1} border hover:bg-pup-maroon1 hover:text-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Previous
        </button>
        <span className="text-base font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded-full ${PUP_MAROON1} border hover:bg-pup-maroon1 hover:text-white ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventsView;
