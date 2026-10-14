// Client-Lawyer Private Encrypted Chat Screen with Document Attachment
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  Send, 
  Paperclip, 
  FileText, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCheck, 
  Check, 
  Lock 
} from 'lucide-react-native';
import ResponsiveLayout from '../../components/ResponsiveLayout';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../styles/theme';
import { useAuth } from '../../hooks/useAuth';
import { 
  getStoredMessages, 
  appendStoredMessage 
} from '../../lib/storage';
import { Message } from '../../types';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  const convId = (id as string) || 'conv-1';

  useEffect(() => {
    loadMessages();
  }, [convId]);

  const loadMessages = () => {
    const list = getStoredMessages(convId);
    setMessages(list);
  };

  const handleSendMessage = () => {
    if (!inputText.trim() && !attachmentName) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: convId,
      sender_id: user ? user.id : 'demo-client-id',
      sender_name: user ? user.full_name : 'Sardor Qodirov',
      text: inputText.trim(),
      attachment_name: attachmentName || undefined,
      attachment_type: attachmentName ? 'pdf' : undefined,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    appendStoredMessage(newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setAttachmentName(null);

    // Auto-reply simulation from lawyer if client sent message
    if (user?.role !== 'lawyer') {
      setTimeout(() => {
        const replyMsg: Message = {
          id: `msg-${Date.now() + 1}`,
          conversation_id: convId,
          sender_id: 'lawyer-1',
          sender_name: 'Rustam Kamolov (Advokat)',
          text: 'Xabaringiz va hujjatlaringiz qabul qilindi. Tez orada ko‘rib chiqib javob beraman.',
          is_read: true,
          created_at: new Date().toISOString(),
        };
        appendStoredMessage(replyMsg);
        setMessages((prev) => [...prev, replyMsg]);
      }, 1500);
    }
  };

  const handleAttachMockDoc = () => {
    setAttachmentName('nizo_dalolatnomasi_2026.pdf');
  };

  return (
    <ResponsiveLayout showFooter={false}>
      <View style={styles.container}>
        {/* Chat Header */}
        <View style={styles.chatHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={18} color={COLORS.white} />
          </TouchableOpacity>

          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.chatHeaderTitle}>Rustam Kamolov (Advokat)</Text>
            <View style={styles.encryptedBadge}>
              <Lock size={10} color={COLORS.gold} />
              <Text style={styles.encryptedText}>Advokatlik siri bilan himoyalangan kanal</Text>
            </View>
          </View>
        </View>

        {/* Messages Stream */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messageList}
          contentContainerStyle={styles.messageContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <View style={styles.securityNotice}>
            <ShieldCheck size={16} color={COLORS.gold} />
            <Text style={styles.securityNoticeText}>
              Xabarlar va biriktirilgan barcha hujjatlar shifrlangan. Boshqa uchinchi shaxslar bu yozishmalarga kirish huquqiga ega emas.
            </Text>
          </View>

          {messages.map((msg) => {
            const isMe = user ? msg.sender_id === user.id : msg.sender_id === 'demo-client-id';
            return (
              <View
                key={msg.id}
                style={[
                  styles.bubbleWrapper,
                  isMe ? styles.bubbleMeWrapper : styles.bubbleOtherWrapper,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    isMe ? styles.bubbleMe : styles.bubbleOther,
                  ]}
                >
                  <Text style={[styles.senderName, isMe ? styles.senderNameMe : styles.senderNameOther]}>
                    {msg.sender_name}
                  </Text>

                  {msg.attachment_name && (
                    <View style={styles.attachmentBox}>
                      <FileText size={18} color={isMe ? COLORS.navy : COLORS.gold} />
                      <Text style={[styles.attachmentName, isMe && { color: COLORS.navy }]}>
                        {msg.attachment_name}
                      </Text>
                    </View>
                  )}

                  {msg.text ? (
                    <Text style={[styles.msgText, isMe ? styles.msgTextMe : styles.msgTextOther]}>
                      {msg.text}
                    </Text>
                  ) : null}

                  <View style={styles.msgFooter}>
                    <Text style={[styles.timeText, isMe ? styles.timeTextMe : styles.timeTextOther]}>
                      {msg.created_at.slice(11, 16)}
                    </Text>
                    {isMe && (
                      msg.is_read ? (
                        <CheckCheck size={13} color={COLORS.navy} />
                      ) : (
                        <Check size={13} color={COLORS.navy} />
                      )
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          {attachmentName && (
            <View style={styles.attachmentPreview}>
              <FileText size={14} color={COLORS.gold} />
              <Text style={styles.attachmentPreviewText}>{attachmentName}</Text>
              <TouchableOpacity onPress={() => setAttachmentName(null)}>
                <Text style={styles.removeAttachmentText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.attachBtn} onPress={handleAttachMockDoc}>
              <Paperclip size={20} color={COLORS.gold} />
            </TouchableOpacity>

            <TextInput
              style={styles.textInput}
              placeholder="Xabar yozing..."
              placeholderTextColor={COLORS.textMuted}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSendMessage}
            />

            <TouchableOpacity 
              style={[styles.sendBtn, !inputText.trim() && !attachmentName && styles.sendBtnDisabled]} 
              onPress={handleSendMessage}
              disabled={!inputText.trim() && !attachmentName}
            >
              <Send size={16} color={COLORS.navy} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 820,
    width: '100%',
    alignSelf: 'center',
    height: '92%' as any,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: SPACING.md,
    ...SHADOWS.md,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.navy,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  backBtn: {
    padding: 6,
  },
  chatHeaderTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  encryptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  encryptedText: {
    color: COLORS.goldLight,
    fontSize: 11,
  },
  messageList: {
    flex: 1,
    backgroundColor: COLORS.cream,
    paddingHorizontal: SPACING.md,
  },
  messageContent: {
    paddingVertical: SPACING.md,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.navyLight,
    padding: 10,
    borderRadius: RADIUS.md,
    marginBottom: 16,
    gap: 8,
  },
  securityNoticeText: {
    color: COLORS.white,
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
  },
  bubbleWrapper: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  bubbleMeWrapper: {
    justifyContent: 'flex-end',
  },
  bubbleOtherWrapper: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: RADIUS.lg,
  },
  bubbleMe: {
    backgroundColor: COLORS.goldLight,
    borderBottomRightRadius: 2,
  },
  bubbleOther: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  senderName: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 3,
  },
  senderNameMe: {
    color: COLORS.navy,
  },
  senderNameOther: {
    color: COLORS.goldDark,
  },
  attachmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 8,
    borderRadius: RADIUS.md,
    gap: 6,
    marginBottom: 6,
  },
  attachmentName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
  },
  msgText: {
    fontSize: 13,
    lineHeight: 19,
  },
  msgTextMe: {
    color: COLORS.navy,
  },
  msgTextOther: {
    color: COLORS.text,
  },
  msgFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 4,
  },
  timeText: {
    fontSize: 10,
  },
  timeTextMe: {
    color: COLORS.navy,
  },
  timeTextOther: {
    color: COLORS.textMuted,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: SPACING.sm,
  },
  attachmentPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cream,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    gap: 6,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  attachmentPreviewText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '600',
  },
  removeAttachmentText: {
    color: COLORS.danger,
    fontWeight: '800',
    marginLeft: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  attachBtn: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    height: 40,
    fontSize: 13,
    color: COLORS.text,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
});
