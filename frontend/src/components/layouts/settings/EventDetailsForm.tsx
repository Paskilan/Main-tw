import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/commons/FormInput";
import SingleSelectInput from "@/components/commons/FormInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface EventDetailsFormProps {
    onBack: () => void;
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

export function EventDetailsForm({ onBack, onSubmit }: EventDetailsFormProps) {
    const [eventName, setEventName] = useState("");
    const [when, setWhen] = useState("");
    const [where, setWhere] = useState<"online" | "onsite">("online");
    const [platform, setPlatform] = useState("");
    const [location, setLocation] = useState("");
    const [participantsCount, setParticipantsCount] = useState<"limited" | "free">("free");
    const [eventDetails, setEventDetails] = useState("");
    const [topic, setTopic] = useState("");
    const [exclusivity, setExclusivity] = useState<"uniwide" | "college">("uniwide");
    const [picture, setPicture] = useState<File | null>(null);
    const [organizer, setOrganizer] = useState("");
    const [host, setHost] = useState("");
    const [freeOrPaid, setFreeOrPaid] = useState<"free" | "paid">("free");
    const [cost, setCost] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const validateFields = () => {
        if (!eventName.trim()) return "Event name is required.";
        if (!when.trim()) return "Event date/time is required.";
        if (where === "online" && !platform.trim()) return "Platform is required for online events.";
        if (where === "onsite" && !location.trim()) return "Location is required for onsite events.";
        if (!eventDetails.trim()) return "Event details are required.";
        if (!topic.trim()) return "Topic is required.";
        if (!organizer.trim()) return "Organizer is required.";
        if (!host.trim()) return "Host is required.";
        if (freeOrPaid === "paid" && !cost.trim()) return "Cost is required for paid events.";
        return "";
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationMessage = validateFields();
        if (validationMessage) {
            setAlertMessage(validationMessage);
            setTimeout(() => setAlertMessage(""), 3000);
            return;
        }

        onSubmit({
            eventName,
            when,
            where,
            platform: where === "online" ? platform : undefined,
            location: where === "onsite" ? location : undefined,
            participantsCount,
            eventDetails,
            topic,
            exclusivity,
            picture,
            organizer,
            host,
            freeOrPaid,
            cost: freeOrPaid === "paid" ? cost : undefined
        });
    };

    return (
        <form className="grid gap-4 max-w-3xl w-full mx-auto p-4 bg-white shadow-md rounded-lg overflow-y-auto max-h-[90vh]" onSubmit={handleSubmit}>
            <FormInput
                label="Event Name *"
                placeholder="Enter event name"
                value={eventName}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEventName(e.target.value)}
                labelClassName="block form-label"
                inputClassName="form-input"
                required
            />

            <FormInput
                label="When *"
                placeholder="Enter event date/time"
                value={when}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setWhen(e.target.value)}
                labelClassName="block form-label"
                inputClassName="form-input"
                required
            />

            <div className="space-y-2">
                <Label>Where *</Label>
                <RadioGroup 
                    defaultValue="online" 
                    onValueChange={(value: "online" | "onsite") => setWhere(value)}
                    className="flex gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="online" id="online" />
                        <Label htmlFor="online">Online</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="onsite" id="onsite" />
                        <Label htmlFor="onsite">Onsite</Label>
                    </div>
                </RadioGroup>
            </div>

            {where === "online" && (
                <FormInput
                    label="Platform *"
                    placeholder="Enter platform"
                    value={platform}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPlatform(e.target.value)}
                    labelClassName="block form-label"
                    inputClassName="form-input"
                    required
                />
            )}

            {where === "onsite" && (
                <FormInput
                    label="Location *"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setLocation(e.target.value)}
                    labelClassName="block form-label"
                    inputClassName="form-input"
                    required
                />
            )}

            <div className="space-y-2">
                <Label>Participants Count *</Label>
                <RadioGroup 
                    defaultValue="free" 
                    onValueChange={(value: "limited" | "free") => setParticipantsCount(value)}
                    className="flex gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="limited" id="limited" />
                        <Label htmlFor="limited">Limited Space</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="free" id="free" />
                        <Label htmlFor="free">Free for All</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="grid gap-2">
                <Label>Event Details *</Label>
                <textarea
                    className="form-input min-h-[100px]"
                    placeholder="Enter event details"
                    value={eventDetails}
                    onChange={(e) => setEventDetails(e.target.value)}
                    required
                />
            </div>

            <FormInput
                label="Topic *"
                placeholder="Enter topic"
                value={topic}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTopic(e.target.value)}
                labelClassName="block form-label"
                inputClassName="form-input"
                required
            />

            <div className="space-y-2">
                <Label>Exclusivity *</Label>
                <RadioGroup 
                    defaultValue="uniwide" 
                    onValueChange={(value: "uniwide" | "college") => setExclusivity(value)}
                    className="flex gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="uniwide" id="uniwide" />
                        <Label htmlFor="uniwide">Uniwide</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="college" id="college" />
                        <Label htmlFor="college">Specific College</Label>
                    </div>
                </RadioGroup>
            </div>

            <FormInput
                label="Organizer *"
                placeholder="Enter organizer"
                value={organizer}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setOrganizer(e.target.value)}
                labelClassName="block form-label"
                inputClassName="form-input"
                required
            />

            <FormInput
                label="Host *"
                placeholder="Enter host"
                value={host}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setHost(e.target.value)}
                labelClassName="block form-label"
                inputClassName="form-input"
                required
            />

            <div className="space-y-2">
                <Label>Free or Paid *</Label>
                <RadioGroup 
                    defaultValue="free" 
                    onValueChange={(value: "free" | "paid") => setFreeOrPaid(value)}
                    className="flex gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="free" id="free" />
                        <Label htmlFor="free">Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paid" id="paid" />
                        <Label htmlFor="paid">Paid</Label>
                    </div>
                </RadioGroup>
            </div>

            {freeOrPaid === "paid" && (
                <FormInput
                    label="Cost *"
                    placeholder="Enter cost"
                    value={cost}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setCost(e.target.value)}
                    labelClassName="block form-label"
                    inputClassName="form-input"
                    required
                />
            )}

            <div className="grid gap-2">
                <Label>Picture *</Label>
                <input
                    type="file"
                    className="form-input"
                    onChange={(e) => setPicture(e.target.files ? e.target.files[0] : null)}
                    required
                />
            </div>

            <div className="flex gap-2 justify-end mt-4">
                <Button
                    type="submit"
                    className="bg-pup-maroon2 hover:bg-pup-maroon1"
                >
                    Create Event
                </Button>
            </div>

            {alertMessage && (
                <div className="fixed top-4 right-4 z-50">
                    <Alert variant="destructive" className="bg-white w-64">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{alertMessage}</AlertDescription>
                    </Alert>
                </div>
            )}
        </form>
    );
}
