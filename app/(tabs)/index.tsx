import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { 
  Search, 
  Plus, 
  Users, 
  Mic, 
  MicOff, 
  Crown,
  Gift,
  Heart,
  Star,
  Settings,
  Play,
  ChevronRight,
  Gamepad2,
  Calendar,
  Trophy
} from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';

const { width } = Dimensions.get('window');

interface VoiceRoom {
  id: string;
  name: string;
  description: string;
  participants: number;
  maxParticipants: number;
  isPrivate: boolean;
  category: string;
  owner: {
    name: string;
    avatar: string;
    isVip: boolean;
  };
  tags: string[];
  isLive: boolean;
  status: 'Live' | 'Soon' | 'Scheduled';
}

interface Game {
  id: string;
  name: string;
  icon: string;
  players: number;
  color: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  startTime: string;
  participants: number;
}

const mockGames: Game[] = [
  {
    id: '1',
    name: 'Carrom',
    icon: '🎯',
    players: 14675,
    color: '#FFB6C1',
  },
  {
    id: '2',
    name: 'VS',
    icon: '⚔️',
    players: 3752,
    color: '#DDA0DD',
  },
  {
    id: '3',
    name: 'Ludo',
    icon: '🎲',
    players: 8058,
    color: '#98FB98',
  },
  {
    id: '4',
    name: 'UNO',
    icon: '🃏',
    players: 6075,
    color: '#FFB6C1',
  },
  {
    id: '5',
    name: 'Guess',
    icon: '🤔',
    players: 1234,
    color: '#87CEEB',
  },
];

const mockRooms: VoiceRoom[] = [
  {
    id: '1',
    name: 'هههههههه',
    description: 'ضحك وفرفشة',
    participants: 8,
    maxParticipants: 12,
    isPrivate: false,
    category: 'Entertainment',
    owner: {
      name: 'Ahmed',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isVip: false,
    },
    tags: ['fun', 'arabic'],
    isLive: true,
    status: 'Live',
  },
  {
    id: '2',
    name: '"سوالف 195"',
    description: 'كل يوم مواضيع ومناقشات متنوعة',
    participants: 15,
    maxParticipants: 20,
    isPrivate: false,
    category: 'Talk',
    owner: {
      name: 'Sarah',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isVip: true,
    },
    tags: ['talk', 'discussion'],
    isLive: false,
    status: 'Soon',
  },
  {
    id: '3',
    name: 'كلام نواعم',
    description: 'SGHIR',
    participants: 12,
    maxParticipants: 15,
    isPrivate: false,
    category: 'Social',
    owner: {
      name: 'Omar',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isVip: true,
    },
    tags: ['social', 'friendly'],
    isLive: true,
    status: 'Live',
  },
  {
    id: '4',
    name: 'موسيقى وغناء',
    description: 'أجمل الأغاني العربية',
    participants: 18,
    maxParticipants: 25,
    isPrivate: false,
    category: 'Music',
    owner: {
      name: 'Layla',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isVip: true,
    },
    tags: ['music', 'singing'],
    isLive: true,
    status: 'Live',
  },
  {
    id: '5',
    name: 'قهوة المساء',
    description: 'جلسة هادئة مع القهوة',
    participants: 6,
    maxParticipants: 10,
    isPrivate: false,
    category: 'Chill',
    owner: {
      name: 'Khalid',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isVip: false,
    },
    tags: ['chill', 'coffee'],
    isLive: true,
    status: 'Live',
  },
  {
    id: '6',
    name: 'العب وتسلى',
    description: 'ألعاب جماعية ومسابقات',
    participants: 22,
    maxParticipants: 30,
    isPrivate: false,
    category: 'Gaming',
    owner: {
      name: 'Fatima',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isVip: true,
    },
    tags: ['gaming', 'fun'],
    isLive: false,
    status: 'Soon',
  },
  {
    id: '7',
    name: 'شباب الخليج',
    description: 'تجمع شباب دول الخليج',
    participants: 14,
    maxParticipants: 20,
    isPrivate: false,
    category: 'Regional',
    owner: {
      name: 'Mohammed',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isVip: true,
    },
    tags: ['gulf', 'regional'],
    isLive: true,
    status: 'Live',
  },
  {
    id: '8',
    name: 'بنات كيوت',
    description: 'جلسة بنات فقط',
    participants: 9,
    maxParticipants: 12,
    isPrivate: true,
    category: 'Girls Only',
    owner: {
      name: 'Nour',
      avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isVip: false,
    },
    tags: ['girls', 'private'],
    isLive: true,
    status: 'Live',
  },
];

