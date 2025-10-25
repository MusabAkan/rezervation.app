import React, {useState} from 'react';
import {Button} from "../components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "../components/ui/card";
import {Input} from "../components/ui/input";
import {Textarea} from "../components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../components/ui/select";
import {Checkbox} from "../components/ui/checkbox";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../components/ui/tabs";
import {User, Building, ChevronLeft} from "lucide-react";
import GoogleIcon from '../components/icons/GoogleIcon';
import AppleIcon from '../components/icons/AppleIcon';
import FacebookIcon from '../components/icons/FacebookIcon';
import {CATEGORIES, MOCK_USERS} from '../data/mockData';

export default function Auth({t, onLogin}) {
    const [step, setStep] = useState('selectType'); // 'selectType', 'form'
    const [accountType, setAccountType] = useState(null); // 'customer', 'business'

    const handleSelectType = (type) => {
        setAccountType(type);
        setStep('form');
    };

    const handleBack = () => {
        setStep('selectType');
        setAccountType(null);
    };

    const SocialLogins = () => (
        <>
            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t dark:border-slate-700"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">{t.orContinueWith}</span>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <Button variant="outline"><GoogleIcon className="mr-2 h-4 w-4"/> Google</Button>
                <Button variant="outline"><AppleIcon className="mr-2 h-4 w-4"/> Apple</Button>
                <Button variant="outline"><FacebookIcon className="mr-2 h-4 w-4"/> Facebook</Button>
            </div>
        </>
    );

    return (
        <div className="w-full max-w-md space-y-6 p-6 bg-background">
            {step === 'selectType' ? (
                <Card className="border-0 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-center">{t.selectAccountType}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 py-4">
                        <Card onClick={() => handleSelectType('customer')}
                              className="pt-6 cursor-pointer hover:bg-accent transition-colors">
                            <CardContent className="text-center">
                                <User size={48} className="mx-auto mb-2 text-primary"/>
                                <p className="font-semibold">{t.customer}</p>
                            </CardContent>
                        </Card>
                        <Card onClick={() => handleSelectType('business')}
                              className="pt-6 cursor-pointer hover:bg-accent transition-colors">
                            <CardContent className="text-center">
                                <Building size={48} className="mx-auto mb-2 text-primary"/>
                                <p className="font-semibold">{t.business}</p>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            ) : (
                <Card className="border-0 shadow-none">
                    <CardHeader>
                        <Button variant="ghost" onClick={handleBack}
                                className="mb-2 justify-start p-0 h-auto"><ChevronLeft
                            className="h-4 w-4 mr-1"/> {t.back}</Button>
                        <CardTitle>{accountType === 'customer' ? t.customer : t.business}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="signin">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="signin">{t.signIn}</TabsTrigger>
                                <TabsTrigger value="register">{t.register}</TabsTrigger>
                            </TabsList>
                            <TabsContent value="signin" className="space-y-3 pt-4">
                                <Input placeholder={t.email}/>
                                <Input type="password" placeholder={t.password}/>
                                <Button onClick={() => onLogin(MOCK_USERS[accountType])}
                                        className="w-full bg-primary hover:bg-primary/90">{t.signIn}</Button>
                                <SocialLogins/>
                            </TabsContent>
                            <TabsContent value="register" className="space-y-3 pt-4">
                                {accountType === 'customer' ? (
                                    <>
                                        <Input placeholder={t.fullName}/>
                                        <Input placeholder={t.email}/>
                                        <Input placeholder={t.password}/>
                                        <Input placeholder={t.city}/>
                                        <Input placeholder={t.district}/>
                                    </>
                                ) : (
                                    <>
                                        <Input placeholder={t.businessName}/>
                                        <Select>
                                            <SelectTrigger><SelectValue placeholder={t.selectCategory}/></SelectTrigger>
                                            <SelectContent>{CATEGORIES.map(c => <SelectItem key={c.id}
                                                                                            value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <Input placeholder={t.email}/>
                                        <Input placeholder={t.password}/>
                                        <Textarea placeholder={t.address}/>
                                        <div
                                            className="h-32 bg-muted rounded-md flex items-center justify-center text-sm text-muted-foreground">
                                            Harita Simülasyonu (Adres yazıldıkça güncellenir)
                                        </div>
                                    </>
                                )}
                                <div className="items-top flex space-x-2 pt-2">
                                    <Checkbox id="terms-modal"/>
                                    <div className="grid gap-1.5 leading-none">
                                        <label htmlFor="terms-modal"
                                               className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{t.agreeToTerms}</label>
                                    </div>
                                </div>
                                <Button onClick={() => onLogin(MOCK_USERS[accountType])}
                                        className="w-full bg-primary hover:bg-primary/90">{t.register}</Button>
                                <SocialLogins/>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}