import React from "react";
import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils"; // Assuming cn is located in this path

// Dynamically import all images from the assets/orgs directory
const logos = import.meta.glob("@/assets/orgs/*.{png,jpg,jpeg,svg}", { eager: true });

interface OrgMarqueeProps {
    className?: string;
    rows?: number; // Added rows prop to allow dynamic number of rows
}

const OrgMarquee: React.FC<OrgMarqueeProps> = ({ className, rows = 3 }) => {
    const logoEntries = Object.values(logos) as { default: string }[];

    // Generate the marquee rows dynamically
    const marqueeRows = Array.from({ length: rows }).map((_, index) => (
        <Marquee
            key={`row-${index}`}
            className={`[--duration:${(10 + index * 5)}s] top-[-20px]`}
            reverse={index % 2 === 1} // Reverse direction for alternate rows
        >
            {/* Duplicate the logos to create infinite scroll effect */}
            {[...logoEntries, ...logoEntries].map((logo, logoIndex) => (
                <img
                    key={`row-${index}-logo-${logoIndex}`}
                    src={logo.default}
                    alt={`Logo ${logoIndex + 1}`}
                    className="w-[76px] h-[76px] relative object-cover rounded-full mt-[-10px]"  // Negative margin to overlap
                    style={{ top: `${index * 10}px` }}  // Adjust vertical position dynamically using "top"
                />
            ))}
        </Marquee>
    ));

    return (
        <div className={cn("relative flex w-full flex-col items-center justify-center overflow-hidden", className)}>
            {/* White gradient with 30% transparency applied to the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent z-10" />
            {marqueeRows}
        </div>
    );
};

export default OrgMarquee;
