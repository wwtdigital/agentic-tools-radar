type ScoreDisplayProps = {
  finalScore?: number | null;
  rating?: number | null;
};

export function ScoreDisplay({ finalScore, rating }: ScoreDisplayProps) {
  const hasWeighted = finalScore !== null && finalScore !== undefined;
  const hasRating = rating !== null && rating !== undefined;
  const scoresDiffer = hasWeighted && hasRating && Math.abs(finalScore! - rating!) > 0.1;

  if (!hasWeighted && !hasRating) return null;

  return (
    <div className="flex flex-col items-end flex-shrink-0">
      {scoresDiffer ? (
        // Show both scores when they differ (weighted primary)
        <>
          <div className="flex items-center gap-2 text-slate-900">
            <span className="text-2xl font-bold">{finalScore!.toFixed(1)}</span>
            <span className="text-slate-400">|</span>
            <span className="text-lg font-semibold text-slate-600">{rating!.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span>Weighted</span>
            <span>|</span>
            <span>Rating</span>
          </div>
        </>
      ) : (
        // Show single score when they're the same
        <>
          <div className="text-2xl font-bold text-slate-900">
            {(hasWeighted ? finalScore! : rating!).toFixed(1)}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {hasWeighted && hasRating ? 'Score' : hasWeighted ? 'Weighted' : 'Rating'}
          </div>
        </>
      )}
    </div>
  );
}
