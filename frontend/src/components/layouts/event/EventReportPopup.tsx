import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

// Option Component
const ReportOption = ({
    id,
    label,
    selectedOption,
    setSelectedOption,
}: {
    id: string;
    label: string;
    selectedOption: string;
    setSelectedOption: (value: string) => void;
}) => {
    return (
        <label
            key={id}
            className="text-xl flex items-center space-x-1 cursor-pointer rounded-lg bg-slate-50 p-2"
        >
            <input
                type="radio"
                name="report_reason"
                value={id}
                checked={selectedOption === id}
                onChange={() => setSelectedOption(id)}
                className="h-5 w-5 text-pup-maroon2 border-gray-200 focus:ring-pup-maroon2"
            />
            <span className="text-sm text-gray-700">{label}</span>
        </label>
    );
};

// Main Component
type EventReportPopupProps = {
    onClose: () => void; // Explicitly define the type for onClose
};

const EventReportPopup: React.FC<EventReportPopupProps> = ({ onClose }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [showThankYou, setShowThankYou] = useState(false);

    const options = [
        { id: "violates_guidelines", label: "This event violates the PUP Handbook guidelines" },
        { id: "promotes_harm", label: "Promotes extreme violence or harmful behavior" },
        { id: "explicit_content", label: "Contains explicit sexual content" },
        { id: "misleading_info", label: "Spreading false or misleading information" },
        { id: "misleading_info", label: "Something else" },
    ];

    const handleSubmit = () => {
        setShowThankYou(true);
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent
                className="p-8 text-lg max-w-3xl mx-auto"
                style={{ width: "600px" }} // Explicitly set width
            >
                {showThankYou ? (
                    <div className="text-center space-y-4">
                        <FaCheck className="text-4xl text-gray-500 mx-auto" />
                        <h2 className="text-xl font-semibold">Thank you for submitting your report</h2>
                        <p className="text-sm text-gray-700">
                            We will notify you once the outcome of your report has been reviewed.
                            Your report is anonymous, and your identity will remain confidential throughout the process.
                        </p>
                        <Button
                            className="bg-pup-maroon2 hover:bg-pup-maroon1 rounded-full mt-4"
                            onClick={onClose}
                        >
                            Done
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-center text-xl font-bold">Report</DialogTitle>
                        </DialogHeader>
                        <h1 className="text-xl font-bold text-gray-700 font-poppins text-left ">
                            Why are you reporting this event?
                        </h1>
                        <p className="text-sm text-gray-500 text-justify mb-4">
                            If someone is in immediate danger due to this event, get help immediately before reporting it here. Don’t wait.
                        </p>
                        <div className="space-y-4">
                            {options.map((option) => (
                                <ReportOption
                                    key={option.id}
                                    id={option.id}
                                    label={option.label}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption}
                                />
                            ))}
                        </div>
                        <DialogFooter className="mt-6">
                            <Button
                                variant="outline"
                                className="border-pup-maroon2 hover:border-pup-maroon1 rounded-full font-semibold"
                                onClick={handleSubmit}
                                disabled={!selectedOption} // Disable if no option is selected
                            >
                                Submit
                            </Button>
                            <DialogClose asChild>
                                <Button
                                    className="bg-pup-maroon2 hover:bg-pup-maroon1 rounded-full font-semibold"
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EventReportPopup;
