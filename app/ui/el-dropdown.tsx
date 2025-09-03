import React, { createContext, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface ElDropdownProps {
    children: React.ReactNode;
    buttonContent?: React.ReactNode;
}

// Define the shape of your context
interface ToggleContextType {
    toggled: boolean;
    setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create context with a proper type
export const toggleContext = createContext<ToggleContextType>({
    toggled: false,
    setToggled: () => { },
});

export default function ElDropdown({ children, buttonContent }: ElDropdownProps) {
    const [toggled, setToggled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Handle outside clicks
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setToggled(false);
            }
        }

        // Add event listener when the dropdown is open
        if (toggled) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [toggled]);

    return (
        <toggleContext.Provider value={{ toggled, setToggled }}>
            <div className="relative inline-block" ref={dropdownRef}>
                <button
                    className='flex items-center rounded-full bg-orange-100 border-2 border-black p-3 text-lg font-medium hover:bg-yellow-950 hover:text-yellow-50 md:p-2 md:px-3'
                    onClick={() => setToggled(!toggled)}>
                    {buttonContent}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
                {toggled && (
                    <div
                        className="absolute right-0 z-10 mt-2 min-w-full origin-top-right rounded-xl bg-orange-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        style={{ width: buttonRef.current ? `${buttonRef.current.offsetWidth}px` : 'auto' }}
                    >
                        {children}
                    </div>
                )}
            </div>
        </toggleContext.Provider>
    );
}