import PaskilanStickman from '@/assets/paskilan_stickman.png';
import { useState } from "react";
import MultiSelectInput from "@/components/commons/MultiSelectInput";
import { orgs } from "@/sample_data/features/homepage";
import { OrgCards } from './OrgCards';

const OrgsView = () => {
    const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
    const [relevance, setRelevance] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const itemsPerPage = 4; // Number of org cards per page
    const totalPages = Math.ceil(orgs.length / itemsPerPage);

    // Calculate the items to display on the current page
    const currentItems = orgs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="relative p-1">
            {/* Organizations heading */}
            <div className="relative w-full h-[260px]">
                <h1 className="h2-text text-shadow shadow-gray-900 absolute top-[95px] left-0">
                    <span className="h2-text text-4xl text-pup-maroon2">
                        Organizations
                    </span>
                </h1>
                <img
                    src={PaskilanStickman}
                    alt="Paskilan Stickman"
                    className="absolute top-0 right-0 w-[347px] h-[260px] object-contain"
                />
            </div>

            {/* Filter inputs */}
            <div className="relative bottom-[90px] flex flex-col sm:flex-row gap-4">
                <MultiSelectInput
                    value={selectedColleges}
                    ButtonClassName="rounded-full h-[45px] w-full sm:w-[234px] text-xl 
                                         text-pup-maroon2 border-pup-maroon1 
                                         hover:bg-pup-maroon1 hover:text-white"
                    divClassName="flex flex-col gap-2"
                    label="College"
                    labelClassName="font-poppins text-pup-maroon2 text-lg tracking-tight"
                    onChange={(selected) => setSelectedColleges(selected)}
                />
            </div>

            {/* Org Cards */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                {currentItems.map((org, index) => (
                    <div key={index} className="flex justify-center">
                        <OrgCards
                            orgName={org.name}
                            description={org.description}
                            category={org.category}
                            followers={org.followers}
                            imageSrc={org.imageSrc}
                        />
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={`px-4 py-2 rounded-full text-pup-maroon2 border border-pup-maroon1 hover:bg-pup-maroon1 hover:text-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Previous
                </button>
                <span className="text-base font-medium">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={`px-4 py-2 rounded-full text-pup-maroon2 border border-pup-maroon1 hover:bg-pup-maroon1 hover:text-white ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default OrgsView;
