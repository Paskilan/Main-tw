import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSchool, FaBell } from "react-icons/fa";
import { IoTicket } from 'react-icons/io5';
import { HiMiniBell, HiMiniBellAlert } from "react-icons/hi2";

interface EventCardsProps {
    eventName: string;
    host: string;
    description: string;
    category: string;
    followers: number;
    imageSrc: string;
    eventPrice: number;
    onFollow: (e: React.MouseEvent) => void;
}

// Function to format price
const formatPrice = (price: number) => {
    if (price >= 1000000) {
        return (price / 1000000).toFixed(1) + "M";  // For 1M and above
    } else if (price >= 1000) {
        return (price / 1000).toFixed(1) + "k";  // For 1k to less than 1M
    }
    return price.toString();  // Return as is if less than 1k
}

export const EventCards: React.FC<EventCardsProps> = ({
    eventName,
    host,
    description,
    category,
    followers,
    imageSrc,
    eventPrice,
    onFollow,
}) => {
    return (
        <Card className="w-[488.5px] h-[258.36px] shadow-md rounded-[8.82px] bg-white flex flex-col">
            <CardHeader>
                <div className="relative flex items-start">
                    {/* Image Section */}
                    <img
                        src={imageSrc}
                        alt="Org Logo"
                        className="w-[150px] h-[150px] rounded-[8.82px] flex-shrink-0"
                    />

                    {/* Right Content Section */}
                    <div className="flex flex-col flex-grow ml-4">
                        {/* Bell Icon */}
                        <HiMiniBell
                            className="absolute top-0 right-0 text-pup-maroon2 text-2xl cursor-pointer"
                            onClick={onFollow}
                        />

                        {/* Event Name */}
                        <h1 className="text-2xl font-bold font-poppins leading-8 text-gray-900 mt-[20px] line-clamp-3 overflow-hidden text-ellipsis">
                            {eventName}
                        </h1>

                        <div className="flex items-end space-x-4 mt-1">
                            <span className="text-sm font-semibold text-gray-600 line-clamp-2 overflow-hidden text-ellipsis">Hosted by: {host}</span>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <CardDescription>
                    <div className="flex items-center space-x-4 mt-[20px]">
                        <div className="flex items-center">
                            <FaSchool className="mr-1 text-gray-800" />
                            <span className="text-sm font-semibold text-gray-600">{category}</span>
                        </div>
                        <div className="flex items-center">
                            <IoTicket className="mr-1 text-gray-800" />
                            <span className="text-sm font-semibold text-gray-600">
                                {eventPrice === 0 ? "Free" : `Php. ${formatPrice(eventPrice)}`}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <FaBell className="mr-1 text-gray-800" />
                            <span className="text-sm font-semibold text-gray-600">`{formatPrice(followers)}</span>
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>
    );
};
