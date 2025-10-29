
import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Avatar, TextField, Button, List, ListItem, ListItemAvatar, ListItemText, Divider, CircularProgress } from '@mui/material';
import { ThumbUp, Message } from '@mui/icons-material';
import { useAppContext } from '../App';
import { api } from '../services/api';

export default function Forum() {
    const { t, currentUser } = useAppContext();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const data = await api.getForumPosts();
                setPosts(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handlePost = async () => {
        if (!newPost.trim() || !currentUser) return;
        try {
            const postData = {
                authorId: currentUser.id,
                authorName: currentUser.name,
                authorAvatar: currentUser.photo,
                content: newPost,
            };
            const createdPost = await api.createForumPost(postData);
            setPosts(prevPosts => [createdPost, ...prevPosts]);
            setNewPost('');
        } catch (e) {
            console.error("Gönderi oluşturma hatası:", e);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
        }
        if (error) {
            return <Typography color="error" sx={{ p: 4, textAlign: 'center' }}>{error}</Typography>;
        }
        if (posts.length === 0) {
            return <Typography color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>Henüz gönderi yok.</Typography>;
        }
        return (
            <List>
                {posts.map(post => (
                    <React.Fragment key={post.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src={post.authorAvatar}>{post.authorName[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={post.authorName}
                                secondary={<Typography variant="body2" color="text.primary">{post.content}</Typography>}
                            />
                        </ListItem>
                        <Box sx={{ pl: 8, display: 'flex', gap: 2 }}>
                            <Button size="small" startIcon={<ThumbUp />}>{post.likes}</Button>
                            <Button size="small" startIcon={<Message />}>{post.comments.length}</Button>
                        </Box>
                        <Divider variant="inset" component="li" sx={{ my: 2 }} />
                    </React.Fragment>
                ))}
            </List>
        );
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>Forum</Typography>
            {currentUser && (
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Avatar src={currentUser.photo}>{currentUser.name[0]}</Avatar>
                    <TextField 
                        fullWidth 
                        multiline 
                        rows={2} 
                        variant="outlined" 
                        placeholder={`${t.postQuestion}`}
                        value={newPost}
                        onChange={e => setNewPost(e.target.value)}
                    />
                    <Button variant="contained" onClick={handlePost}>{t.post}</Button>
                </Box>
            )}
            {renderContent()}
        </Paper>
    );
}
