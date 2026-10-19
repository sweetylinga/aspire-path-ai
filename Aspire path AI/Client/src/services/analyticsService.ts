import axios from "axios";
import { baseUrl } from "../config/routes";
import { getAuthToken } from "../utils/auth";

// ✅ Attach JWT from centralized token extractor
const getAuthHeader = () => {
  const token = getAuthToken();

  return {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    withCredentials: true, 
  };
};
// ✅ Generic GET with error handling
const safeGet = async <T>(url: string): Promise<T> => {
  try {
    const res = await axios.get<T>(url, getAuthHeader());
    return res.data;
  } catch (err: any) {
    console.error(`❌ Error fetching ${url}:`, err.response?.data || err.message);
    throw err.response?.data || { message: "Server error" };
  }
};

// 📊 API Methods
export const fetchTotalUsers = () => safeGet<{ totalUsers: number }>(`${baseUrl}/api/v1/admin/analytics/total-users`);
export const fetchActiveUsers = (period: string = "week") =>
  safeGet<{ activeUsers: number }>(`${baseUrl}/api/v1/admin/analytics/active-users?period=${period}`);
export const fetchSessions = () => safeGet<{ totalSessions: number }>(`${baseUrl}/api/v1/admin/analytics/sessions`);
export const fetchModulesCompleted = () =>
  safeGet<{ modulesCompleted: number }>(`${baseUrl}/api/v1/admin/analytics/modules-completed`);
export const fetchQuizAttempts = () => safeGet<{ quizAttempts: number }>(`${baseUrl}/api/v1/admin/analytics/quiz-attempts`);
export const fetchFeedback = () => safeGet<{ feedbackCount: number }>(`${baseUrl}/api/v1/admin/analytics/feedback`);

