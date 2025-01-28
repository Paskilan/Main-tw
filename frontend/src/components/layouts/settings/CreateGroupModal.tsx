import { SetStateAction, useState } from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import PictureUploaderInput from "@/components/commons/PictureUploaderInput";
import { GroupDetailsForm } from "./GroupDetailsForm";

interface CreateGroupModalProps {
    onNewGroup: (newGroup: { id: number, name: string, description: string, imageUrl: string }) => void;
}

export default function CreateGroupModal({ onNewGroup }: CreateGroupModalProps) {
    const [step, setStep] = useState(1);
    const [alertMessage, setAlertMessage] = useState("");
    const [pictureUploaded, setPictureUploaded] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleNext = () => {
        if (!pictureUploaded) {
            setAlertMessage("Please upload a group photo first");
            setTimeout(() => setAlertMessage(""), 3000);
            return;
        }
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleFormSubmit = (formData: { orgName: any; description: any; }) => {
        const newGroup = {
            id: Date.now(),
            name: formData.orgName,
            description: formData.description,
            imageUrl
        };
        onNewGroup(newGroup);
        setStep(1); // Close the form after successfully creating a group
    };

    return (
        <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
                <DialogTitle>
                    {step === 1 ? "Upload Group Photo" : "Group Details"}
                </DialogTitle>
            </DialogHeader>

            {step === 1 ? (
                <div className="grid gap-4">
                    <PictureUploaderInput
                        onChange={(url) => {
                            setPictureUploaded(true);
                            setImageUrl(url);
                        }} 
                    />
                    <Button 
                        onClick={handleNext}
                        className="w-full bg-pup-maroon2 hover:bg-pup-maroon1"
                    >
                        Next
                    </Button>
                </div>
            ) : (
                <GroupDetailsForm onBack={handleBack} onSubmit={handleFormSubmit} />
            )}

            {alertMessage && (
                <div className="fixed top-4 right-4 z-50">
                    <Alert variant="destructive" className="bg-white w-64">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{alertMessage}</AlertDescription>
                    </Alert>
                </div>
            )}
        </DialogContent>
    );
}
