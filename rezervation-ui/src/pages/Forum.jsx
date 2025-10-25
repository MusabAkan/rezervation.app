import React, {useState} from 'react';
import {Button} from "../components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "../components/ui/card";
import {Input} from "../components/ui/input";
import {Badge} from "../components/ui/badge";
import {ThumbsUp, MessageCircleMore} from "lucide-react";
import AdBanner from '../components/common/AdBanner';
import {INITIAL_FORUM_POSTS} from '../data/mockData';

export default function Forum({t}) {
    const [posts, setPosts] = useState(INITIAL_FORUM_POSTS);
    const [newPost, setNewPost] = useState("");

    const handlePost = () => {
        if (!newPost.trim()) return;
        const newPostData = {
            id: `p${Date.now()}`,
            type: 'customer', // Assume the current user is a customer for simplicity
            author: 'Siz',
            text: newPost,
            replies: 0,
            likes: 0
        };
        setPosts([newPostData, ...posts]);
        setNewPost("");
    };

    return (
        <div id="forum" className="max-w-4xl mx-auto px-4 py-8">
            <Card className="mb-6">
                <CardHeader><CardTitle>{t.postQuestion}</CardTitle></CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input value={newPost} onChange={(e) => setNewPost(e.target.value)}
                               placeholder={t.postQuestion}/>
                        <Button onClick={handlePost} className="bg-primary hover:bg-primary/90">{t.post}</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {posts.map((post, index) => (
                    <React.Fragment key={post.id}>
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Badge variant={post.type === 'business' ? 'default' : 'secondary'}
                                           className={post.type === 'business' ? 'bg-primary' : ''}>
                                        {post.type === 'business' ? t.businessResponse : t.customerQuestion}
                                    </Badge>
                                    <span className="font-semibold">{post.author}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4">{post.text}</p>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <Button variant="ghost" size="sm" className="gap-2"><ThumbsUp
                                        className="h-4 w-4"/> {post.likes}</Button>
                                    <Button variant="ghost" size="sm" className="gap-2"><MessageCircleMore
                                        className="h-4 w-4"/> {post.replies} Yanıt</Button>
                                    <span
                                        className="ml-auto text-xs">{post.type === 'business' ? '+10 Puan' : ''}</span>
                                </div>
                            </CardContent>
                        </Card>
                        {index === 1 && <AdBanner t={t}/>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}