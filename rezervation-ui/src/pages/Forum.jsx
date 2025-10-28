import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText, Avatar, Chip } from '@mui/material';
import { ThumbUp, Message } from '@mui/icons-material';
import { useAppContext } from '../App';
import { INITIAL_FORUM_POSTS } from '../data/mockData';

export default function Forum() {
    const { t } = useAppContext();
    const [posts, setPosts] = useState(INITIAL_FORUM_POSTS);
    const [newPost, setNewPost] = useState("");

    const handlePost = () => {
        if (!newPost.trim()) return;
        const newPostData = {
            id: `p${Date.now()}`,
            type: 'customer',
            author: 'Siz',
            text: newPost,
            replies: 0,
            likes: 0
        };
        setPosts([newPostData, ...posts]);
        setNewPost("");
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>{t.postQuestion}</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder={t.postQuestion} fullWidth />
                        <Button variant="contained" onClick={handlePost}>{t.post}</Button>
                    </Box>
                </CardContent>
            </Card>

            <List>
                {posts.map((post) => (
                    <Card key={post.id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Chip label={post.type === 'business' ? t.businessResponse : t.customerQuestion} color={post.type === 'business' ? 'primary' : 'default'} size="small" sx={{ mr: 1 }} />
                                <Typography variant="subtitle2" fontWeight="bold">{post.author}</Typography>
                            </Box>
                            <Typography variant="body1" sx={{ mb: 2 }}>{post.text}</Typography>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', color: 'text.secondary' }}>
                                <Button size="small" startIcon={<ThumbUp />}>{post.likes}</Button>
                                <Button size="small" startIcon={<Message />}>{post.replies} {t.replies}</Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </Box>
    );
}
