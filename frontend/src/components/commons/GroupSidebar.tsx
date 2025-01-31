import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

/** sample org picture TODO : remove in prod*/
import Org1 from "@/sample_data/sample_orgs/pup_circle.png";
import Org2 from "@/sample_data/sample_orgs/awscc_circle.png";
import Org3 from "@/sample_data/sample_orgs/gdg_circle.png";
import Org4 from "@/sample_data/sample_orgs/cisco_connect.jpg";

export default function GroupSidebar() {
    const sampleOrgs = [Org2];

    return (
        <div
          className=" w-[118px] min-h-screen bg-gradient-to-b from-[#FF9E28] to-[#FFFFFF] shadow-lg"
        >
          {/* Sidebar header */}
          <div className="flex items-center p-5">
            <span className="text-xl text-center font-museo font-bold leading-[1rem] text-pup-maroon1">
              Your Groups
            </span>
          </div>
    
          {/* Organization icons and Add Group button */}
          <div className="mt-6 flex flex-col items-center gap-4">
            {/* Organizations Container */}
            <div className="flex flex-col items-center gap-4">
              {/* Sample Organizations */}
              {sampleOrgs.map((org, index) => (
                <Link
                  key={index}
                  to="/org/StudentView"
                  className="w-[60px] h-[60px] bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    src={org}
                    alt={`Org ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </Link>
              ))}
            </div>
      
          </div>
        </div>
      );
}
