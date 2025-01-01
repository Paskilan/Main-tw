import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FaSchool, FaUserFriends } from "react-icons/fa";
import { Button } from "@/components/ui/button";


// Function to format price
const formatPrice = (price: number) => {
    if (price >= 1000000) {
        return (price / 1000000).toFixed(1) + "M";  // For 1M and above
    } else if (price >= 1000) {
        return (price / 1000).toFixed(1) + "k";  // For 1k to less than 1M
    }
    return price.toString();  // Return as is if less than 1k
}

interface OrgCardProps {
    orgName?: string;
    description?: string;
    category?: string;
    followers?: number;
    imageSrc?: string;
    onFollow?: () => void;
}

export const OrgCards: React.FC<OrgCardProps> = ({
    orgName = "Organization Name",
    description = "No description provided.",
    category = "General",
    followers = 0,
    imageSrc = "https://via.placeholder.com/80",
    onFollow = () => alert("Follow button clicked!"),
}) => {
    return (
        <Card className="w-[488.5px] h-[258.36px] shadow-md rounded-[8.82px] bg-white flex flex-col">
            <CardHeader className="flex-1">
                <div className="grid grid-cols-2 gap-4 items-center">
                    <img
                        src={imageSrc}
                        alt="Org Logo"
                        className="w-[80px] h-[80px] rounded-[8.82px]"
                    />
                    <Button className="org-card-btn">
                        Follow
                    </Button>
                </div>
                <CardDescription>
                    <h1 className="text-3xl font-bold font-poppins leading-8 text-gray-900 line-clamp-2 overflow-hidden text-ellipsis">
                        {orgName}
                    </h1>
                    <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center">
                            <FaSchool className="mr-1 text-gray-800" />
                            <span className="text-sm font-semibold text-gray-600">{category}</span>
                        </div>
                        <div className="flex items-center">
                            <FaUserFriends className="mr-1 text-gray-800" />
                            <span className="text-sm font-semibold text-gray-600">{formatPrice(followers)} followers</span>
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-1">
                <span className="text-sm line-clamp-2 overflow-hidden text-ellipsis">{description}</span>
            </CardContent>
        </Card>
    );
};
