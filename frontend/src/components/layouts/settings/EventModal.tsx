import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EventDetailsForm } from "./EventDetailsForm";

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: {
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
    }) => void;
}

export function EventModal({ isOpen, onClose, onSubmit }: EventModalProps) {
    const [isFormVisible, setIsFormVisible] = useState(true);

    const handleFormSubmit = (formData: {
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
        onSubmit(formData);
        setIsFormVisible(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                {isFormVisible && (
                    <EventDetailsForm
                        onBack={() => setIsFormVisible(false)}
                        onSubmit={handleFormSubmit}
                    />
                )}

            </DialogContent>
        </Dialog>
    );
}
