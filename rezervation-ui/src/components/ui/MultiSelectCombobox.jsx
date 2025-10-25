import React, { useState, useMemo } from 'react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Checkbox } from './checkbox';
import { Input } from './input';
import { ChevronDown } from 'lucide-react';

export function MultiSelectCombobox({
  items, // Array of { id: string, name: string } or just strings
  selectedValues, // Array of selected item IDs/names
  onValuesChange, // Function to update selected values (receives new array)
  placeholder,
  searchPlaceholder,
  disabled,
  t, // For translation
}) {
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false); // Popover'ın açık/kapalı durumunu yöneteceğiz

  const filteredItems = useMemo(() => {
    if (!searchValue) return items;
    return items.filter(item => {
      const itemName = typeof item === 'string' ? item : item.name;
      return itemName.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [items, searchValue]);

  const handleItemChange = (item, isChecked) => {
    const itemId = typeof item === 'string' ? item : item.id;
    let newValues;
    if (isChecked) {
      newValues = [...selectedValues, itemId];
    } else {
      newValues = selectedValues.filter(val => val !== itemId);
    }
    onValuesChange(newValues);
  };

  const selectedItemNames = useMemo(() => {
    if (selectedValues.length === 0) return [];
    return selectedValues.map(selectedValueId => {
      const foundItem = items.find(item => {
        const itemId = typeof item === 'string' ? item : item.id;
        return itemId === selectedValueId;
      });
      return typeof foundItem === 'string' ? foundItem : foundItem?.name;
    }).filter(Boolean); // undefined veya null değerleri filtrele
  }, [selectedValues, items]);

  const displaySelectedText = selectedItemNames.length > 0
    ? selectedItemNames.join(', ')
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}> 
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between" disabled={disabled}>
          <span className="truncate">{displaySelectedText}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2"> {/* onPointerDownOutside kaldırıldı, dışarı tıklayınca kapanması bekleniyor */}
        <Input
          placeholder={searchPlaceholder || t?.search || "Ara..."}
          className="h-9 mb-2"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="text-sm font-medium leading-none mb-2">{placeholder}</div>
        <div className="grid gap-2 max-h-48 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const itemId = typeof item === 'string' ? item : item.id;
              const itemName = typeof item === 'string' ? item : item.name;
              return (
                <div key={itemId} className="flex items-center space-x-2"> 
                  <Checkbox
                    id={`multiselect-${itemId}`}
                    checked={selectedValues.includes(itemId)}
                    onCheckedChange={(isChecked) => {
                      console.log(`Checkbox for ${itemName} (${itemId}) changed to: ${isChecked}`); // Debug log hala burada
                      handleItemChange(item, isChecked);
                    }}
                  />
                  <label
                    htmlFor={`multiselect-${itemId}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {itemName}
                  </label>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500">{t?.noItemsFound || "Öğe bulunamadı."}</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
