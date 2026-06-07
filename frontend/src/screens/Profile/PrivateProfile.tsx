import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useTheme } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
import { useAuthStore } from "@/store/authStore";
import { usePrivateProfile } from "@/features/profile/hooks/usePrivateProfile";
// Components
import { TabSwitch } from "@/shared/ui/TabSwitch/TabSwitch";
import { Button } from "@/shared/ui/Button/Button";
import { MatchHistoryCard } from "@/shared/components/MatchHistoryCard/MatchHistoryCard";
import { LoadingState } from "@/shared/ui/LoadingState/LoadingState";
import { StateView } from "@/shared/ui/StateView/StateView";
import { Chip } from "@/shared/ui/Chip/Chip";

import { ProfileHeader } from "@/features/profile/components/ProfileHeader/ProfileHeader";
import { RulesModal } from "@/features/profile/components/RulesModal/RulesModal";
import { PendingMatchCard } from "@/features/profile/components/PendingMatchCard/PendingMatchCard";
import { TopScorerPicker } from "@/features/profile/components/TopScorerPicker/TopScorerPicker";
import { FavoriteTeamPicker } from "@/features/profile/components/FavoriteTeamPicker/FavoriteTeamPicker";
import { ChangePasswordModal } from "@/features/profile/components/ChangePasswordModal/ChangePasswordModal";
// Services
import { profileService } from "@/features/profile/services/profileService";
// Utils
import { getTeamBanner, WORLD_CUP_COUNTRIES } from "@/data/worldCup2026";
import { getBadgeFromPoints } from "@/shared/utils/getBadgeFromPoints";
import { groupByKey } from "@/shared/utils/groupByKey";
import { sortGroups } from "@/shared/utils/sortGroups";
// Styles
import { makeStyles } from "./Profile.styles";
// Types
import type { Match } from "@/shared/types";

type OnboardingStep = "rules" | "topScorer" | "favoriteTeam" | "done";

interface PendingPrediction {
  matchId: string;
  homeScore: string;
  awayScore: string;
  isWildcard: boolean;
  penaltyWinner: "home" | "away" | null;
}

