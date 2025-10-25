import React from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Bell, Calendar, CheckCircle, MessageSquare, XCircle } from 'lucide-react';

function NotificationsPage({ t, notifications, onMarkAllRead }) {
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  const getIconForType = (type) => {
    switch (type) {
      case 'newAppointmentRequest': return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'appointmentConfirmed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'newChatMessage': return <MessageSquare className="h-5 w-5 text-yellow-500" />;
      case 'appointmentCancelled': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const NotificationItem = ({ notification }) => (
    <a href={notification.link} className="block p-4 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="mt-1">{getIconForType(notification.type)}</div>
        <div className="flex-1">
          <p className={`text-sm ${!notification.read ? 'font-semibold' : ''}`}>{notification.text}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{notification.timestamp}</p>
        </div>
        {!notification.read && <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary"></div>}
      </div>
    </a>
  );

  return (
    <div id="notifications" className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-slate-100">{t.allNotifications}</h1>
        {unreadNotifications.length > 0 && (
          <Button variant="ghost" onClick={onMarkAllRead}>{t.markAllAsRead}</Button>
        )}
      </div>
      <Card>
        <Tabs defaultValue="unread">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="unread">{t.unread} {unreadNotifications.length > 0 && `(${unreadNotifications.length})`}</TabsTrigger>
            <TabsTrigger value="read">{t.read}</TabsTrigger>
          </TabsList>
          <TabsContent value="unread">
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map(n => <NotificationItem key={n.id} notification={n} />)
            ) : (
              <div className="p-8 text-center text-slate-500">{t.noUnreadNotifications}</div>
            )}
          </TabsContent>
          <TabsContent value="read">
            {readNotifications.length > 0 ? (
              readNotifications.map(n => <NotificationItem key={n.id} notification={n} />)
            ) : (
              <div className="p-8 text-center text-slate-500">{t.noNewNotifications}</div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default NotificationsPage;
