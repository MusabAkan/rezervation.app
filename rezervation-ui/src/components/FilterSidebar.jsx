
import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Slider,
    Rating,
    Divider,
    Toolbar,
    InputBase,
    IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search as SearchIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';

const drawerWidth = 280;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.action.hover,
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
  margin: theme.spacing(1),
  width: 'calc(100% - 16px)',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function FilterSidebar({ open, onClose, filters, onFilterChange, searchQuery, onSearchChange, filterStructure }) {

    const handleCheckboxChange = (filterKey, option) => {
        const currentSelection = filters[filterKey] || [];
        const newSelection = currentSelection.includes(option)
            ? currentSelection.filter(item => item !== option)
            : [...currentSelection, option];
        onFilterChange(filterKey, newSelection);
    };

    const handleRangeChange = (filterKey, newValue) => {
        onFilterChange(filterKey, { min: newValue[0], max: newValue[1] });
    };

    const handleRatingChange = (filterKey, newValue) => {
        onFilterChange(filterKey, newValue);
    };

    const renderFilter = (filter) => {
        switch (filter.type) {
            case 'checkbox':
                return (
                    <List dense>
                        {filter.options.map(option => (
                            <ListItem
                                key={option}
                                secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        onChange={() => handleCheckboxChange(filter.key, option)}
                                        checked={(filters[filter.key] || []).includes(option)}
                                    />
                                }
                                disablePadding
                            >
                                <ListItemText primary={option} />
                            </ListItem>
                        ))}
                    </List>
                );
            case 'range':
                const currentValue = filters[filter.key] || { min: filter.min, max: filter.max };
                return (
                    <Box sx={{ px: 2, pt: 2 }}>
                        <Slider
                            value={[currentValue.min, currentValue.max]}
                            onChange={(e, newValue) => handleRangeChange(filter.key, newValue)}
                            valueLabelDisplay="auto"
                            min={filter.min}
                            max={filter.max}
                            step={100}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="caption">{currentValue.min} TL</Typography>
                            <Typography variant="caption">{currentValue.max} TL</Typography>
                        </Box>
                    </Box>
                );
            case 'rating':
                return (
                    <Box sx={{ px: 2, pt: 1 }}>
                        <Rating
                            value={filters[filter.key] || 0}
                            onChange={(e, newValue) => handleRatingChange(filter.key, newValue)}
                        />
                    </Box>
                );
            default:
                return null;
        }
    };

    const drawerContent = (
        <div>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                 <Typography variant="h6" fontWeight="bold">Filtreler</Typography>
                 <IconButton onClick={onClose}>
                    <ChevronLeftIcon />
                 </IconButton>
            </Toolbar>
            <Divider />
            <Search>
                <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                <StyledInputBase
                    placeholder="İşletme veya hizmet ara..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={onSearchChange}
                />
            </Search>
            <Divider sx={{ my: 1 }} />
            <List>
                {filterStructure && filterStructure.map(filter => (
                    <React.Fragment key={filter.key}>
                        <ListItem>
                            <ListItemText primary={<Typography variant="subtitle1" fontWeight="bold">{filter.displayName}</Typography>} />
                        </ListItem>
                        {renderFilter(filter)}
                        <Divider sx={{ my: 2 }} />
                    </React.Fragment>
                ))}
            </List>
        </div>
    );

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            anchor="left"
            open={open}
            variant="temporary"
            onClose={onClose} 
        >
            {drawerContent}
        </Drawer>
    );
}
