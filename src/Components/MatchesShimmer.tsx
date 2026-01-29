const MatchesShimmer = () => {
  let ShimmerList = Array.from({ length: 5 }, (_, ind) => ind + 1);
  return (
    <div className="p-3 flex gap-5">
      {ShimmerList.map(() => {
        return (
          <div className="flex flex-col">
            <div className="h-11 w-11 rounded-4xl bg-gradient-to-r from-gray-300 via-gray-340 to-gray-400 animate-pulse"></div>
            <div className="w-11 h-2 rounded-2xl mt-2 bg-gradient-to-r from-gray-300 via-gray-340 to-gray-400 animate-pulse"></div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchesShimmer;
