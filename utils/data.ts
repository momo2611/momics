type Route = {
  name: string;
  path: string;
  icon?: string;
};

export const routes: Route[] = [
  { name: "Home", path: "/" },
  { name: "Genres", path: "/genres?type=all" },
  { name: "New", path: "/new" },
  { name: "Top", path: "/top?tab=all" },
  { name: "Anime Release", path: "/release" },
];

type TopRoute = {
  name: string;
  type: string;
  icon: string;
};

export const topRoutes: TopRoute[] = [
  { name: "Top Comics", type: "all", icon: "fontisto:snowflake-6" },
  { name: "Top Daily", type: "daily", icon: "tabler:hexagon-letter-d" },
  { name: "Top Weekly", type: "weekly", icon: "tabler:hexagon-letter-w" },
  { name: "Top Monthly", type: "monthly", icon: "tabler:hexagon-letter-m" },
  {
    name: "Top Chapter",
    type: "chapter",
    icon: "fluent:document-one-page-multiple-20-regular",
  },
  { name: "Top Follow", type: "follow", icon: "ph:users" },
  { name: "Top Comment", type: "comment", icon: "fluent:comment-20-regular" },
];

export const filterValues: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Ongoing", value: "ongoing" },
];

type DynamicRoute = {
  path: string;
  apiPath: string;
  title: string;
  icon: string;
};

export const dynamicRoutes: DynamicRoute[] = [
  {
    path: "/new",
    apiPath: "/new-comics",
    title: "New Comics",
    icon: "clarity:new-solid",
  },
  {
    path: "/popular",
    apiPath: "/trending-comics",
    title: "Popular Comics",
    icon: "mdi:fire",
  },
  {
    path: "/completed",
    apiPath: "/completed-comics",
    title: "Completed Comics",
    icon: "ph:seal-check-fill",
  },
  {
    path: "/recent",
    apiPath: "/recent-update-comics",
    title: "Recently Comics",
    icon: "radix-icons:update",
  },
  {
    path: "/boy",
    apiPath: "/boy-comics",
    title: "Boy Comics",
    icon: "tabler:gender-male",
  },
  {
    path: "/girl",
    apiPath: "/girl-comics",
    title: "Girl Comics",
    icon: "tabler:gender-female",
  },
];

export const meta = (data?: { title?: string; description?: string }) => {
  const title = data?.title;
  const description = data?.description;
  return {
    title: title || "Momics | Đọc truyện tranh online miễn phí",
    ogTitle: title || "Momics | Đọc truyện tranh online miễn phí",
    description:
      description ||
      "Đọc truyện tranh Nhật Bản & truyện tranh & anime & Webtoon Trung Quốc hot nhất được phát hành trên Momics. Hàng ngàn truyện tranh và truyện tranh web nổi tiếng miễn phí! Lãng mạn, ly kỳ, giả tưởng, hài và nhiều thể loại khác để bạn khám phá.",
    ogDescription:
      description ||
      "Đọc truyện tranh Nhật Bản & truyện tranh & anime & Webtoon Trung Quốc hot nhất được phát hành trên Momics. Hàng ngàn truyện tranh và truyện tranh web nổi tiếng miễn phí! Lãng mạn, ly kỳ, giả tưởng, hài và nhiều thể loại khác để bạn khám phá.",
    ogImage: "@/assets/img/logo.svg",
  };
};
