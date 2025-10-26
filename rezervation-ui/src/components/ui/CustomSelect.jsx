import React from 'react';
import Select from 'react-select';

/**
 * react-select kütüphanesini projenin stil sistemine (Tailwind) uyumlu hale getiren
 * ve saydam arka plan gibi özel stilleri uygulayan yeniden kullanılabilir bir bileşen.
 */
export function CustomSelect(props) {
  return (
    <Select
      classNamePrefix="custom-select" // Global CSS'teki stilleri uygulamak için önek
      {...props} // Gelen tüm propları (isMulti, options, value, onChange vb.) aktar
    />
  );
}
