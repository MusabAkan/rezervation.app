import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ChevronLeft, User, Building } from 'lucide-react';
import { MOCK_USERS, CATEGORIES } from '../data/mockData';
import GoogleIcon from '../components/icons/GoogleIcon';
import AppleIcon from '../components/icons/AppleIcon';

function AuthPage({ t, onLogin }) {
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
          <span className="w-full border-t dark:border-slate-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-100 px-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400">{t.orContinueWith}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline"><GoogleIcon className="mr-2 h-4 w-4" /> Google</Button>
        <Button variant="outline"><AppleIcon className="mr-2 h-4 w-4" /> Apple</Button>
      </div>
    </>
  );

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        {step === 'selectType' ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">{t.selectAccountType}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 py-4">
              <Card onClick={() => handleSelectType('customer')} className="pt-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <CardContent className="text-center">
                  <User size={48} className="mx-auto mb-2 text-primary" />
                  <p className="font-semibold">{t.customer}</p>
                </CardContent>
              </Card>
              <Card onClick={() => handleSelectType('business')} className="pt-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <CardContent className="text-center">
                  <Building size={48} className="mx-auto mb-2 text-primary" />
                  <p className="font-semibold">{t.business}</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <Button variant="ghost" onClick={handleBack} className="mb-2 justify-start p-0 h-auto"><ChevronLeft className="h-4 w-4 mr-1" /> {t.back}</Button>
              <CardTitle>{accountType === 'customer' ? t.customer : t.business}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">{t.signIn}</TabsTrigger>
                  <TabsTrigger value="register">{t.register}</TabsTrigger>
                </TabsList>
                <TabsContent value="signin" className="space-y-3 pt-4">
                  <Input placeholder={t.email} />
                  <Input type="password" placeholder={t.password} />
                  <Button onClick={() => onLogin(MOCK_USERS[accountType])} className="w-full bg-primary hover:bg-primary/90">{t.signIn}</Button>
                  <SocialLogins />
                </TabsContent>
                <TabsContent value="register" className="space-y-3 pt-4">
                  {accountType === 'customer' ? (
                    <>
                      <Input placeholder={t.fullName} />
                      <Input placeholder={t.email} />
                      <Input placeholder={t.password} />
                      <Input placeholder={t.city} />
                      <Input placeholder={t.district} />
                    </>
                  ) : (
                    <>
                      <Input placeholder={t.businessName} />
                      <Select>
                        <SelectTrigger><SelectValue placeholder={t.selectCategory} /></SelectTrigger>
                        <SelectContent>{CATEGORIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                      </Select>
                      <Input placeholder={t.email} />
                      <Input placeholder={t.password} />
                      <Textarea placeholder={t.address} />
                      <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center text-sm text-slate-500">
                        Harita Simülasyonu (Adres yazıldıkça güncellenir)
                      </div>
                    </>
                  )}
                  <div className="items-top flex space-x-2 pt-2">
                    <Checkbox id="terms-page" />
                    <div className="grid gap-1.5 leading-none">
                      <label htmlFor="terms-page" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{t.agreeToTerms}</label>
                    </div>
                  </div>
                  <Button onClick={() => onLogin(MOCK_USERS[accountType])} className="w-full bg-primary hover:bg-primary/90">{t.register}</Button>
                  <SocialLogins />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
