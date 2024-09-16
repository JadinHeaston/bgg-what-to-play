import { useFilterState } from "@/components/ServiceProvider";
import { AcceptedResponse } from "./AcceptedResponse";
import { FilterStatus } from "./FilterStatus";
import { GameCard } from "./GameCard";
import { MissingSomethingResponse } from "./MissingSomethingResponse";
import { useGetCollectionQuery } from "./hooks/useGetCollectionQuery";

export const BggCollection = () => {
  const {
    filterState: { username, showExpansions },
    applyFiltersAndSorts,
  } = useFilterState();

  const { data, pubdate, loadingMessage, error, boardGameCollectionStatus } =
    useGetCollectionQuery(username, showExpansions);

  if (boardGameCollectionStatus === "loading") return <></>;

  if (error?.isBoardGameAccepted) return <AcceptedResponse />;

  if (error?.isBoardGameEmpty)
    return (
      <MissingSomethingResponse message="You have zero games in your collection?" />
    );

  const filteredGames = applyFiltersAndSorts(data);

const handleRandomClick: React.MouseEventHandler<HTMLButtonElement> = () => {
	const listElement = document.getElementById('loading-search-results');
	if (listElement) {
		// Remove the class from previously selected game, if any
		const previouslySelected = listElement.querySelector('.selected-game');
		if (previouslySelected) {
			previouslySelected.classList.remove('selected-game');
		}

		const items = listElement.querySelectorAll('li:not([aria-hidden="true"])');
		if (items.length > 0) {
			const randomIndex = Math.floor(Math.random() * items.length);
			const selectedItem = items[randomIndex];
			selectedItem.classList.add('selected-game');
			selectedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}
};

  return (
    <div>
      <FilterStatus
        pubdate={pubdate}
        filteredGamesLength={filteredGames.length}
        totalGamesLength={data.length}
        loadingMessage={loadingMessage}
	  />

		  <button title="Random!" id="random" onClick={handleRandomClick}>
			  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.9979 1.58018C11.6178 1.22132 12.3822 1.22132 13.0021 1.58018L20.5021 5.92229C21.1197 6.27987 21.5 6.93946 21.5 7.65314V16.3469C21.5 17.0606 21.1197 17.7202 20.5021 18.0778L13.0021 22.4199C12.3822 22.7788 11.6178 22.7788 10.9979 22.4199L3.49793 18.0778C2.88029 17.7202 2.5 17.0606 2.5 16.3469V7.65314C2.5 6.93947 2.88029 6.27987 3.49793 5.92229L10.9979 1.58018ZM4.5 7.65314V7.65792L11.0021 11.4223C11.6197 11.7799 12 12.4395 12 13.1531V20.689L19.5 16.3469V7.65314L12 3.31104L4.5 7.65314ZM6.13208 12.3C6.13206 11.7477 5.74432 11.0761 5.26604 10.7999C4.78776 10.5238 4.40004 10.7476 4.40006 11.2999C4.40008 11.8522 4.78782 12.5238 5.2661 12.7999C5.74439 13.0761 6.1321 12.8523 6.13208 12.3ZM8.72899 18.7982C9.20728 19.0743 9.59499 18.8505 9.59497 18.2982C9.59495 17.7459 9.20721 17.0743 8.72893 16.7982C8.25065 16.522 7.86293 16.7459 7.86295 17.2982C7.86297 17.8504 8.25071 18.522 8.72899 18.7982ZM5.2661 16.799C5.74439 17.0751 6.1321 16.8513 6.13208 16.299C6.13206 15.7467 5.74432 15.0751 5.26604 14.799C4.78776 14.5228 4.40004 14.7467 4.40006 15.2989C4.40008 15.8512 4.78782 16.5228 5.2661 16.799ZM8.72851 14.7995C9.20679 15.0756 9.5945 14.8518 9.59448 14.2995C9.59446 13.7472 9.20673 13.0756 8.72844 12.7995C8.25016 12.5233 7.86245 12.7471 7.86246 13.2994C7.86248 13.8517 8.25022 14.5233 8.72851 14.7995ZM14.8979 8.00001C15.3762 7.72388 15.3762 7.27619 14.8979 7.00006C14.4196 6.72394 13.6441 6.72394 13.1658 7.00006C12.6875 7.27619 12.6875 7.72388 13.1658 8.00001C13.6441 8.27614 14.4196 8.27614 14.8979 8.00001ZM10.0981 7.00006C10.5764 7.27619 10.5764 7.72388 10.0981 8.00001C9.61982 8.27614 8.84434 8.27614 8.36604 8.00001C7.88774 7.72388 7.88774 7.27619 8.36604 7.00006C8.84434 6.72394 9.61982 6.72394 10.0981 7.00006ZM15.9954 15.3495C16.5932 15.0043 17.0779 14.1649 17.0779 13.4745C17.0779 12.7842 16.5933 12.5044 15.9955 12.8496C15.3977 13.1948 14.9131 14.0342 14.913 14.7246C14.913 15.4149 15.3976 15.6947 15.9954 15.3495Z"></path></svg>
		  </button>
	
      <ol
        aria-label="Search results"
        aria-busy={!!loadingMessage}
        aria-describedby="loading-search-results"
        className="m-0 flex list-none flex-wrap gap-4 p-0 text-center"
		id="loading-search-results"
      >
        {filteredGames?.map((game) => (
          <li key={game.id} className="min-w-[40ch] flex-1">
            <GameCard game={game} />
          </li>
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <li
            key={`placeholder-${i}`}
            className="m-2 min-w-[40ch] flex-1"
            aria-hidden="true"
          ></li>
        ))}
      </ol>
    </div>
  );
};
