import { BehaviorSubject, Observable } from 'rxjs';

type ISOString = string;

interface Notification {
  title: string;
  message: string;
  date: ISOString;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
}

class NotificationService {
  private notificationsSubject: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);
  private unreadCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  send(notification: Notification) {
    const currentNotifications = this.notificationsSubject.value;
    const newNotifications = [notification, ...currentNotifications];
    this.notificationsSubject.next(newNotifications);
    this.updateUnreadCount(newNotifications);
    if (notification.priority === 'medium' || notification.priority === 'high') {
      this.showNotificationDialog(notification);
    }
  }

  list(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  unreadCount(): Observable<number> {
    return this.unreadCountSubject.asObservable();
  }

  markAsRead(notification: Notification) {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.filter(n => n.date !== notification.date);
    this.notificationsSubject.next(updatedNotifications);
    this.updateUnreadCount(updatedNotifications);
  }

  private updateUnreadCount(notifications: Notification[]) {
    const unreadCount = notifications.filter(n => !n.read).length;
    this.unreadCountSubject.next(unreadCount);
  }

  private showNotificationDialog(notification: Notification) {
    alert(`New Notification:\n\nTitle: ${notification.title}\nMessage: ${notification.message}`);
  }
}

export const notificationService = new NotificationService();
