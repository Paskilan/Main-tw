"use client";

import { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandList, CommandGroup, CommandItem, CommandEmpty } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect } from 'react';
import { cn } from "@/lib/utils";

interface College {
    collegeId: number;
    collegeName: string;
}

interface SingleSelectInputProps {
    label?: string;
    divClassName?: string;
    ButtonClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    placeholder?: string;
    noOptionsMessage?: string;
    Data?: { value: string; label: string }[];
    value?: string;
    onChange?: (value: string) => void;
}

export default function SingleSelectInput({
    label = "Select your College",
    onChange,
}: SingleSelectInputProps) {
    const [colleges, setColleges] = useState<{ value: string; label: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/Account/colleges`);
                console.log(response.data);
                // Transform backend data to match component's expected format
                const formattedColleges = response.data.map((college: College) => ({
                    value: college.collegeId.toString(),
                    label: college.collegeName
                }));

                setColleges(formattedColleges);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch colleges:", error);
                setIsLoading(false);
            }
        };

        fetchColleges();
    }, []);

    const handleSelect = (currentValue: string) => {
        const newValue = currentValue === selectedValue ? "" : currentValue;
        setSelectedValue(newValue);
        setOpen(false);
        onChange?.(newValue);
    };

    return (
        <div className="grid gap-2">
            <Label className="font-semibold">{label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open ? "true" : "false"}
                        className="justify-between"
                    >
                        {isLoading ? (
                            "Loading colleges..."
                        ) : (
                            selectedValue
                                ? colleges.find((item) => item.value === selectedValue)?.label
                                : "Select your college..."
                        )}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    {isLoading ? (
                        <div className="p-2 text-center">Loading colleges...</div>
                    ) : (
                        <Command>
                            <CommandList>
                                {colleges.length === 0 ? (
                                    <CommandEmpty>No colleges found</CommandEmpty>
                                ) : (
                                    <CommandGroup>
                                        {colleges.map((item) => (
                                            <CommandItem
                                                key={item.value}
                                                value={item.value}
                                                onSelect={() => handleSelect(item.value)}
                                            >
                                                {item.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        selectedValue === item.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                            </CommandList>
                        </Command>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
}