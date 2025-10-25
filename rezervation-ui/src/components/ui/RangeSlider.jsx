import React from 'react';
import { Badge } from './badge';

export function RangeSlider({
  label,
  min,
  max,
  value, // [minValue, maxValue]
  onValueChange,
  step,
  unit,
  t,
}) {
  const [minValue, maxValue] = value;

  const handleMinChange = (e) => {
    const newMin = Number(e.target.value);
    onValueChange([Math.min(newMin, maxValue), maxValue]);
  };

  const handleMaxChange = (e) => {
    const newMax = Number(e.target.value);
    onValueChange([minValue, Math.max(newMax, minValue)]);
  };

  return (
    <div className="flex flex-col gap-1 p-2 border rounded-md"> {/* Kapsayıcı uzatıldı, dolgu ve kenarlık eklendi */}
      <div className="flex items-center justify-center text-center"> {/* Yazı ortalandı */}
        <Badge variant="outline" className="flex-grow justify-center"> {/* Badge genişliği ayarlandı ve ortalandı */}
          {label} <span className="font-medium ml-1">{minValue}{unit} - {maxValue}{unit}</span>
        </Badge>
      </div>
      <div className="flex items-center gap-2 mt-2"> {/* Kaydırıcılar arasına boşluk eklendi */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className="w-full h-full accent-primary"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="w-full h-full accent-primary"
        />
      </div>
    </div>
  );
}
