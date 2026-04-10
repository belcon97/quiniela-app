import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";

// Types
import { HomeData } from "../../types/home.types";
// Services
import { homeApi } from "../../services/homeApi";

export function useHome() {
  const { token } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        if (!token) return;
        const response = await homeApi.getHomeData(token);
        setHomeData(response.homeData);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, [token]);

  return {
    data: homeData,
    loading,
  };
}
