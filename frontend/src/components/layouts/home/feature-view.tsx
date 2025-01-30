
import PaskilanStickman from '@/assets/paskilan_stickman.png';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { useUser } from '@/contexts/UserContext';
// Importing sample data
import { events, orgs } from '@/sample_data/features/homepage';

// Card Components
import { OrgCards } from "./OrgCards";
import { EventCards } from "./EventCards";

// Sample Header Images
import SampleHeader1 from '@/sample_data/sample_header/sample_header.jpeg';
import SampleHeader2 from '@/sample_data/sample_header/sample_header2.jpg';

export default function FeatureView() {

    const { profile, loading } = useUser();

    return (
        <div>
            {/* Feature Heading */}
            <div className="relative w-full h-[260px] left-0">
                <h1 className="h1-text text-shadow shadow-gray-900 absolute top-[95px] left-0">
                <span className="h1-text italic text-pup-maroon1">What's up, </span>
                <span className="h1-text text-pup-gold2 truncate max-w-[200px]">
                {loading ? '...' : profile?.firstName.toUpperCase()}
                </span>
                    <span className="h1-text text-pup-maroon1">!</span>
                </h1>
                <img
                    src={PaskilanStickman}
                    alt="Paskilan Stickman"
                    className="absolute top-0 right-0 w-[347px] h-[260px] object-contain"
                />
                <div className="relative w-[680px] bottom-0 top-[170px] left-3">
                    <p className="font-poppins text-[15px] text-justify">
                        <span className="font-bold italic text-pup-maroon1">Paskilan</span>{" "}
                        is a web-based platform for campus event promotion and student engagement that creates a centralized online hub where campus organizations can promote their events and activities.
                    </p>
                </div>
            </div>

            {/* Feature Carousel */}
            <div className="w-[1110px] h-[283px] overflow-hidden rounded-[10px] relative">
                <Carousel
                    className="w-full h-full"
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }),
                    ]}
                >
                    <CarouselContent>
                        <CarouselItem>
                            <img
                                src={SampleHeader1}
                                alt="Sample Header 1"
                                className="w-full h-full object-cover rounded-[10px]"
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <img
                                src={SampleHeader2}
                                alt="Sample Header 2"
                                className="w-full h-full object-cover rounded-[10px]"
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-pup-maroon2 text-white p-2 rounded-full shadow-lg">
                        Previous
                    </CarouselPrevious>
                    <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-pup-maroon2 text-white p-2 rounded-full shadow-lg">
                        Next
                    </CarouselNext>
                </Carousel>
            </div>
            
            {/* Events Carousel */}
            <div className="mt-4"> {/* Reduced margin-top to 4 */}
                <div className="flex flex-cols gap-[48%]">
                    <h1 className="text-pup-maroon1 text-5xl font-semibold 
                        font-museo tracking-tighter 
                        text-shadow-sm shadow-gray-900 mb-4">
                        Featured Events
                    </h1>
                    <span className="text-pup-maroon1 text-3xl font-semibold tracking-tighter
                        text-shadow-sm shadow-gray-900">
                        See more
                    </span>
                </div>
                <div className="w-[1110px] h-[450px] overflow-hidden rounded-[10px] relative">
                    <Carousel
                        className="w-full h-[80px]"
                        plugins={[
                            Autoplay({
                                delay: 3000,
                            }),
                        ]}
                    >
                        <CarouselContent className="flex space-x-[10px]"> {/* Reduced space to 10px */}
                            {events.map((event, index) => (
                                <CarouselItem
                                    key={index}
                                    className="flex-shrink-0 w-[540px] h-full basis-1/2"
                                >
                                    <EventCards
                                        eventName={event.name}
                                        host={event.host}
                                        description={event.description}
                                        category={event.category}
                                        followers={event.followers}
                                        imageSrc={event.imageSrc}
                                        eventPrice={event.price}
                                        onFollow={() => alert(`Followed ${event.name}!`)}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-pup-maroon2 text-white p-2 rounded-full shadow-lg">
                            Previous
                        </CarouselPrevious>
                        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-pup-maroon2 text-white p-2 rounded-full shadow-lg">
                            Next
                        </CarouselNext>
                    </Carousel>
                </div>
            </div>

            {/* Orgs Carousel */}
            <div className="w-full h-full"> {/* Reduced margin-top to 4 */}
                <div className="flex flex-cols gap-[50%]">
                    <h1 className="text-pup-maroon1 text-5xl font-semibold 
                        font-museo tracking-tighter 
                        text-shadow-sm shadow-gray-900 mb-4">
                        Featured Orgs
                    </h1>
                    <span className="text-pup-maroon1 text-3xl font-semibold tracking-tighter
                        text-shadow-sm shadow-gray-900">
                        See more
                    </span>
                </div>
                <div className="w-[1110px] h-[450px] overflow-hidden rounded-[10px] relative">
                    <Carousel
                        className="w-full h-full gap-[10px]"
                        plugins={[
                            Autoplay({
                                delay: 5000,
                            }),
                        ]}
                    >
                        <CarouselContent className=""> {/* Reduced space to 10px */}
                            {orgs.map((org, index) => (
                                <CarouselItem
                                    key={index}
                                    className="flex-shrink-0 w-[540px] h-full basis-1/2"
                                >
                                    <OrgCards
                                        orgName={org.name}
                                        description={org.description}
                                        category={org.category}
                                        followers={org.followers}
                                        imageSrc={org.imageSrc}
                                        onFollow={() => alert(`Followed ${org.name}!`)}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-pup-maroon2 text-white p-2 rounded-full shadow-lg">
                            Previous
                        </CarouselPrevious>
                        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-pup-maroon2 text-white p-2 rounded-full shadow-lg">
                            Next
                        </CarouselNext>
                    </Carousel>
                </div>
            </div>

        </div>
    );
}
