
import React, { useMemo, useState, useEffect } from 'react';
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
    Fab,
    CircularProgress
} from '@mui/material';
import { FilterList as FilterListIcon, CalendarToday, Info } from '@mui/icons-material';
import { useAppContext } from '../App';
import FilterSidebar from '../components/FilterSidebar';
import { api } from '../services/api'; // Yeni API servisimizi import ediyoruz

const filterStructure = [
    {
        key: 'category',
        displayName: 'Kategori',
        type: 'checkbox',
        options: ['Güzellik & Bakım', 'Yeme & İçme', 'Spor & Sağlık', 'Eğlence']
    },
    {
        key: 'rating',
        displayName: 'Minimum Puan',
        type: 'rating',
        max: 5
    }
];

export default function Explore() {
    const { t } = useAppContext();

    const [isFilterOpen, setFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const [allBusinesses, setAllBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                setIsLoading(true);
                // fetch bloğu yerine artık merkezi api servisimizi kullanıyoruz.
                const data = await api.getBusinesses();
                setAllBusinesses(data);
            } catch (e) {
                setError(e.message);
                console.error("Veri çekme hatası:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    const handleFilterChange = (key, value) => {
        setSelectedFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredResults = useMemo(() => {
        return allBusinesses.filter(business => {
            if (searchQuery && !business.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (selectedFilters.category && selectedFilters.category.length > 0 && !selectedFilters.category.includes(business.category)) return false;
            if (selectedFilters.rating && business.rating < selectedFilters.rating) return false;
            return true;
        });
    }, [selectedFilters, searchQuery, allBusinesses]);

    const renderContent = () => {
        if (isLoading) {
            return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
        }

        if (error) {
            return <Typography color="error" sx={{ mt: 10, textAlign: 'center' }}>Veri yüklenirken bir hata oluştu: {error}</Typography>;
        }

        if (filteredResults.length === 0) {
            return (
                <Grid item xs={12} sx={{textAlign: 'center', mt: 5}}>
                    <Typography variant="h6">{t.noResultsFound}</Typography>
                    <Typography color="text.secondary">{t.tryDifferentFilters}</Typography>
                </Grid>
            );
        }

        return (
            <Grid container spacing={3} sx={{ mt: 2 }}>
                {filteredResults.map(b => (
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
            </Grid>
        );
    };

    return (
        <Box sx={{ position: 'relative', display: 'flex' }}>
            <FilterSidebar 
                open={isFilterOpen} 
                onClose={() => setFilterOpen(false)}
                filters={selectedFilters}
                onFilterChange={handleFilterChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                filterStructure={filterStructure}
            />

            {!isFilterOpen && (
                <Fab
                    color="primary"
                    aria-label="open filter drawer"
                    onClick={() => setFilterOpen(true)}
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: 0,
                        transform: 'translateY(-50%)',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        zIndex: (theme) => theme.zIndex.drawer -1
                    }}
                >
                    <FilterListIcon />
                </Fab>
            )}

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {t.explore}
                    </Typography>
                </Toolbar>
                {renderContent()}
            </Box>
        </Box>
    );
}
