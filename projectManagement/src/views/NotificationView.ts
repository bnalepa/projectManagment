import { notificationService } from '../data/Notification';
import { firstValueFrom, } from 'rxjs';

const listElement = document.getElementById('notification-list');

notificationService.list().subscribe(notifications => {
  if (listElement) {
    
    listElement.innerHTML = notifications.map(notification => `
      <div class="notification ${notification.read ? 'read' : 'unread'}" data-date="${notification.date}">
        <h4>${notification.title}</h4>
        <p>${notification.message}</p>
        <button class="mark-as-read btn btn-primary" data-date="${notification.date}">OK</button>
      </div>
    `).join('');

    document.querySelectorAll('.mark-as-read').forEach(button => {
        button.addEventListener('click', async (event) => {
          const date = (event.target as HTMLElement).getAttribute('data-date');
          if (date) {
            await markAsRead(date);
          }
        });
      });
  }
  
});

async function markAsRead(date: string) {
    const notifications = await firstValueFrom(notificationService.list());
    const notification = notifications.find(n => n.date === date);
    if (notification) {
      notificationService.markAsRead(notification);
      
      const notificationElement = document.querySelector(`.notification[data-date="${date}"]`);
        if (notificationElement) {
            notificationElement.remove();
        }
    }
}

