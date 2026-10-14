// Role-based permissions and access control rules
import { UserProfile, Appointment, Conversation } from '../types';

export function isClient(user: UserProfile | null): boolean {
  return user?.role === 'client';
}

export function isLawyer(user: UserProfile | null): boolean {
  return user?.role === 'lawyer';
}

export function isAdmin(user: UserProfile | null): boolean {
  return user?.role === 'admin';
}

export function canAccessAppointment(user: UserProfile | null, appointment: Appointment): boolean {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return user.id === appointment.client_id || user.id === appointment.lawyer_id;
}

export function canAccessConversation(user: UserProfile | null, conversation: Conversation): boolean {
  if (!user) return false;
  if (user.role === 'admin') return false; // Strict privacy: Admin cannot view private client-lawyer chat
  return user.id === conversation.client_id || user.id === conversation.lawyer_id;
}

export function canVerifyLawyer(user: UserProfile | null): boolean {
  return user?.role === 'admin';
}

export function canManageCategory(user: UserProfile | null): boolean {
  return user?.role === 'admin';
}
