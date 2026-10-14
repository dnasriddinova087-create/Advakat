// Professional Admin Panel with User Verification, Complaints, Audit Logs, and Analytics
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';
import { 
  ShieldCheck, 
  Users, 
  Award, 
  CalendarDays, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Activity, 
  DollarSign, 
  Layers 
} from 'lucide-react-native';
import ResponsiveLayout from '../../components/ResponsiveLayout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../styles/theme';
import { formatMoney } from '../../utils/formatters';
import { 
  getStoredLawyers, 
  saveStoredLawyers, 
  getStoredAppointments, 
  getStoredComplaints, 
  getStoredAuditLogs 
} from '../../lib/storage';
import { INITIAL_CATEGORIES } from '../../lib/mockData';
import { LawyerProfile, Appointment, Complaint, AuditLog } from '../../types';

export default function AdminScreen() {
  const [lawyers, setLawyers] = useState<LawyerProfile[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [activeTab, setActiveTab] = useState<'lawyers' | 'complaints' | 'categories' | 'audit'>('lawyers');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLawyers(getStoredLawyers());
    setAppointments(getStoredAppointments());
    setComplaints(getStoredComplaints());
    setAuditLogs(getStoredAuditLogs());
  };

  const toggleLawyerVerification = (lawyerId: string) => {
    const updated = lawyers.map((l) =>
      l.id === lawyerId ? { ...l, is_verified: !l.is_verified } : l
    );
    setLawyers(updated);
    saveStoredLawyers(updated);
  };

  const resolveComplaint = (complaintId: string) => {
    const updated = complaints.map((c) =>
      c.id === complaintId ? { ...c, status: 'resolved' as const } : c
    );
    setComplaints(updated);
  };

  const pendingVerificationCount = lawyers.filter((l) => !l.is_verified).length;
  const verifiedCount = lawyers.filter((l) => l.is_verified).length;
  const totalVolume = appointments.reduce((sum, a) => sum + (a.total_amount || 0), 0);

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <ResponsiveLayout>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.adminHeader}>
            <View>
              <Text style={styles.adminTitle}>AdvoCare Boshqaruv Paneli (Admin Dashboard)</Text>
              <Text style={styles.adminSubtitle}>
                Platforma xavfsizligi, advokatlarni verifikatsiya qilish va audit nazorati
              </Text>
            </View>
            <View style={styles.adminRoleTag}>
              <ShieldCheck size={16} color={COLORS.navy} />
              <Text style={styles.adminRoleTagText}>BOSH ADMIN</Text>
            </View>
          </View>

          {/* Real-time KPI Cards */}
          <View style={styles.kpiGrid}>
            <View style={styles.kpiBox}>
              <Users size={22} color={COLORS.goldDark} />
              <Text style={styles.kpiNum}>{lawyers.length + 15}</Text>
              <Text style={styles.kpiLabel}>Jami foydalanuvchilar</Text>
            </View>

            <View style={styles.kpiBox}>
              <Award size={22} color={COLORS.success} />
              <Text style={styles.kpiNum}>{verifiedCount}</Text>
              <Text style={styles.kpiLabel}>Tasdiqlangan advokatlar</Text>
            </View>

            <View style={styles.kpiBox}>
              <AlertCircle size={22} color={COLORS.warning} />
              <Text style={styles.kpiNum}>{pendingVerificationCount}</Text>
              <Text style={styles.kpiLabel}>Tasdiqlash kutilmoqda</Text>
            </View>

            <View style={styles.kpiBox}>
              <CalendarDays size={22} color={COLORS.navy} />
              <Text style={styles.kpiNum}>{appointments.length}</Text>
              <Text style={styles.kpiLabel}>Jami bronlar soni</Text>
            </View>

            <View style={styles.kpiBox}>
              <DollarSign size={22} color={COLORS.gold} />
              <Text style={styles.kpiNum}>{formatMoney(totalVolume)}</Text>
              <Text style={styles.kpiLabel}>Platforma aylanmasi</Text>
            </View>
          </View>

          {/* Navigation Tabs */}
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'lawyers' && styles.tabBtnActive]}
              onPress={() => setActiveTab('lawyers')}
            >
              <Award size={16} color={activeTab === 'lawyers' ? COLORS.navy : COLORS.textMuted} />
              <Text style={[styles.tabBtnText, activeTab === 'lawyers' && styles.tabBtnTextActive]}>
                Advokatlar nazorati ({lawyers.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'complaints' && styles.tabBtnActive]}
              onPress={() => setActiveTab('complaints')}
            >
              <AlertCircle size={16} color={activeTab === 'complaints' ? COLORS.navy : COLORS.textMuted} />
              <Text style={[styles.tabBtnText, activeTab === 'complaints' && styles.tabBtnTextActive]}>
                Shikoyatlar ({complaints.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'categories' && styles.tabBtnActive]}
              onPress={() => setActiveTab('categories')}
            >
              <Layers size={16} color={activeTab === 'categories' ? COLORS.navy : COLORS.textMuted} />
              <Text style={[styles.tabBtnText, activeTab === 'categories' && styles.tabBtnTextActive]}>
                Kategoriyalar ({INITIAL_CATEGORIES.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'audit' && styles.tabBtnActive]}
              onPress={() => setActiveTab('audit')}
            >
              <Activity size={16} color={activeTab === 'audit' ? COLORS.navy : COLORS.textMuted} />
              <Text style={[styles.tabBtnText, activeTab === 'audit' && styles.tabBtnTextActive]}>
                Audit Loglar ({auditLogs.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab 1: Lawyer Verification Management */}
          {activeTab === 'lawyers' && (
            <View style={styles.tableCard}>
              <Text style={styles.tableTitle}>Advokatlar va ularning litsenziya holati</Text>
              <View style={styles.lawyerTable}>
                {lawyers.map((lawyer) => (
                  <View key={lawyer.id} style={styles.lawyerTableRow}>
                    <View style={{ flex: 1.5 }}>
                      <Text style={styles.lawyerName}>{lawyer.full_name}</Text>
                      <Text style={styles.lawyerLicense}>Litsenziya: {lawyer.license_number}</Text>
                      <Text style={styles.lawyerRegion}>{lawyer.region}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.lawyerSpecs}>{lawyer.specializations.join(', ')}</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <View style={[
                        styles.verificationBadge,
                        lawyer.is_verified ? styles.verifiedBadge : styles.unverifiedBadge
                      ]}>
                        <Text style={[
                          styles.verificationBadgeText,
                          lawyer.is_verified ? styles.verifiedText : styles.unverifiedText
                        ]}>
                          {lawyer.is_verified ? 'Tasdiqlangan' : 'Tasdiqlanmagan'}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={[
                          styles.actionToggleBtn,
                          lawyer.is_verified ? { backgroundColor: COLORS.dangerLight } : { backgroundColor: COLORS.successLight }
                        ]}
                        onPress={() => toggleLawyerVerification(lawyer.id)}
                      >
                        <Text style={[
                          styles.actionToggleBtnText,
                          lawyer.is_verified ? { color: COLORS.danger } : { color: COLORS.success }
                        ]}>
                          {lawyer.is_verified ? 'Bekor qilish' : 'Tasdiqlash'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Tab 2: Complaints */}
          {activeTab === 'complaints' && (
            <View style={styles.tableCard}>
              <Text style={styles.tableTitle}>Mijozlar shikoyatlari va murojaatlari</Text>
              {complaints.map((comp) => (
                <View key={comp.id} style={styles.complaintItem}>
                  <View style={styles.complaintHeader}>
                    <Text style={styles.complaintSubject}>{comp.subject}</Text>
                    <View style={[
                      styles.complaintStatusBadge,
                      comp.status === 'resolved' ? { backgroundColor: COLORS.successLight } : { backgroundColor: COLORS.warningLight }
                    ]}>
                      <Text style={[
                        styles.complaintStatusText,
                        comp.status === 'resolved' ? { color: COLORS.success } : { color: COLORS.warning }
                      ]}>
                        {comp.status === 'resolved' ? 'Hal qilingan' : 'Kutilmoqda'}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.complaintDesc}>{comp.description}</Text>
                  <Text style={styles.complaintMeta}>
                    Murojaatchi: {comp.user_name} • Mas’ul: {comp.target_user_name || 'Noma’lum'} • Sana: {comp.created_at.slice(0, 10)}
                  </Text>

                  {comp.status !== 'resolved' && (
                    <TouchableOpacity
                      style={styles.resolveBtn}
                      onPress={() => resolveComplaint(comp.id)}
                    >
                      <CheckCircle size={14} color={COLORS.navy} />
                      <Text style={styles.resolveBtnText}>Ko‘rib chiqildi deb belgilash</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Tab 3: Categories */}
          {activeTab === 'categories' && (
            <View style={styles.tableCard}>
              <Text style={styles.tableTitle}>Huquqiy yo‘nalishlar katalogi (26 ta)</Text>
              <View style={styles.catGrid}>
                {INITIAL_CATEGORIES.map((cat) => (
                  <View key={cat.id} style={styles.catItem}>
                    <Text style={styles.catTitle}>{cat.title}</Text>
                    <Text style={styles.catSlug}>slug: /{cat.slug}</Text>
                    <Text style={styles.catCount}>{cat.service_count} ta xizmat mavjud</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Tab 4: Audit Logs */}
          {activeTab === 'audit' && (
            <View style={styles.tableCard}>
              <Text style={styles.tableTitle}>Xavfsizlik va ma’muriyat audit jurnali</Text>
              {auditLogs.map((log) => (
                <View key={log.id} style={styles.auditItem}>
                  <View style={styles.auditHeader}>
                    <Text style={styles.auditAction}>{log.action}</Text>
                    <Text style={styles.auditDate}>{log.created_at}</Text>
                  </View>
                  <Text style={styles.auditDetails}>{log.details}</Text>
                  <Text style={styles.auditMeta}>
                    Bajaruvchi: {log.admin_name} • IP manzil: {log.ip_address || '127.0.0.1'}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ResponsiveLayout>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
  },
  adminHeader: {
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  adminTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  adminSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  adminRoleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
    gap: 6,
  },
  adminRoleTagText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '800',
  },
  kpiGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  kpiBox: {
    flex: 1,
    minWidth: 160,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  kpiNum: {
    color: COLORS.navy,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 2,
  },
  kpiLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    textAlign: 'center',
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabBtnActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  tabBtnText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: COLORS.gold,
    fontWeight: '700',
  },
  tableCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  tableTitle: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 8,
  },
  lawyerTable: {
    gap: 12,
  },
  lawyerTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cream,
    flexWrap: 'wrap',
    gap: 10,
  },
  lawyerName: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
  },
  lawyerLicense: {
    color: COLORS.goldDark,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  lawyerRegion: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  lawyerSpecs: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  verificationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    marginBottom: 6,
  },
  verifiedBadge: {
    backgroundColor: COLORS.successLight,
  },
  unverifiedBadge: {
    backgroundColor: COLORS.warningLight,
  },
  verificationBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  verifiedText: {
    color: COLORS.success,
  },
  unverifiedText: {
    color: COLORS.warning,
  },
  actionToggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  actionToggleBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  complaintItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  complaintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  complaintSubject: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
  },
  complaintStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  complaintStatusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  complaintDesc: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  complaintMeta: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginBottom: 8,
  },
  resolveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.gold,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
  },
  resolveBtnText: {
    color: COLORS.navy,
    fontSize: 11,
    fontWeight: '700',
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  catItem: {
    backgroundColor: COLORS.cream,
    padding: 10,
    borderRadius: RADIUS.md,
    flex: 1,
    minWidth: 200,
  },
  catTitle: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  catSlug: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  catCount: {
    color: COLORS.goldDark,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  auditItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cream,
  },
  auditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  auditAction: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '800',
  },
  auditDate: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  auditDetails: {
    color: COLORS.text,
    fontSize: 12,
    marginBottom: 4,
  },
  auditMeta: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
});
