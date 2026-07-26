export enum EndUserRoleEnum {
  USER = "user",
  RETAILER = "retailer",
  WHOLESALER = "wholesaler",
  MARKETER = "marketer",
  PRODUCER = "producer",
  IMPORTER = "importer",
  MERCHANT = "merchant",
  DISTRIBUTOR = "distributor",
  BANK = "bank",
  GOVERNMENT = "government",
  INSTITUTE = "institute",
}

export enum RecentActivitiesTypeEnum {
  BOTH = "BOTH",
  COIN = "COIN",
  SCORE = "SCORE",
  SPENTCOIN = "SPENTCOIN",
  TRANSFERCOIN = "TRANSFERCOIN",
}

export type RecentActivitiesFilter = "ALL" | RecentActivitiesTypeEnum;

export interface UserProfile {
  id: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  level: string;
  coins: number;
  scores: number;
  createdAt?: string;
  jobTitle?: string;
  city?: string;
  country?: string;
  membershipTitle?: string;
}

export interface UserVitrin {
  id: string;
  role: EndUserRoleEnum | string;
  companyName: string;
  avatarUrl?: string;
}

export interface VitrinProfile {
  id: string;
  companyName: string;
  role: EndUserRoleEnum | string;
  level: string;
  scores: number;
  coins: number;
  avatarUrl?: string;
}

export interface ClubLevel {
  id: string;
  name: string;
  scores: number;
  iconUrl?: string;
}

export interface ClubSummary {
  numberTasksCompleted: number;
  totalScoreMonthly: number;
  totalCoinMonthly: number;
}

export interface RecentActivity {
  id: string;
  type: RecentActivitiesTypeEnum | string;
  taskTitle: string;
  taskDescription: string;
  scoreAmount: number;
  coinAmount: number;
  createdAt?: string;
}

export interface DashboardResponse {
  scope: "user" | "vitrin";
  user: UserProfile;
  selectedVitrin: VitrinProfile | null;
  vitrins: UserVitrin[];
  summary: ClubSummary;
}

export interface RecentActivitiesResponse {
  items: RecentActivity[];
  total: number;
  offset: number;
  size: number;
  hasMore: boolean;
}

export interface DashboardQuery {
  scope: "user" | "vitrin";
  vitrinId?: string;
}

export interface ActivitiesQuery extends DashboardQuery {
  offset: number;
  size: number;
  type: RecentActivitiesFilter;
}
