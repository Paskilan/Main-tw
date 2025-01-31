// src/pages/HomePage.tsx
import { Navbar } from "@/components/commons/Navbar";
import GroupSidebar from "@/components/commons/GroupSidebar";
import { HomeButtons } from "@/components/layouts/home/HomeButtons";
import { Routes, Route, Navigate } from "react-router-dom";

// Views
import FeatureView from "@/components/layouts/home/feature-view";
import OrgsView from "@/components/layouts/home/orgs-view";
import EventsView from "@/components/layouts/home/events-view";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            <div className="flex flex-1">
                <div className="sticky top-0 h-screen">
                    <GroupSidebar />
                </div>

                <div className="container p-10 w-full overflow-auto">
                    <HomeButtons />
                    <div className="mt-4">
                        <Routes>
                            <Route path="/feature" element={<FeatureView />} />
                            <Route path="/events" element={<EventsView />} />
                            <Route path="/orgs" element={<OrgsView />} />
                            <Route path="/home" element={<Navigate to="/feature" replace />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}