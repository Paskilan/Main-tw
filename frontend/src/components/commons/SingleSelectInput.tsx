"use client";

import { useState } from "react";
import Fuse from "fuse.js"; // For optional fuzzy search
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { defaultColleges } from "@/assets/colleges/defaultCollege";



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
  divClassName = "grid gap-2",
  labelClassName = "font-semibold",
  ButtonClassName = "",
  inputClassName = "",
  placeholder = "Select your college...",
  noOptionsMessage = "No College Found",
  Data = defaultColleges,
  value = "",
  onChange,
}: SingleSelectInputProps) {
  const [selectedValue, setSelectedValue] = useState<string>(value);
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fuse = new Fuse(Data, { keys: ["label"], threshold: 0.3 });
  const filteredData = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : Data;

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === selectedValue ? "" : currentValue;
    setSelectedValue(newValue);
    setOpen(false);
    onChange?.(newValue);
  };

  return (
    <div className={divClassName}>
      <Label className={cn(labelClassName)}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open ? "true" : "false"}
            className={cn(ButtonClassName, inputClassName, "justify-between")}
          >
            {selectedValue
              ? Data.find((item) => item.value === selectedValue)?.label
              : placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-9 text-left"
            />
            <CommandList>
              {filteredData.length === 0 ? (
                <CommandEmpty>{noOptionsMessage}</CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredData.map((item) => (
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
        </PopoverContent>
      </Popover>
    </div>
  );
}
