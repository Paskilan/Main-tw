import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EventModal } from "@/components/layouts/settings/EventModal";

export default function TemporaryEventPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (formData: {
        eventName: string;
        when: string;
        where: "online" | "onsite";
        platform?: string;
        location?: string;
        participantsCount: "limited" | "free";
        eventDetails: string;
        topic: string;
        exclusivity: "uniwide" | "college";
        picture: File | null;
        organizer: string;
        host: string;
        freeOrPaid: "free" | "paid";
        cost?: string;
    }) => {
        console.log("Event Data Submitted:", formData);
        handleCloseModal();
    };

    return (
        <div className="p-4">
            <Button onClick={handleOpenModal} className="bg-pup-maroon2 hover:bg-pup-maroon1">
                Create Event
            </Button>
            <EventModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