export function PrivateProfile() {
  const theme = useTheme();
  const styles = useStyles(makeStyles);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const { privateData, loading, error, refetch } = usePrivateProfile();

  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("done");
  const [activeTab, setActiveTab] = useState(0);
  const [predictions, setPredictions] = useState<
    Record<string, PendingPrediction>
  >({});
  const [selectedGroup, setSelectedGroup] = useState("");
  const [saving, setSaving] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (!privateData) return;
    if (!privateData.hasReadRules) {
      setOnboardingStep("rules");
    } else if (!privateData.topScorerPrediction) {
      setOnboardingStep("topScorer");
    } else if (!privateData.favoriteTeam) {
      setOnboardingStep("favoriteTeam");
    } else {
      setOnboardingStep("done");
    }
  }, [privateData]);

  useEffect(() => {
    if (!privateData?.matchesWithoutPredictions) return;
    const initial: Record<string, PendingPrediction> = {};
    privateData.matchesWithoutPredictions.forEach((match) => {
      initial[match.id] = {
        matchId: match.id,
        homeScore: "",
        awayScore: "",
        isWildcard: false,
        penaltyWinner: null,
      };
    });
    setPredictions(initial);
  }, [privateData?.matchesWithoutPredictions]);

  const grouped = groupByKey(
    privateData?.matchesWithoutPredictions ?? [],
    "group",
  );
  const groups = sortGroups(Object.keys(grouped));
  const activeGroup = selectedGroup || groups[0] || "";
  const groupMatches = grouped[activeGroup] ?? [];
  const wildcardUsed = Object.values(predictions).some((p) => p.isWildcard);

  const favoriteTeam = user?.favoriteTeam ?? null;
  const country = WORLD_CUP_COUNTRIES.find(
    (c) => c.label.toLowerCase() === favoriteTeam?.toLowerCase(),
  );
  const banner = getTeamBanner(country?.value ?? "");

  const handleScoreChange = (
    matchId: string,
    field: "homeScore" | "awayScore",
    value: string,
  ) => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: { ...prev[matchId], [field]: value },
    }));
  };

  const handleWildcard = (matchId: string) => {
    setPredictions((prev) => {
      const isCurrentlyActive = prev[matchId]?.isWildcard;
      const updated: Record<string, PendingPrediction> = {};
      Object.entries(prev).forEach(([id, pred]) => {
        updated[id] = {
          ...pred,
          isWildcard: isCurrentlyActive ? false : id === matchId,
        };
      });
      return updated;
    });
  };

  const handlePenaltyWinner = (matchId: string, winner: "home" | "away") => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: { ...prev[matchId], penaltyWinner: winner },
    }));
  };

  const handleSavePredictions = async () => {
    if (!token) return;

    const filled = Object.values(predictions).filter(
      (p) => p.homeScore.trim() !== "" && p.awayScore.trim() !== "",
    );
    if (filled.length === 0) return;

    try {
      setSaving(true);
      await profileService.createPredictions(
        token,
        filled.map((p) => ({
          matchId: p.matchId,
          homeScore: Number(p.homeScore),
          awayScore: Number(p.awayScore),
          isWildcard: p.isWildcard,
          penaltyWinner: p.penaltyWinner ?? undefined,
        })),
      );

      const currentIndex = groups.indexOf(activeGroup);
      const nextGroup = groups[currentIndex + 1];
      setTimeout(() => {
        if (nextGroup) setSelectedGroup(nextGroup);
        refetch();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (onboardingStep === "rules") {
    return (
      <RulesModal
        visible
        onFinish={async () => {
          if (token) await profileService.markRulesAsRead(token);
          setOnboardingStep(
            !privateData?.topScorerPrediction
              ? "topScorer"
              : !privateData?.favoriteTeam
                ? "favoriteTeam"
                : "done",
          );
        }}
      />
    );
  }

  if (onboardingStep === "topScorer") {
    return (
      <TopScorerPicker
        onDone={() =>
          setOnboardingStep(
            !privateData?.favoriteTeam ? "favoriteTeam" : "done",
          )
        }
      />
    );
  }

  if (onboardingStep === "favoriteTeam") {
    return <FavoriteTeamPicker onDone={() => setOnboardingStep("done")} />;
  }

  if (loading) return <LoadingState />;
  if (error) return <StateView icon="wifi-off" title="ERROR" message={error} />;
  if (!privateData) return null;

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <ProfileHeader
          name={privateData.name}
          username={privateData.username}
          role={privateData.role}
          favoriteTeam={favoriteTeam}
          flagUrl={country?.icon ?? ""}
          banner={banner}
          wildcardAvailable={privateData.wildcardAvailable}
          totalPoints={privateData.totalPoints}
          position={privateData.position}
          topScorerName={
            privateData.topScorerPrediction?.topScorer?.name ?? null
          }
        />

        {/* Tabs */}
        <View style={styles.tabs}>
          <TabSwitch
            options={["HISTORIAL", "PREDICCIONES"]}
            activeIndex={activeTab}
            onChange={setActiveTab}
          />
        </View>

        {/* Historial */}
        {activeTab === 0 && (
          <View style={styles.padded}>
            {privateData.predictionsHistory.length === 0 ? (
              <StateView
                icon="clock"
                title="SIN HISTORIAL"
                message="Todavía no hay partidos finalizados."
              />
            ) : (
              privateData.predictionsHistory.map((prediction) => (
                <MatchHistoryCard
                  key={prediction.id}
                  prediction={prediction}
                  badge={getBadgeFromPoints(prediction.points)}
                />
              ))
            )}
          </View>
        )}

        {/* Predicciones pendientes */}
        {activeTab === 1 && (
          <View style={styles.padded}>
            {privateData.predictionsPending.length === 0 ? (
              <StateView
                icon="check-circle"
                title="TODO AL DÍA"
                message="No tenés predicciones pendientes."
              />
            ) : (
              privateData.predictionsPending.map((prediction) => (
                <MatchHistoryCard
                  key={prediction.id}
                  prediction={prediction}
                  badge={getBadgeFromPoints(prediction.points)}
                />
              ))
            )}
          </View>
        )}

        {/* Matches sin predicción */}
        {privateData.matchesWithoutPredictions.length > 0 && (
          <View style={styles.padded}>
            <Text style={styles.sectionLabel}>PREDICCIONES PENDIENTES</Text>

            {groups.length === 0 ? (
              <StateView
                icon="check-circle"
                title="¡LISTO!"
                message="Ya cargaste todos los partidos disponibles."
              />
            ) : (
              <>
                {/* Chips */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.chips}>
                    {groups.map((g) => (
                      <Chip
                        key={g}
                        isActive={activeGroup === g}
                        onPress={() => setSelectedGroup(g)}
                      >
                        {g}
                      </Chip>
                    ))}
                  </View>
                </ScrollView>

                {/* Cards */}
                {groupMatches.map((match: Match) => {
                  const pred = predictions[match.id];
                  if (!pred) return null;
                  return (
                    <PendingMatchCard
                      key={match.id}
                      match={match}
                      group={activeGroup}
                      homeScore={pred.homeScore}
                      awayScore={pred.awayScore}
                      isWildcard={pred.isWildcard}
                      wildcardUsed={wildcardUsed}
                      wildcardAvailable={privateData.wildcardAvailable}
                      penaltyWinner={pred.penaltyWinner}
                      onHomeChange={(v) =>
                        handleScoreChange(match.id, "homeScore", v)
                      }
                      onAwayChange={(v) =>
                        handleScoreChange(match.id, "awayScore", v)
                      }
                      onWildcard={() => handleWildcard(match.id)}
                      onPenaltyWinner={(w) => handlePenaltyWinner(match.id, w)}
                    />
                  );
                })}

                {/* Guardar */}
                <Button
                  onPress={handleSavePredictions}
                  disabled={saving}
                  icon={<Feather name="check" size={16} color="#fff" />}
                  iconPosition="right"
                >
                  {saving ? "GUARDANDO..." : "GUARDAR PREDICCIONES"}
                </Button>
              </>
            )}
          </View>
        )}

        {/*  Accions  */}
        <View style={styles.actionBtn}>
          <Button
            variant="outline"
            onPress={() => setOnboardingStep("favoriteTeam")}
          >
            Cambiar equipo favorito
          </Button>
        </View>

        <View style={styles.actionBtn}>
          <Button
            variant="outline"
            onPress={() => setShowChangePassword(true)}
            icon={<Feather name="lock" size={16} color={theme.textSecondary} />}
          >
            Cambiar contraseña
          </Button>
        </View>
      </ScrollView>

      {/* Modal */}
      <ChangePasswordModal
        visible={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </View>
  );
}
