// AdvoCare Domain Types & Models

export type UserRole = 'guest' | 'client' | 'lawyer' | 'admin';

export type Language = 'uz' | 'ru' | 'en';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface LawyerProfile extends UserProfile {
  license_number: string;
  specializations: string[];
  region: string;
  city: string;
  experience_years: number;
  bio: string;
  consultation_price: number;
  is_verified: boolean;
  rating: number;
  review_count: number;
  languages: string[];
  is_online_available: boolean;
  education?: string;
  firm_name?: string;
}

export interface LegalCategory {
  id: string;
  title: string;
  slug: string;
  icon_name: string;
  description: string;
  service_count: number;
  is_active: boolean;
}

export interface LawyerService {
  id: string;
  lawyer_id: string;
  category_id?: string;
  title: string;
  description: string;
  price: number;
  duration_minutes: number;
}

export interface LawyerAvailabilitySlot {
  id: string;
  lawyer_id: string;
  day_of_week: number; // 1-7
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Rejected' | 'Cancelled' | 'Completed';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded' | 'Cancelled';
export type PaymentProvider = 'click' | 'payme' | 'uzum' | 'manual_transfer';

export interface Appointment {
  id: string;
  client_id: string;
  client_name?: string;
  client_phone?: string;
  lawyer_id: string;
  lawyer_name?: string;
  lawyer_avatar?: string;
  service_id?: string;
  service_title?: string;
  appointment_date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  status: AppointmentStatus;
  description: string;
  total_amount: number;
  payment_status: PaymentStatus;
  payment_provider?: PaymentProvider;
  created_at: string;
}

export interface Conversation {
  id: string;
  client_id: string;
  client_name: string;
  lawyer_id: string;
  lawyer_name: string;
  last_message: string;
  last_message_at: string;
  unread_count?: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name?: string;
  text: string;
  attachment_url?: string;
  attachment_type?: 'pdf' | 'doc' | 'image' | 'other';
  attachment_name?: string;
  is_read: boolean;
  created_at: string;
}

export interface LegalDocumentRecord {
  id: string;
  title: string;
  type: 'kodeks' | 'qonun' | 'farmon' | 'qaror' | 'konstitutsiya';
  doc_number: string;
  date_adopted: string;
  lex_url: string;
  summary: string;
  status: 'amaldagi' | 'kuchini_yoqotgan';
  last_verified: string;
}

export interface ConstitutionArticle {
  id: number;
  chapter_id: number;
  part_id: number;
  article_number: number;
  title: string;
  content: string;
}

export interface ConstitutionChapter {
  id: number;
  part_id: number;
  chapter_number: number;
  title: string;
  article_range: string;
}

export interface ConstitutionPart {
  id: number;
  part_number: string;
  title: string;
}

export interface Review {
  id: string;
  lawyer_id: string;
  client_id: string;
  client_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Complaint {
  id: string;
  user_id: string;
  user_name: string;
  target_user_id?: string;
  target_user_name?: string;
  subject: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved';
  created_at: string;
}

export interface AuditLog {
  id: string;
  admin_id: string;
  admin_name: string;
  action: string;
  target_type: string;
  target_id?: string;
  details: string;
  ip_address?: string;
  created_at: string;
}
