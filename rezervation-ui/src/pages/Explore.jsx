import React, { useMemo, useState } from 'react';
import { Input, Select, Slider, Button, Card, Grid, Chip, Rating, Typography, MenuItem, CardContent, CardActions, Box, Paper } from '@mui/material';
import { FilterList, Clear, LocationOn, CalendarToday, Info } from '@mui/icons-material';
import { CATEGORIES, INITIAL_BUSINESSES_DATA } from '../data/mockData';
import { useAppContext } from '../App';

function AdBanner() {
    const { t } = useAppContext();
    return (
        <Card variant="outlined" sx={{ my: 4, p: 2, textAlign: 'center', backgroundColor: 'action.hover' }}>
            <Typography variant="subtitle1">{t.adSpace}</Typography>
        </Card>
    );
}

function Filters({ values, setValues }) {
    const { t } = useAppContext();
    const [tmp, setTmp] = useState(values);

    const categoryOptions = CATEGORIES.map(c => ({ value: c.id, label: c.name }));
    const subCategoryOptions = useMemo(() => {
        const selectedCategory = CATEGORIES.find(c => c.id === tmp.cat);
        return selectedCategory ? selectedCategory.subs.map(s => ({ value: s, label: s })) : [];
    }, [tmp.cat]);

    const handleCategoryChange = (selectedOptionValue) => {
        setTmp(prev => ({ ...prev, cat: selectedOptionValue, sub: [] }));
    };

    const handleSubcategoriesChange = (selectedOptionValues) => {
        setTmp(prev => ({ ...prev, sub: selectedOptionValues || [] }));
    };

    const handleDistanceChange = (newRange) => {
        setTmp(prev => ({ ...prev, distance: newRange }));
    };

    const handleRatingChange = (newRange) => {
        setTmp(prev => ({ ...prev, rating: newRange }));
    };

    const apply = () => setValues(tmp);
    const clear = () => {
        const cleared = { q: '', distance: [0, 50], rating: [0, 5], price: 'any', cat: 'all', sub: [] };
        setTmp(cleared);
        setValues(cleared);
    };

    return (
        <Paper variant="outlined" sx={{ mb: 4, p: 2 }}>
            <Typography variant="h6" gutterBottom>{t.filters}</Typography>
            <Grid container spacing={2}>
                {/* Arama Kutusu - Tüm satırı kaplasın */}
                <Grid item xs={12}>
                    <Input value={tmp.q} onChange={e => setTmp({ ...tmp, q: e.target.value })} placeholder={`${t.search}...`} fullWidth />
                </Grid>

                {/* Kategori ve Alt Kategori - Yan yana, her biri yarım satır */}
                <Grid item xs={12} sm={6}>
                    <Select value={tmp.cat} onChange={e => setTmp({ ...tmp, cat: e.target.value, sub: [] })} displayEmpty fullWidth>
                        <MenuItem value="all">{t.categories}</MenuItem>
                        {categoryOptions.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select multiple value={tmp.sub} onChange={e => setTmp({ ...tmp, sub: e.target.value })} disabled={!tmp.cat || tmp.cat === 'all'} fullWidth displayEmpty renderValue={(selected) => selected.join(', ')}>
                        <MenuItem disabled value="">{t.selectSubCategory}</MenuItem>
                        {subCategoryOptions.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
                    </Select>
                </Grid>

                {/* Mesafe - Kendi satırında */}
                <Grid item xs={12}>
                    <Typography variant="body2">{t.distance} ({tmp.distance[0]} - {tmp.distance[1]} km)</Typography>
                    <Slider value={tmp.distance} onChange={(e, val) => setTmp({...tmp, distance: val})} min={0} max={50} valueLabelDisplay="auto" />
                </Grid>
                {/* Puan - Kendi satırında */}
                <Grid item xs={12}>
                    <Typography variant="body2">{t.rating} ({tmp.rating[0]} - {tmp.rating[1]})</Typography>
                    <Slider value={tmp.rating} onChange={(e, val) => setTmp({...tmp, rating: val})} min={0} max={5} step={0.5} valueLabelDisplay="auto" />
                </Grid>

                {/* Fiyat Seçimi - Tüm satırı kaplasın */}
                <Grid item xs={12}>
                    <Select value={tmp.price} onChange={e => setTmp({ ...tmp, price: e.target.value })} fullWidth>
                        <MenuItem value="any">{t.price}: Hepsi</MenuItem>
                        <MenuItem value="$">$</MenuItem>
                        <MenuItem value="$$">$$</MenuItem>
                        <MenuItem value="$$$">$$$</MenuItem>
                    </Select>
                </Grid>

                {/* Butonlar - Tüm satırı kaplasın, sağa hizalı */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button variant="contained" onClick={apply} startIcon={<FilterList />}>{t.apply}</Button>
                    <Button onClick={clear} sx={{ ml: 1 }}>{t.clear}</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default function Explore() {
    const { t } = useAppContext();
    const [filters, setFilters] = useState({ q: '', distance: [0, 50], rating: [0, 5], price: 'any', cat: 'all', sub: [] });

    const results = useMemo(() => INITIAL_BUSINESSES_DATA.filter(b => {
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
    }), [filters]);

    return (
        <Box>
            <Filters values={filters} setValues={setFilters} />
            <AdBanner />
            <Grid container spacing={3}>
                {results.map(b => (
                    <Grid item xs={12} sm={6} md={4} key={b.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="h6">{b.name}</Typography>
                                    <Chip label={`${b.distanceKm} ${t.km}`} size="small" />
                                </Box>
                                <Rating value={b.rating} readOnly size="small" />
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{b.description}</Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <Button size="small" href={`#book/${b.id}`} startIcon={<CalendarToday />}>{t.bookNow}</Button>
                                <Button size="small" href={`#business/${b.id}`} startIcon={<Info />}>{t.seeDetails}</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
