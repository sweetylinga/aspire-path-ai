export const baseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export const adminApi = {
  allUser: "/api/v1/admin/all-users",
  addUser:"/api/v1/admin/add-user",
  deleteUser:"/api/v1/admin/delete-user"
}

export const placementApi = {
  stats: "/api/v1/placements/stats",
  alumni: "/api/v1/placements/alumni",
  recruiters: "/api/v1/placements/recruiters",
  all: "/api/v1/placements/all"
}
export const quizApi = {
  all: "/api/v1/quizzes",
  create: "/api/v1/quizzes",
};