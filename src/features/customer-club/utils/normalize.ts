import {
  EndUserRoleEnum,
  RecentActivitiesTypeEnum,
  type ClubLevel,
  type ClubSummary,
  type RecentActivitiesResponse,
  type RecentActivity,
  type UserProfile,
  type UserVitrin,
  type VitrinProfile,
} from "@/features/customer-club/types/customer-club.types";

const imageBaseUrl = (
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? "https://wholesaler-core-develop.web.parafacc.ir"
).replace(/\/$/, "");

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : {};
}

function get(record: UnknownRecord, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null) return value;
  }
  return undefined;
}

function getNested(record: UnknownRecord, path: string) {
  return path.split(".").reduce<unknown>((current, part) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as UnknownRecord)[part];
  }, record);
}

function text(value: unknown, fallback = "") {
  if (typeof value === "string") return value.trim() || fallback;
  if (typeof value === "number") return String(value);
  return fallback;
}

function number(value: unknown, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/,/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function id(value: unknown, fallback: string) {
  return text(value, fallback);
}

function arrayFromPayload(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  const record = asRecord(payload);
  const candidate = get(record, "items", "rows", "list", "data", "result");
  return Array.isArray(candidate) ? candidate : [];
}

export function resolveImageUrl(value: unknown) {
  const link = text(value);
  if (!link) return undefined;
  if (/^https?:\/\//i.test(link)) return link;
  return `${imageBaseUrl}/${link.replace(/^\//, "")}`;
}

function role(value: unknown) {
  const roleValue = text(value, EndUserRoleEnum.USER).toLowerCase();
  return roleValue;
}

export function normalizeUser(payload: unknown): UserProfile {
  const record = asRecord(payload);
  const firstName = text(get(record, "firstName", "firstname", "first_name"));
  const lastName = text(get(record, "lastName", "lastname", "last_name"));
  const fullName = text(
    get(record, "fullName", "displayName", "name", "title"),
    [firstName, lastName].filter(Boolean).join(" ") || "کاربر پاراف",
  );
  const avatarValue =
    get(record, "avatar", "avatarUrl", "profileImage", "image") ??
    getNested(record, "file.link") ??
    getNested(record, "profileFile.link");

  return {
    id: id(get(record, "id", "_id", "userId"), "current-user"),
    fullName,
    phone: text(get(record, "phone", "mobile", "phoneNumber")) || undefined,
    avatarUrl: resolveImageUrl(avatarValue),
    level: text(get(record, "level", "levelName"), "بدون سطح"),
    coins: number(get(record, "coins", "coin", "coinAmount")),
    scores: number(get(record, "scores", "score", "scoreAmount")),
    createdAt: text(get(record, "createdAt", "created_at", "joinDate")) || undefined,
    jobTitle:
      text(get(record, "jobTitle", "occupation", "profession", "businessTitle")) || undefined,
    city: text(get(record, "city", "cityName")) || undefined,
    country: text(get(record, "country", "countryName")) || undefined,
    membershipTitle:
      text(get(record, "membershipTitle", "businessType", "userTypeTitle")) || undefined,
  };
}

export function normalizeVitrinList(payload: unknown): UserVitrin[] {
  return arrayFromPayload(payload).map((item, index) => {
    const record = asRecord(item);
    const avatarValue =
      get(record, "avatar", "avatarUrl", "image") ?? getNested(record, "file.link");
    return {
      id: id(get(record, "id", "_id", "userVitrinId", "vitrinId"), `vitrin-${index}`),
      role: role(get(record, "role", "userRole")),
      companyName: text(get(record, "companyName", "name", "title"), `ویترین ${index + 1}`),
      avatarUrl: resolveImageUrl(avatarValue),
    };
  });
}

export function normalizeVitrin(
  payload: unknown,
  fallback?: UserVitrin,
): VitrinProfile {
  const record = asRecord(payload);
  const avatarValue =
    get(record, "avatar", "avatarUrl", "image") ?? getNested(record, "file.link");

  return {
    id: id(get(record, "id", "_id", "userVitrinId", "vitrinId"), fallback?.id ?? "vitrin"),
    companyName: text(
      get(record, "companyName", "name", "title"),
      fallback?.companyName ?? "ویترین پاراف",
    ),
    role: role(get(record, "role", "userRole") ?? fallback?.role),
    level: text(get(record, "level", "levelName"), "بدون سطح"),
    scores: number(get(record, "scores", "score", "scoreAmount")),
    coins: number(get(record, "coins", "coin", "coinAmount")),
    avatarUrl: resolveImageUrl(avatarValue) ?? fallback?.avatarUrl,
  };
}

export function normalizeLevels(payload: unknown): ClubLevel[] {
  return arrayFromPayload(payload)
    .map((item, index) => {
      const record = asRecord(item);
      const status = get(record, "status", "isActive");
      const deletedAt = get(record, "deletedAt", "deleted_at");

      if (status === false || (deletedAt !== undefined && deletedAt !== null)) {
        return null;
      }

      return {
        id: id(get(record, "id", "_id", "levelId"), `level-${index}`),
        name: text(get(record, "name", "title"), `سطح ${index + 1}`),
        scores: number(get(record, "scores", "score", "minimumScore")),
        iconUrl: resolveImageUrl(getNested(record, "file.link") ?? get(record, "icon", "iconUrl")),
      } satisfies ClubLevel;
    })
    .filter((level): level is ClubLevel => level !== null)
    .sort((first, second) => first.scores - second.scores);
}

export function normalizeSummary(payload: unknown): ClubSummary {
  const record = asRecord(payload);
  return {
    numberTasksCompleted: number(get(record, "numberTasksCompleted", "tasksCompleted")),
    totalScoreMonthly: number(get(record, "totalScoreMonthly", "monthlyScore")),
    totalCoinMonthly: number(get(record, "totalCoinMonthly", "monthlyCoin")),
  };
}

function normalizeActivityType(value: unknown) {
  const candidate = text(value, RecentActivitiesTypeEnum.BOTH).toUpperCase();
  return Object.values(RecentActivitiesTypeEnum).includes(candidate as RecentActivitiesTypeEnum)
    ? (candidate as RecentActivitiesTypeEnum)
    : candidate;
}

function normalizeActivitiesTotal(value: unknown, fallback: number) {
  if (Array.isArray(value)) {
    const firstItem = asRecord(value[0]);
    return number(get(firstItem, "count", "total", "totalCount"), fallback);
  }

  if (value && typeof value === "object") {
    const record = asRecord(value);
    return number(get(record, "count", "total", "totalCount"), fallback);
  }

  return number(value, fallback);
}

export function normalizeActivities(
  payload: unknown,
  offset: number,
  size: number,
): RecentActivitiesResponse {
  const root = asRecord(payload);
  const itemsPayload = Array.isArray(payload)
    ? payload
    : get(root, "items", "rows", "list", "data", "result");
  const items = (Array.isArray(itemsPayload) ? itemsPayload : []).map<RecentActivity>(
    (item, index) => {
      const record = asRecord(item);
      return {
        id: id(get(record, "id", "_id", "activityId"), `activity-${offset + index}`),
        type: normalizeActivityType(get(record, "type", "Type")),
        taskTitle: text(get(record, "taskTitle", "title"), "فعالیت باشگاه مشتریان"),
        taskDescription: text(get(record, "taskDescription", "description")),
        scoreAmount: number(get(record, "scoreAmount", "score")),
        coinAmount: number(get(record, "coinAmount", "coin")),
        createdAt: text(get(record, "createdAt", "created_at", "date")) || undefined,
      };
    },
  );

  const explicitTotal = get(root, "total", "count", "totalCount");
  const hasExplicitTotal = explicitTotal !== undefined && explicitTotal !== null;
  const total = hasExplicitTotal
    ? normalizeActivitiesTotal(explicitTotal, offset + items.length)
    : offset + items.length;

  return {
    items,
    total,
    offset,
    size,
    hasMore: hasExplicitTotal ? offset + items.length < total : items.length === size,
  };
}

export const roleLabels: Record<string, string> = {
  [EndUserRoleEnum.USER]: "کاربر",
  [EndUserRoleEnum.RETAILER]: "خرده‌فروش",
  [EndUserRoleEnum.WHOLESALER]: "عمده‌فروش",
  [EndUserRoleEnum.MARKETER]: "بازاریاب",
  [EndUserRoleEnum.PRODUCER]: "تولیدکننده",
  [EndUserRoleEnum.IMPORTER]: "واردکننده",
  [EndUserRoleEnum.MERCHANT]: "بازرگان",
  [EndUserRoleEnum.DISTRIBUTOR]: "توزیع‌کننده",
  [EndUserRoleEnum.BANK]: "بانک",
  [EndUserRoleEnum.GOVERNMENT]: "سازمان دولتی",
  [EndUserRoleEnum.INSTITUTE]: "مؤسسه",
};
