import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface IOpenNotification {
  position: NotificationPlacement;
  type: NotificationType;
  title: string;
  description: string;
}

export const openNotification = ({ position, type, title, description }: IOpenNotification) => {
  notification[type]({
    message: title,
    description,
    placement: position,
    duration: 3,
  });
};