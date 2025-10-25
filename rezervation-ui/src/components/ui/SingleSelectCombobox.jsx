import React, { useState, useMemo } from 'react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Input } from './input';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn'; // cn utility fonksiyonunu import ediyoruz

export function SingleSelectCombobox({
  items, // Array of { id: string, name: string } or just strings
  selectedValue, // ID or name of the selected item
  onValueChange, // Function to update selected value
  placeholder,
  searchPlaceholder,
  disabled,
  t, // For translation
}) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchValue) return items;
    return items.filter(item => {
      const itemName = typeof item === 'string' ? item : item.name;
      return itemName.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [items, searchValue]);

  const displayValue = selectedValue && selectedValue !== 'all'
    ? (typeof items[0] === 'string'
      ? items.find(item => item === selectedValue)
      : items.find(item => item.id === selectedValue)?.name)
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {displayValue}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Input
          placeholder={searchPlaceholder || t?.search || "Ara..."}
          className="h-9"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="max-h-60 overflow-y-auto">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              onValueChange('all');
              setOpen(false);
              setSearchValue('');
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selectedValue === 'all' ? "opacity-100" : "opacity-0"
              )}
            />
            {t?.all || "Tümü"}
          </Button>
          {filteredItems.map((item) => {
            const itemId = typeof item === 'string' ? item : item.id;
            const itemName = typeof item === 'string' ? item : item.name;
            return (
              <Button
                variant="ghost"
                key={itemId}
                onClick={() => {
                  onValueChange(itemId);
                  setOpen(false);
                  setSearchValue('');
                }}
                className="w-full justify-start"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedValue === itemId ? "opacity-100" : "opacity-0"
                  )}
                />
                {itemName}
              </Button>
            );
          })}
          {filteredItems.length === 0 && (
            <p className="p-2 text-sm text-gray-500 text-center">
              {t?.noItemsFound || "Öğe bulunamadı."}
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}