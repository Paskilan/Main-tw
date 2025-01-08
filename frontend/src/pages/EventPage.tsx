
import { Navbar } from "@/components/commons/Navbar";
import GroupSidebar from "@/components/commons/GroupSidebar";
import EventView from "@/components/layouts/event/event-view";

const EventPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            <div className="flex flex-1">
                {/* Sticky Sidebar */}
                <div className="sticky top-0 h-screen">
                    <GroupSidebar />
                </div>

                {/* Main Content */}
                <div className=" p-10 w-full overflow-auto">
                    <EventView />
                </div>
            </div>
        </div>
    );
}
export default EventPage