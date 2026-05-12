import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParams } from "@/navigation/navigation.types";

// Types
import type { HomeData } from "../types/home.types";
// Services
import { homeService } from "../services/homeService";

export function useHome() {
  const { token } = useAuthStore();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        if (!token) return;
        const response = await homeService.getHomeData(token);
        setHomeData(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
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
