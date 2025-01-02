import React from "react";
import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils"; // Assuming cn is located in this path

// Dynamically import all images from the assets/orgs directory
const logos = import.meta.glob("@/assets/orgs/*.{png,jpg,jpeg,svg}", { eager: true });

interface OrgMarqueeProps {
    className?: string;
}

const OrgMarquee: React.FC<OrgMarqueeProps> = ({ className }) => {
    const logoEntries = Object.values(logos) as { default: string }[];

    // Function to render logos (duplicated for infinite scroll)
    const renderLogos = () => {
        return [...logoEntries, ...logoEntries].map((logo, index) => (
            <img
                key={`logo-${index}`}
                src={logo.default}
                alt={`Logo ${index + 1}`}
                className="w-[76px] h-[76px] object-cover rounded-full"
            />
        ));
    };

    return (
        <div className={cn("relative flex w-full flex-col items-center justify-center overflow-hidden", className)}>
            {/* White gradient with 30% transparency applied to the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent z-10" />
            
            {/* First Row */}
            <Marquee className="[--duration:10s]">
                {renderLogos()}
            </Marquee>
            
            {/* Second Row (Reverse) */}
            <Marquee className="[--duration:15s]" reverse>
                {renderLogos()}
            </Marquee>
            
            {/* Third Row */}
            <Marquee className="[--duration:20s]">
                {renderLogos()}
            </Marquee>
        </div>
    );
};

export default OrgMarquee;