export type NotificationType =
  | "connection_request"
  | "connection_accepted"
  | "premium_purchase";

export interface RelatedUser {
  _id: string;
  name: string;
  profilePhoto?: string;
}

export interface NotificationItem {
  _id: string;
  userId: string;
  type: NotificationType;
  message: string;
  relatedUserId?: RelatedUser | string;
  relatedId?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationListResponse {
  data: NotificationItem[];
  total: number;
  page: number;
  size: number;
}

export interface NotificationState {
  list: NotificationItem[];
  unreadCount: number;
  total: number;
  page: number;
  isLoading: boolean;
  isError: boolean;
}
