import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HomeButtons() {
    const buttonLabels = [
        { label: "Feature", path: "/feature" },
        { label: "Events", path: "/events" },
        { label: "Orgs", path: "/orgs" },
    ];

    return (
        <div className="flex gap-2">
            {buttonLabels.map(({ label, path }) => (
                <NavLink to={path} key={label}>
                    {({ isActive }) => (
                        <Button
                            variant={isActive ? "default" : "outline"}
                            className={`font-museo text-base ${
                                isActive
                                    ? "bg-pup-maroon2 hover:bg-pup-maroon3/65 text-white"
                                    : "border-black text-pup-maroon2 hover:bg-pup-maroon3 hover:text-white"
                            }`}
                        >
                            {label}
                        </Button>
                    )}
                </NavLink>
            ))}
        </div>
    );
}
