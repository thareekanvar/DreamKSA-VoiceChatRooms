import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Mic, 
  MicOff, 
  Users, 
  Crown, 
  Gift, 
  Heart,
  Settings,
  UserPlus,
  Volume2,
  VolumeX,
  MessageCircle,
  Share
} from 'lucide-react-native';

interface VoiceRoomModalProps {
  visible: boolean;
  onClose: () => void;
  room: any;
}

export default function VoiceRoomModal({ visible, onClose, room }: VoiceRoomModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const mockUsers = [
    {
      id: '1',
      name: 'Room Owner',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isVip: true,
      level: 25,
      isMuted: false,
      isSpeaking: true,
      isOwner: true,
    },
    {
      id: '2',
      name: 'Emma',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isVip: false,
      level: 12,
      isMuted: false,
      isSpeaking: false,
      isOwner: false,
    },
    {
      id: '3',
      name: 'James',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isVip: true,
      level: 30,
      isMuted: true,
      isSpeaking: false,
      isOwner: false,
    },
  ];

  const handleUserPress = (user: any) => {
    setSelectedUser(user);
  };

  const sendGift = (user: any) => {
    Alert.alert('Send Gift', `Send a gift to ${user.name}?`);
  };

  const inviteFriend = () => {
    Alert.alert('Invite Friends', 'Invite friends to this room');
  };

  const shareRoom = () => {
    Alert.alert('Share Room', 'Share this room with others');
  };

  if (!room) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.leaveButton}>
            <Text style={styles.leaveButtonText}>Leave</Text>
          </TouchableOpacity>
          <View style={styles.roomInfo}>
            <Text style={styles.roomTitle}>{room.name}</Text>
            <Text style={styles.roomParticipants}>
              {room.participants} / {room.maxParticipants}
            </Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Room Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.roomDescription}>{room.description}</Text>
        </View>

        {/* Users Grid */}
        <ScrollView style={styles.usersContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.usersGrid}>
            {mockUsers.map((user) => (
              <TouchableOpacity
                key={user.id}
                style={[
                  styles.userCard,
                  user.isSpeaking && styles.speakingUser,
                  user.isOwner && styles.ownerUser,
                ]}
                onPress={() => handleUserPress(user)}
              >
                <View style={styles.userAvatarContainer}>
                  <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                  {user.isVip && (
                    <View style={styles.vipBadge}>
                      <Crown size={12} color="#ffd700" />
                    </View>
                  )}
                  {user.isOwner && (
                    <View style={styles.ownerBadge}>
                      <Crown size={12} color="#fff" />
                    </View>
                  )}
                  {user.isMuted && (
                    <View style={styles.mutedBadge}>
                      <MicOff size={12} color="#fff" />
                    </View>
                  )}
                  {user.isSpeaking && (
                    <View style={styles.speakingIndicator}>
                      <View style={styles.speakingWave} />
                    </View>
                  )}
                </View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userLevel}>Lv.{user.level}</Text>
              </TouchableOpacity>
            ))}
            
            {/* Add more user slots */}
            <TouchableOpacity style={styles.emptySlot} onPress={inviteFriend}>
              <UserPlus size={24} color="#666" />
              <Text style={styles.emptySlotText}>Invite</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.controlButton} onPress={shareRoom}>
              <Share size={20} color="#666" />
              <Text style={styles.controlButtonText}>Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <MessageCircle size={20} color="#666" />
              <Text style={styles.controlButtonText}>Chat</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <Gift size={20} color="#e91e63" />
              <Text style={styles.controlButtonText}>Gifts</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setIsSpeakerOn(!isSpeakerOn)}
            >
              {isSpeakerOn ? (
                <Volume2 size={20} color="#4CAF50" />
              ) : (
                <VolumeX size={20} color="#666" />
              )}
              <Text style={styles.controlButtonText}>Speaker</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.mainControls}>
            <TouchableOpacity style={styles.heartButton}>
              <Heart size={24} color="#e91e63" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.micButton, isMuted && styles.micButtonMuted]}
              onPress={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <MicOff size={28} color="#fff" />
              ) : (
                <Mic size={28} color="#fff" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.heartButton}>
              <Heart size={24} color="#e91e63" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  leaveButton: {
    backgroundColor: '#ff4444',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  leaveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  roomInfo: {
    alignItems: 'center',
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  roomParticipants: {
    fontSize: 12,
    color: '#ccc',
  },
  settingsButton: {
    backgroundColor: '#2a2a3e',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  roomDescription: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  usersContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  usersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  userCard: {
    width: '48%',
    backgroundColor: '#2a2a3e',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  speakingUser: {
    borderColor: '#4CAF50',
  },
  ownerUser: {
    borderColor: '#e91e63',
  },
  userAvatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  vipBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ffd700',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ownerBadge: {
    position: 'absolute',
    top: -5,
    left: -5,
    backgroundColor: '#e91e63',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mutedBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speakingIndicator: {
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: [{ translateX: -10 }],
  },
  speakingWave: {
    width: 20,
    height: 4,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  userLevel: {
    fontSize: 12,
    color: '#ccc',
  },
  emptySlot: {
    width: '48%',
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#333',
    borderStyle: 'dashed',
    height: 120,
  },
  emptySlotText: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  bottomControls: {
    backgroundColor: '#2a2a3e',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  controlButton: {
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#666',
    fontSize: 10,
    marginTop: 5,
  },
  mainControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  heartButton: {
    backgroundColor: '#1a1a2e',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonMuted: {
    backgroundColor: '#ff4444',
  },
});