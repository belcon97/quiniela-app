import { getMatchesRepository } from "../repositories/matchRepository";

export const getMatchesService = async () => {
  return getMatchesRepository();
};