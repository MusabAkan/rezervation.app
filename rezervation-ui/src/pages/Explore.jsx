
import React, { useMemo, useState } from 'react';
import { 
    Box, 
    Grid, 
    Card, 
    Typography, 
    Chip, 
    Rating, 
    Button, 
    CardContent, 
    CardActions, 
    Toolbar, 
    Fab // Yüzen buton için Fab eklendi
} from '@mui/material';
import { FilterList as FilterListIcon, CalendarToday, Info } from '@mui/icons-material';
import { INITIAL_BUSINESSES_DATA } from '../data/mockData';
import { useAppContext } from '../App';
import FilterSidebar from '../components/FilterSidebar';

export default function Explore() {
    const { t } = useAppContext();

    const [isFilterOpen, setFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const handleFilterChange = (key, value) => {
        setSelectedFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const results = useMemo(() => {
        return INITIAL_BUSINESSES_DATA.filter(business => {
            if (searchQuery && !business.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (selectedFilters.category && selectedFilters.category.length > 0 && !selectedFilters.category.includes(business.category)) return false;
            if (selectedFilters.price && typeof business.price === 'number') {
                if (business.price < selectedFilters.price.min || business.price > selectedFilters.price.max) return false;
            }
            if (selectedFilters.rating && business.rating < selectedFilters.rating) return false;
            return true;
        });
    }, [selectedFilters, searchQuery]);

    return (
        // Ana kutu, yüzen butonu konumlandırmak için 'relative' olmalı
        <Box sx={{ position: 'relative', display: 'flex' }}>
            <FilterSidebar 
                open={isFilterOpen} 
                onClose={() => setFilterOpen(false)}
                filters={selectedFilters}
                onFilterChange={handleFilterChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
            />

            {/* Yüzen Filtre Butonu */}
            {/* Panel kapalıyken görünür olacak */}
            {!isFilterOpen && (
                <Fab
                    color="primary"
                    aria-label="open filter drawer"
                    onClick={() => setFilterOpen(true)}
                    sx={{
                        position: 'fixed', // Sayfaya göre sabitlenir
                        top: '50%', // Dikeyde ortalanır
                        left: 0,
                        transform: 'translateY(-50%)', // Tam ortalamak için
                        borderTopLeftRadius: 0, // Sol kenara yapışık görünmesi için
                        borderBottomLeftRadius: 0,
                        zIndex: (theme) => theme.zIndex.drawer -1 // Panelin arkasında kalması için
                    }}
                >
                    <FilterListIcon />
                </Fab>
            )}

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {/* Toolbar'dan filtre butonu kaldırıldı */}
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {t.explore}
                    </Typography>
                </Toolbar>
                
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {results.map(b => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={b.id}>
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
                     {results.length === 0 && (
                        <Grid item xs={12} sx={{textAlign: 'center', mt: 5}}>
                            <Typography variant="h6">{t.noResultsFound}</Typography>
                            <Typography color="text.secondary">{t.tryDifferentFilters}</Typography>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}
