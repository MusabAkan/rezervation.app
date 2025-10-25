import React from 'react';
import {Button} from "../components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "../components/ui/card";
import {Input} from "../components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../components/ui/select";
import {Switch} from "../components/ui/switch";
import {Avatar, AvatarFallback} from "../components/ui/avatar";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../components/ui/tabs";
import {CheckCircle} from 'lucide-react';

export default function SettingsView({t, themeColor, setThemeColor}) {
    const colorOptions = [
        {name: 'Mavi', value: 'blue', hsl: '221 83% 53%', className: 'bg-blue-600'},
        {name: 'Yeşil', value: 'green', hsl: '142 71% 45%', className: 'bg-green-600'},
        {name: 'Mor', value: 'purple', hsl: '262 83% 58%', className: 'bg-purple-600'},
        {name: 'Turuncu', value: 'orange', hsl: '25 95% 53%', className: 'bg-orange-600'},
    ];

    return (
        <div id="settings" className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 dark:text-slate-100">{t.settings}</h1>
            <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile">{t.profileInfo}</TabsTrigger>
                    <TabsTrigger value="appearance">{t.appearancePreferences}</TabsTrigger>
                    <TabsTrigger value="notifications">{t.notifications}</TabsTrigger>
                    <TabsTrigger value="security">{t.security}</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="mt-6">
                    <Card>
                        <CardHeader><CardTitle>{t.profileInfo}</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20"><AvatarFallback>AK</AvatarFallback></Avatar>
                                <Button variant="outline">{t.profilePicture}</Button>
                            </div>
                            <Input defaultValue="Ayşe Kaya" placeholder={t.fullName}/>
                            <Input defaultValue="ayse@mail.com" placeholder={t.email}/>
                            <Input placeholder={t.dateOfBirth}/>
                            <Select>
                                <SelectTrigger><SelectValue placeholder={t.gender}/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="female">{t.female}</SelectItem>
                                    <SelectItem value="male">{t.male}</SelectItem>
                                    _BOS_ <SelectItem value="other">{t.other}</SelectItem>
                                </SelectContent>
                            </Select>
                            <div
                                className="flex items-center justify-between p-3 border rounded-lg dark:border-slate-700">
                                <div>
                                    <h3 className="text-sm font-medium">{t.shareLocation}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.shareLocationDesc}</p>
                                </div>
                                <Switch id="location-switch"/>
                            </div>
                            <Button className="bg-primary hover:bg-primary/90">{t.saveChanges}</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="appearance" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t.tagColor}</CardTitle>
                            <p className="text-sm text-slate-500 dark:text-slate-400 pt-1">{t.tagColorDescription}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4">
                                {colorOptions.map(color => (
                                    <div key={color.value} onClick={() => setThemeColor(color.value)}
                                         className="flex flex-col items-center gap-2 cursor-pointer">
                                        <div
                                            className={`w-10 h-10 rounded-full ${color.className} flex items-center justify-center`}>
                                            {themeColor === color.value &&
                                                <CheckCircle className="h-5 w-5 text-white"/>}
                                        </div>
                                        <span className="text-sm">{color.name}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="notifications" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t.notificationPreferences}</CardTitle>
                            <p className="text-sm text-slate-500 dark:text-slate-400 pt-1">{t.notificationPreferencesDesc}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 border rounded-lg dark:border-slate-700">
                                <h3 className="font-medium mb-2">{t.reservationAlerts}</h3>
                                <div className="flex items-center justify-between py-1"><label htmlFor="n-email"
                                                                                               className="text-sm">{t.emailNotifications}</label><Switch
                                    id="n-email" defaultChecked/></div>
                                <div className="flex items-center justify-between py-1"><label htmlFor="n-sms"
                                                                                               className="text-sm">{t.smsNotifications}</label><Switch
                                    id="n-sms"/></div>
                            </div>
                            <div className="p-4 border rounded-lg dark:border-slate-700">
                                <h3 className="font-medium mb-2">{t.newsUpdates}</h3>
                                <div className="flex items-center justify-between py-1"><label htmlFor="n-news-email"
                                                                                               className="text-sm">{t.emailNotifications}</label><Switch
                                    id="n-news-email" defaultChecked/></div>
                                <div className="flex items-center justify-between py-1"><label htmlFor="n-news-whatsapp"
                                                                                               className="text-sm">{t.whatsappNotifications}</label><Switch
                                    id="n-news-whatsapp"/></div>
                            </div>
                            <div className="p-4 border rounded-lg dark:border-slate-700">
                                <h3 className="font-medium mb-2">{t.followedBusiness}</h3>
                                <div className="flex items-center justify-between py-1"><label htmlFor="n-follow-email"
                                                                                               className="text-sm">{t.emailNotifications}</label><Switch
                                    id="n-follow-email"/></div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="security" className="mt-6">
                    <Card>
                        <CardHeader><CardTitle>{t.security}</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div
                                className="flex items-center justify-between p-4 border rounded-lg dark:border-slate-700">
                                <div>
                                    <h3 className="font-medium">{t.twoFactorAuth}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.twoFactorAuthDesc}</p>
                                </div>
                                <Switch id="2fa-switch"/>
                            </div>
                            <div className="p-4 border rounded-lg dark:border-slate-700">
                                <h3 className="font-medium mb-4">{t.changePassword}</h3>
                                <div className="space-y-3">
                                    <Input type="password" placeholder={t.currentPassword}/>
                                    <Input type="password" placeholder={t.newPassword}/>
                                    <Input type="password" placeholder={t.confirmNewPassword}/>
                                    <Button className="bg-primary hover:bg-primary/90">{t.updatePassword}</Button>
                                </div>
                            </div>
                            <Card className="border-red-500/50 dark:border-red-500/30">
                                <CardHeader><CardTitle
                                    className="text-red-600 dark:text-red-400">{t.accountActions}</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Button variant="outline"
                                                className="w-full justify-start">{t.suspendAccount}</Button>
                                        <p className="text-xs text-slate-500 mt-1 pl-1">{t.suspendAccountDesc}</p>
                                    </div>
                                    <div>
                                        <Button variant="destructive"
                                                className="w-full justify-start">{t.deleteAccount}</Button>
                                        <p className="text-xs text-slate-500 mt-1 pl-1">{t.deleteAccountDesc}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}