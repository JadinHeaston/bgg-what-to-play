import { describe, test, expect } from "vitest";
import { applyFiltersAndSorts } from "./BggCollection.utils";
import type { CollectionFilters } from "./useCollectionFilters";
import type { BoardGame } from "./useGetCollectionQuery.utils";

describe(applyFiltersAndSorts.name, () => {
  const MOCK_GAME: BoardGame = {
    name: "Ticket to Ride",
    id: "9209",
    thumbnail: "thumbnail.png",
    minPlayers: 2,
    maxPlayers: 2,
    playingTime: 60,
    recommendedPlayerCount: [],
  };

  const MOCK_FILTERS: CollectionFilters = {
    showInvalidPlayerCount: false,
  };

  test.each`
    showInvalidPlayerCount | expectedLength
    ${true}                | ${3}
    ${false}               | ${1}
  `(
    "GIVEN recommendedPlayerCount length originally 3, WHEN showInvalidPlayerCount=$showInvalidPlayerCount, THEN expect recommendedPlayerCount length = $expectedLength",
    ({ showInvalidPlayerCount, expectedLength }) => {
      const gameWith3Recs = {
        ...MOCK_GAME,
        recommendedPlayerCount: [
          { numplayers: "1" },
          { numplayers: "2" },
          { numplayers: "2+" },
        ],
      };
      const filter = { ...MOCK_FILTERS, showInvalidPlayerCount };
      const actual = applyFiltersAndSorts([gameWith3Recs] as any, filter);
      expect(actual[0].recommendedPlayerCount.length).toBe(expectedLength);
    }
  );
});
