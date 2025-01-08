"use client";

import { useState } from "react";
import Fuse from "fuse.js"; // Import Fuse.js for fuzzy search
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { defaultColleges } from "@/assets/colleges/defaultCollege";

interface MultiSelectInputProps {
    label?: string;
    ButtonClassName?: string;
    Data?: { value: string; label: string }[];
    value?: string[];
    onChange?: (value: string[]) => void;
    divClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    placeholder?: string;
}

export default function MultiSelectInput({
    ButtonClassName = "",
    Data= defaultColleges,
    value = [],
    onChange,
    divClassName = "",
    labelClassName = "",
    label = "",
    inputClassName = "text-center",
    placeholder = "Select...",
}: MultiSelectInputProps) {
    const [selectedValues, setSelectedValues] = useState<string[]>(value);
    const [open, setOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const fuse = new Fuse(Data, { keys: ["label"], threshold: 0.3 }); // Fuzzy search configuration
    const filteredData = searchQuery
        ? fuse.search(searchQuery).map((result) => result.item)
        : Data;

    const handleSelect = (value: string) => {
        const isSelected = selectedValues.includes(value);
        const newSelection = isSelected
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];
        setSelectedValues(newSelection);
        console.log("Selected values after handleSelect:", newSelection)
        onChange?.(newSelection);
    };

    const handleSelectAll = () => {
        if (selectedValues.length === Data.length) {
            setSelectedValues([]);
        } else {
            setSelectedValues(Data.map((item) => item.value));
        }
        onChange?.(selectedValues);
    };

    const isAllSelected = selectedValues.length === Data.length;

    return (
        <div className={divClassName}>
            <Label className={cn(labelClassName, "font-semibold")}>{label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(ButtonClassName, inputClassName, "justify-between")}
                    >
                        {selectedValues.length > 0
                            ? `${selectedValues.length} selected`
                            : `${placeholder}`}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-5 rounded-xl">
                    <Command>
                        <CommandInput
                            placeholder="Search..."
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                            className="h-9"
                        />
                        <CommandList>
                            <CommandEmpty>No options found.</CommandEmpty>
                            <CommandGroup>
                                {/* "Select All" Option */}
                                <CommandItem onSelect={handleSelectAll}>
                                    Select All
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            isAllSelected ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                                {filteredData.map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        onSelect={() => handleSelect(item.value)}
                                    >
                                        {item.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                selectedValues.includes(item.value)
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
