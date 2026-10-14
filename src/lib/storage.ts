// Persistent local state and data store with cross-platform fallback
import { 
  UserProfile, 
  LawyerProfile, 
  Appointment, 
  Conversation, 
  Message, 
  Language, 
  Complaint, 
  AuditLog 
} from '../types';
import { 
  INITIAL_LAWYERS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES 
} from './mockData';

// Safe localStorage wrapper for React Native Web & SSR
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Ignore
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Ignore
    }
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Ignore
    }
  },
};

const STORAGE_KEYS = {
  USER: 'advocare_user',
  LANGUAGE: 'advocare_lang',
  LAWYERS: 'advocare_lawyers',
  APPOINTMENTS: 'advocare_appointments',
  CONVERSATIONS: 'advocare_conversations',
  MESSAGES: 'advocare_messages',
  COMPLAINTS: 'advocare_complaints',
  AUDIT_LOGS: 'advocare_audit_logs',
};

// Initial default client user for quick demo & testing
export const DEMO_CLIENT: UserProfile = {
  id: 'demo-client-id',
  email: 'client@advocare.uz',
  full_name: 'Sardor Qodirov',
  role: 'client',
  phone: '+998 90 333 44 55',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  created_at: '2024-01-01T00:00:00Z',
};

export const DEMO_LAWYER_USER: UserProfile = {
  id: 'lawyer-1',
  email: 'rustam.kamolov@advocare.uz',
  full_name: 'Rustam Kamolov',
  role: 'lawyer',
  phone: '+998 90 123 45 67',
  avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
  created_at: '2024-01-15T09:00:00Z',
};

export const DEMO_ADMIN: UserProfile = {
  id: 'admin-1',
  email: 'admin@advocare.uz',
  full_name: 'AdvoCare Bosh Administratori',
  role: 'admin',
  phone: '+998 71 200 00 00',
  created_at: '2024-01-01T00:00:00Z',
};

export function getStoredUser(): UserProfile | null {
  const data = safeStorage.getItem(STORAGE_KEYS.USER);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function saveStoredUser(user: UserProfile | null): void {
  if (user) {
    safeStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    safeStorage.removeItem(STORAGE_KEYS.USER);
  }
}

export function getStoredLanguage(): Language {
  const lang = safeStorage.getItem(STORAGE_KEYS.LANGUAGE);
  if (lang === 'ru' || lang === 'en' || lang === 'uz') return lang;
  return 'uz';
}

export function saveStoredLanguage(lang: Language): void {
  safeStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
}

export function getStoredLawyers(): LawyerProfile[] {
  const data = safeStorage.getItem(STORAGE_KEYS.LAWYERS);
  if (!data) return INITIAL_LAWYERS;
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_LAWYERS;
  }
}

export function saveStoredLawyers(lawyers: LawyerProfile[]): void {
  safeStorage.setItem(STORAGE_KEYS.LAWYERS, JSON.stringify(lawyers));
}

export function getStoredAppointments(): Appointment[] {
  const data = safeStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
  if (!data) return INITIAL_APPOINTMENTS;
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_APPOINTMENTS;
  }
}

export function saveStoredAppointments(apps: Appointment[]): void {
  safeStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(apps));
}

export function getStoredConversations(): Conversation[] {
  const data = safeStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
  if (!data) return INITIAL_CONVERSATIONS;
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_CONVERSATIONS;
  }
}

export function saveStoredConversations(convs: Conversation[]): void {
  safeStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(convs));
}

export function getStoredMessages(convId: string): Message[] {
  const data = safeStorage.getItem(STORAGE_KEYS.MESSAGES);
  let all: Message[] = INITIAL_MESSAGES;
  if (data) {
    try {
      all = JSON.parse(data);
    } catch {
      all = INITIAL_MESSAGES;
    }
  }
  return all.filter((m) => m.conversation_id === convId);
}

export function appendStoredMessage(msg: Message): void {
  const data = safeStorage.getItem(STORAGE_KEYS.MESSAGES);
  let all: Message[] = INITIAL_MESSAGES;
  if (data) {
    try {
      all = JSON.parse(data);
    } catch {
      all = INITIAL_MESSAGES;
    }
  }
  all.push(msg);
  safeStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(all));
}

export function getStoredComplaints(): Complaint[] {
  const data = safeStorage.getItem(STORAGE_KEYS.COMPLAINTS);
  if (!data) {
    return [
      {
        id: 'comp-1',
        user_id: 'client-1',
        user_name: 'Farhod Nabiyev',
        target_user_name: 'Rustam Kamolov',
        subject: 'Uchrashuv vaqti kechiktirildi',
        description: 'Advokat bilan soat 14:00 da kelishilgan edi, biroq 15 daqiqa kech boshlandi.',
        status: 'reviewed',
        created_at: '2026-10-12T16:00:00Z',
      },
    ];
  }
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getStoredAuditLogs(): AuditLog[] {
  const data = safeStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
  if (!data) {
    return [
      {
        id: 'audit-1',
        admin_id: 'admin-1',
        admin_name: 'Bosh Administrator',
        action: 'VERIFY_LAWYER',
        target_type: 'lawyer_profile',
        target_id: 'lawyer-1',
        details: 'Rustam Kamolov litsenziyasi (ADV-TAS-2015-084) tasdiqlandi',
        ip_address: '195.158.12.34',
        created_at: '2026-10-14T09:30:00Z',
      },
      {
        id: 'audit-2',
        admin_id: 'admin-1',
        admin_name: 'Bosh Administrator',
        action: 'UPDATE_CATEGORY',
        target_type: 'legal_categories',
        target_id: 'cat-1',
        details: 'Fuqarolik ishlari tavsifi yangilandi',
        ip_address: '195.158.12.34',
        created_at: '2026-10-14T10:15:00Z',
      },
    ];
  }
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}
