import React, { useMemo, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Tabs, Tab, List, ListItem, ListItemText, Avatar, Button, Rating, Chip } from '@mui/material';
import { LocationOn, CalendarToday, Message } from '@mui/icons-material';
import { useAppContext } from '../App';
import { MOCK_SERVICES, INITIAL_FORUM_POSTS } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default function BusinessProfile() {
    const { t, business } = useAppContext();
    const [tabValue, setTabValue] = useState(0);

    const services = MOCK_SERVICES[business.id] || [];

    return (
        <Card>
            <CardMedia
                component="img"
                height="300"
                image={`https://placehold.co/800x300/e2e8f0/64748b?text=${business.name.replace(/\s/g, '+')}`}
                alt={business.name}
            />
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ width: 100, height: 100, mr: 2 }} src={business.photo}>{business.name[0]}</Avatar>
                    <Box>
                        <Typography variant="h4">{business.name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                            <LocationOn fontSize="small" />
                            <Typography variant="body2" sx={{ ml: 0.5 }}>{business.address}</Typography>
                        </Box>
                        <Rating value={business.rating} readOnly sx={{ mt: 1 }} />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Button variant="contained" startIcon={<CalendarToday />} href={`#book/${business.id}`}>{t.bookNow}</Button>
                    <Button variant="outlined" startIcon={<Message />} href={`#messages/${business.id}`}>{t.sendMessage}</Button>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
                        <Tab label={t.about} />
                        <Tab label={t.servicesMenu} />
                        <Tab label={t.reviews} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <Typography>{business.description}</Typography>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <List>
                        {services.map(service => (
                            <ListItem key={service.id} secondaryAction={<Typography variant="h6">{formatCurrency(service.price)}</Typography>}>
                                <ListItemText primary={service.name} />
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>
            </CardContent>
        </Card>
    );
}
