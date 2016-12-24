class ResultsUpdater
  def update
    days = [:day1, :day2]
    days.each do |day|
      Result
        .where(day1: day == :day1,
               day2: day == :day2)
        .order(score_without_demerit_point: :DESC,
               rank: :ASC).map.with_index(1) do |result, i|
          result.update!(rank_without_demerit_point: i)
      end
    end
  end
end

updater = ResultsUpdater.new
updater.update

