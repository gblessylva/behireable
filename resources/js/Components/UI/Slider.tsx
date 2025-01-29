import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

interface SliderProps {
    min: number;
    max: number;
    value: number[];
    onChange: (value: number[]) => void;
}

export function Slider({ min, max, value, onChange }: SliderProps) {
    return (
        <SliderPrimitive.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={value}
            max={max}
            min={min}
            step={100}
            onValueChange={onChange}
        >
            <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-1">
                <SliderPrimitive.Range className="absolute bg-[#355E3B] rounded-full h-full" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block w-4 h-4 bg-white border border-[#355E3B] shadow-lg rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#355E3B] focus:ring-offset-2" />
            <SliderPrimitive.Thumb className="block w-4 h-4 bg-white border border-[#355E3B] shadow-lg rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#355E3B] focus:ring-offset-2" />
        </SliderPrimitive.Root>
    );
}