export default function HomeScreen() {
  const { user, isLoading, login, register, logout, isAuthenticated } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [rooms, setRooms] = useState<VoiceRoom[]>(mockRooms);
  const [selectedRoom, setSelectedRoom] = useState<VoiceRoom | null>(null);
  const [isInRoom, setIsInRoom] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuth = async (userData: any) => {
    try {
      // Simulate login/register
      await login(userData.email || userData.phone || 'user@example.com', 'password');
      setShowAuthModal(false);
    } catch (error) {
      Alert.alert('Authentication Error', 'Failed to authenticate user');
    }
  };

  // Show loading or auth modal if not authenticated
  if (isLoading) {
    return (
      <LinearGradient
        colors={['#8B5CF6', '#A855F7', '#C084FC', '#DDD6FE']}
        style={styles.loadingContainer}
      >
        <Text style={styles.loadingText}>Loading...</Text>
      </LinearGradient>
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthModal
        visible={true}
        onClose={() => {}}
        onAuth={handleAuth}
      />
    );
  }

  const joinRoom = (room: VoiceRoom) => {
    setSelectedRoom(room);
    setIsInRoom(true);
  };

  const openRandomRoom = () => {
    Alert.alert('Random Room', 'Joining a random room...');
  };

  const openSARoom = () => {
    Alert.alert('SA Room', 'Opening Saudi Arabia room...');
  };

  const playGame = (game: Game) => {
    Alert.alert('Game', `Starting ${game.name}...`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Explore</Text>
          <View style={styles.newBadge}>
            <Text style={styles.newText}>NEW</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Promotional Banner */}
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={['#8B0000', '#DC143C', '#B22222']}
            style={styles.promoBanner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.bannerContent}>
              <View style={styles.bannerLeft}>
                <View style={styles.crownContainer}>
                  <Image 
                    source={{ uri: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }}
                    style={styles.bannerAvatar}
                  />
                  <View style={styles.bannerCrown}>
                    <Crown size={20} color="#FFD700" />
                  </View>
                </View>
                <Text style={styles.bannerID}>ID:77</Text>
              </View>
              
              <View style={styles.bannerCenter}>
                <Text style={styles.bannerTitle}>تهانينا على الوصول</Text>
                <Text style={styles.bannerSubtitle}>الى مستوى</Text>
                <Text style={styles.bannerLevel}>88</Text>
                <Text style={styles.bannerDescription}>مسابقة تصنيف الوكالات</Text>
              </View>
              
              <View style={styles.bannerRight}>
                <Text style={styles.bannerCounter}>1/36</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Access Buttons */}
        <View style={styles.quickAccessContainer}>
          <TouchableOpacity style={styles.quickAccessButton} onPress={openRandomRoom}>
            <LinearGradient
              colors={['#90EE90', '#98FB98']}
              style={styles.quickAccessGradient}
            >
              <View style={styles.quickAccessIcon}>
                <Text style={styles.quickAccessEmoji}>🏠</Text>
              </View>
              <Text style={styles.quickAccessTitle}>Random</Text>
              <Text style={styles.quickAccessSubtitle}>Room</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAccessButton} onPress={openSARoom}>
            <LinearGradient
              colors={['#90EE90', '#98FB98']}
              style={styles.quickAccessGradient}
            >
              <View style={styles.quickAccessHeader}>
                <Text style={styles.saFlag}>🇸🇦</Text>
                <Text style={styles.saText}>SA</Text>
              </View>
              <Text style={styles.quickAccessTitle}>Room</Text>
              <View style={styles.saRoomIcons}>
                <View style={styles.saIcon} />
                <View style={[styles.saIcon, styles.saIconActive]} />
                <View style={styles.saIcon} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Gift Notification */}
        <View style={styles.giftNotification}>
          <LinearGradient
            colors={['#E6FFE6', '#F0FFF0']}
            style={styles.giftGradient}
          >
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop' }}
              style={styles.giftAvatar}
            />
            <Text style={styles.giftText}>
              <Text style={styles.giftName}>Rodina</Text>
              <Text style={styles.giftAction}> sent Surprise Pack </Text>
              <Text style={styles.giftAmount}>₪7777</Text>
            </Text>
            <View style={styles.giftIcon}>
              <Text>🎁</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Hot Games Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hot Games</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gamesContainer}>
            {mockGames.map((game) => (
              <TouchableOpacity
                key={game.id}
                style={styles.gameCard}
                onPress={() => playGame(game)}
              >
                <LinearGradient
                  colors={[game.color, game.color + '80']}
                  style={styles.gameGradient}
                >
                  <Text style={styles.gameIcon}>{game.icon}</Text>
                  <Text style={styles.gameName}>{game.name}</Text>
                  <View style={styles.gameStats}>
                    <Users size={12} color="#666" />
                    <Text style={styles.gamePlayers}>{game.players}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Room Activity Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Room Activity</Text>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreText}>More</Text>
              <ChevronRight size={16} color="#999" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.roomsGrid}>
            {rooms.slice(0, 6).map((room) => (
              <TouchableOpacity
                key={room.id}
                style={styles.roomCard}
                onPress={() => joinRoom(room)}
              >
                <View style={styles.roomImageContainer}>
                  <Image 
                    source={{ uri: room.owner.avatar }}
                    style={styles.roomImage}
                  />
                  <View style={[styles.roomStatus, room.status === 'Live' ? styles.liveStatus : styles.soonStatus]}>
                    <Text style={styles.roomStatusText}>{room.status}</Text>
                  </View>
                  {room.owner.isVip && (
                    <View style={styles.roomVipBadge}>
                      <Crown size={12} color="#FFD700" />
                    </View>
                  )}
                  <View style={styles.roomParticipants}>
                    <Users size={12} color="#fff" />
                    <Text style={styles.roomParticipantsText}>{room.participants}</Text>
                  </View>
                </View>
                
                <View style={styles.roomInfo}>
                  <Text style={styles.roomName}>{room.name}</Text>
                  <View style={styles.roomOwner}>
                    <Text style={styles.roomOwnerIcon}>🏠</Text>
                    <Text style={styles.roomOwnerName}>{room.owner.name}</Text>
                    <Text style={styles.roomFlag}>🇸🇦</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Official Event Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Official Event</Text>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreText}>More</Text>
              <ChevronRight size={16} color="#999" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.eventContainer}>
            <LinearGradient
              colors={['#8B0000', '#DC143C', '#B22222']}
              style={styles.eventBanner}
            >
              <View style={styles.eventContent}>
                <View style={styles.eventRanking}>
                  <View style={styles.rankingItem}>
                    <View style={styles.rankingBadge}>
                      <Text style={styles.rankingNumber}>2</Text>
                    </View>
                    <Image 
                      source={{ uri: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' }}
                      style={styles.rankingAvatar}
                    />
                  </View>
                  
                  <View style={[styles.rankingItem, styles.firstPlace]}>
                    <Crown size={20} color="#FFD700" />
                    <View style={styles.rankingBadge}>
                      <Text style={styles.rankingNumber}>1</Text>
                    </View>
                    <Image 
                      source={{ uri: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop' }}
                      style={[styles.rankingAvatar, styles.firstAvatar]}
                    />
                    <Text style={styles.countryFlag}>🇸🇦</Text>
                  </View>
                  
                  <View style={styles.rankingItem}>
                    <View style={styles.rankingBadge}>
                      <Text style={styles.rankingNumber}>3</Text>
                    </View>
                    <Image 
                      source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' }}
                      style={styles.rankingAvatar}
                    />
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#F5F5F5',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
  newBadge: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  newText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
  },
  bannerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  promoBanner: {
    borderRadius: 15,
    padding: 20,
    minHeight: 120,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerLeft: {
    alignItems: 'center',
  },
  crownContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  bannerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  bannerCrown: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{ translateX: -10 }],
  },
  bannerID: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bannerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bannerTitle: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bannerSubtitle: {
    color: '#FFD700',
    fontSize: 14,
    textAlign: 'center',
  },
  bannerLevel: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bannerDescription: {
    color: '#FFD700',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  bannerRight: {
    alignItems: 'center',
  },
  bannerCounter: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickAccessContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 15,
  },
  quickAccessButton: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  quickAccessGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  quickAccessIcon: {
    marginBottom: 10,
  },
  quickAccessEmoji: {
    fontSize: 30,
  },
  quickAccessTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  quickAccessSubtitle: {
    fontSize: 16,
    color: '#2E7D32',
  },
  quickAccessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  saFlag: {
    fontSize: 20,
    marginRight: 5,
  },
  saText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  saRoomIcons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  saIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  saIconActive: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  giftNotification: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  giftGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  giftAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  giftText: {
    flex: 1,
    fontSize: 14,
  },
  giftName: {
    fontWeight: 'bold',
    color: '#000',
  },
  giftAction: {
    color: '#666',
  },
  giftAmount: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  giftIcon: {
    marginLeft: 10,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    fontSize: 16,
    color: '#999',
    marginRight: 5,
  },
  gamesContainer: {
    paddingLeft: 20,
  },
  gameCard: {
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    width: 100,
  },
  gameGradient: {
    padding: 15,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  gameIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  gameName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  gameStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gamePlayers: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  roomsContainer: {
    paddingLeft: 20,
  },
  roomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  roomCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roomImageContainer: {
    position: 'relative',
  },
  roomImage: {
    width: '100%',
    height: 120,
  },
  roomStatus: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  liveStatus: {
    backgroundColor: '#FF9800',
  },
  soonStatus: {
    backgroundColor: '#4CAF50',
  },
  roomStatusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  roomVipBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomParticipants: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  roomParticipantsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  roomInfo: {
    padding: 12,
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  roomOwner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomOwnerIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  roomOwnerName: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  roomFlag: {
    fontSize: 14,
  },
  eventContainer: {
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  eventBanner: {
    minHeight: 150,
    justifyContent: 'center',
  },
  eventContent: {
    alignItems: 'center',
  },
  eventRanking: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 20,
  },
  rankingItem: {
    alignItems: 'center',
  },
  firstPlace: {
    transform: [{ translateY: -10 }],
  },
  rankingBadge: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  rankingNumber: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rankingAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  firstAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  countryFlag: {
    fontSize: 16,
    marginTop: 5,
  },
  bottomSpacing: {
    height: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
});