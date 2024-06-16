import { notificationService } from '../data/Notification';

const counterElement = document.getElementById('notification-counter');

notificationService.unreadCount().subscribe(count => {
  if (counterElement) {
    counterElement.textContent = `Pozostałe powiadomienia: ${count}`;
  }
});