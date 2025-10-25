import React, { useMemo, useState } from 'react';
import { Button } from "../components/ui//button";
import { Card, CardContent } from "../components/ui//card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui//badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui//select";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Filter, MapPin, CalendarPlus } from "lucide-react";
import Stars from '../components/common/Stars';
import AdBanner from "../components/common/AdBanner";
import { CATEGORIES } from '../data/mockData';
import { SingleSelectCombobox } from '../components/ui/SingleSelectCombobox'; 
import { MultiSelectCombobox } from '../components/ui/MultiSelectCombobox'; 
import { RangeSlider } from '../components/ui/RangeSlider'; // RangeSlider import edildi

function Filters({ t, values, setValues }) {
  const [tmp, setTmp] = useState(() => ({ 
    ...values,
    distance: values.distance !== undefined ? values.distance : [0, 50], // Mesafe aralığı olarak güncellendi
    rating: values.rating !== undefined ? values.rating : [0, 5], // Puan aralığı olarak güncellendi
    sub: Array.isArray(values.sub) ? values.sub : [] 
  }));

  const handleCategoryChange = (value) => {
    setTmp(prev => ({ ...prev, cat: value, sub: [] })); 
  };

  const handleSubcategoriesChange = (newSubs) => {
    setTmp(prev => ({ ...prev, sub: newSubs }));
  };

  const handleDistanceChange = (newRange) => {
    setTmp(prev => ({ ...prev, distance: newRange }));
  };

  const handleRatingChange = (newRange) => {
    setTmp(prev => ({ ...prev, rating: newRange }));
  };

  const apply = () => setValues(tmp);
  const clear = () => {
    const cleared = { q: '', distance: [0, 50], rating: [0, 5], price: 'any', cat: 'all', sub: [] }; // Temizleme değerleri güncellendi
    setTmp(cleared);
    setValues(cleared);
  };

  const selectedCategory = CATEGORIES.find(c => c.id === tmp.cat);
  const availableSubcategories = selectedCategory ? selectedCategory.subs : [];

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input value={tmp.q} onChange={e => setTmp({ ...tmp, q: e.target.value })} placeholder={`${t.search}...`} />
        
        <SingleSelectCombobox
          items={CATEGORIES}
          selectedValue={tmp.cat}
          onValueChange={handleCategoryChange}
          placeholder={t.categories}
          searchPlaceholder={t.searchCategories}
          t={t}
        />

        <MultiSelectCombobox
          items={availableSubcategories} 
          selectedValues={tmp.sub}
          onValuesChange={handleSubcategoriesChange}
          placeholder="Alt Kategoriler"
          searchPlaceholder="Alt Kategorileri Ara..."
          disabled={tmp.cat === 'all'}
          t={t}
        />

        {/* Mesafe Filtresi (RangeSlider) */}
        <RangeSlider
          label={t.distance || "Mesafe"}
          min={0}
          max={50}
          value={tmp.distance}
          onValueChange={handleDistanceChange}
          step={1}
          unit=" km"
          t={t}
        />

        {/* Puan Filtresi (RangeSlider) */}
        <RangeSlider
          label={t.rating || "Puan"}
          min={0}
          max={5}
          value={tmp.rating}
          onValueChange={handleRatingChange}
          step={0.5}
          unit=""
          t={t}
        />

        <Select value={tmp.price} onValueChange={(v) => setTmp({ ...tmp, price: v })}><SelectTrigger><SelectValue placeholder={t.price} /></SelectTrigger><SelectContent><SelectItem value="any">{t.price}: Hepsi</SelectItem><SelectItem value="$">$</SelectItem><SelectItem value="$$">$$</SelectItem><SelectItem value="$$$">$$$</SelectItem></SelectContent></Select>
      </div>
      <div className="mt-4 flex gap-2"><Button className="bg-primary hover:bg-primary/90" onClick={apply}><Filter className="h-4 w-4 mr-2" />{t.apply}</Button><Button variant="outline" onClick={clear}>{t.clear}</Button></div>
    </div>
  );
}

function BusinessCard({ t, b }) {
  const category = CATEGORIES.find(c => c.id === b.category);
  return (
    <Card
      className="w-full max-w-sm bg-white hover:shadow-md transition overflow-hidden dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600 h-52 flex flex-col">
      <CardContent className="p-4 grid grid-cols-[64px,1fr] gap-4 flex-grow items-center">
        <Avatar
          className="h-16 w-16 border self-start mt-2"><AvatarFallback>{b.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</AvatarFallback></Avatar>
        <div>
          <div className="flex items-start justify-between">
            <div>
              <a href={`#business/${b.id}`}
                className="font-semibold leading-tight text-slate-800 dark:text-slate-200 hover:underline">{b.name}</a>
              <div className="text-xs text-slate-500 dark:text-slate-400">{category?.name}</div>
              <div className="mt-1"><Stars value={b.rating} /></div>
            </div>
            <div className="text-right flex flex-col items-end">
              <Badge variant="secondary" className="mb-1"><MapPin
                className="h-3 w-3 mr-1" /> {b.distanceKm} {t.km}</Badge>
              <div className="text-lg font-bold text-slate-600 dark:text-slate-400">{b.priceLevel}</div>
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{b.description}</p>
          <div className="mt-3 flex flex-wrap gap-2 items-center justify-end">
            <Button size="sm" asChild><a href={`#book/${b.id}`}><CalendarPlus className="h-4 w-4 mr-2" />{t.bookNow}</a></Button>
            <Button size="sm" variant="secondary" asChild><a
              href={`#business/${b.id}`}>{t.seeDetails}</a></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Explore({ t, lang, businesses }) {
  const [filters, setFilters] = useState({ q: '', distance: [0, 50], rating: [0, 5], price: 'any', cat: 'all', sub: [] }); // Başlangıç filtre değerleri güncellendi

  const results = useMemo(() => businesses.filter(b => {
    const [minKm, maxKm] = filters.distance;
    const [minRate, maxRate] = filters.rating;

    return (
      (filters.cat === 'all' || b.category === filters.cat) &&
      (filters.sub.length === 0 || (b.subs && filters.sub.every(s => b.subs.includes(s)))) &&
      (filters.price === 'any' || b.priceLevel === filters.price) &&
      (b.distanceKm >= minKm && b.distanceKm <= maxKm) && 
      (b.rating >= minRate && b.rating <= maxRate) && 
      (filters.q === '' || b.name.toLowerCase().includes(filters.q.toLowerCase()))
    );
  }), [filters, businesses]);

  return (
    <div id="explore" className="max-w-7xl mx-auto px-4 py-8">
      <div className="p-4 rounded-lg border bg-white mb-6 dark:bg-slate-800 dark:border-slate-700"><Filters t={t}
        values={filters}
        setValues={setFilters} />
      </div>
      <AdBanner t={t} />
      <div className="flex flex-wrap justify-center gap-4">{results.map(b => (
        <BusinessCard key={b.id} t={t} b={b} />))}</div>
    </div>
  );
}
