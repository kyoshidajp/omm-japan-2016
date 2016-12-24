require 'csv'

class PlayerClass

  attr_reader :first_name, :last_name

  def initialize(name_list)
    @last_name, @first_name = name_list
  end

  def name
    "#{@last_name} #{@first_name}"
  end

  def inspect
    name
  end
end

class ResultClass

  DNF_DISQ = 'disq'
  DNF_RET = 'ret'

  attr_accessor :line

  def initialize(line)
    @result = line.chomp.split(/ /)
  end

  def rank
    @result[0] == DNF_DISQ || @result[0] == DNF_RET ?
      nil : @result[0].to_i
  end

  def disq
    @result[0] == DNF_DISQ
  end

  def ret
    @result[0] == DNF_DISQ
  end

  def bib
    has_time? ? @result[3].to_i : @result[2].to_i
  end

  def players
    player1 = PlayerClass.new(@result[4..5])
    player2 = PlayerClass.new(@result[6..7])
    [player1, player2]
  end

  def time
    has_time? ? @result[2] : nil
  end

  def route
    @result[11..-1]
  end

  def score
    @result[1].to_i
  end

  def demerit_point
    disq ? 0 : @result[10].to_i
  end

  def inspect
    "rank: #{rank}, score: #{score}, bib: #{bib}, player1: #{players[0]}, #{players[1]}, route: #{route}"
  end

  private

  def has_time?
    @result[2] =~ /:/
  end
end

class ResultsImporter

  def import
    files.each do |f|
      day = f.match(/day(\d)/)[1].to_i
      results = read_results(f)
      results.each.with_index(1) do |result, i|
        break if (i > 10 && Rails.env.test?)
        import_player(result) if day == 1
        import_result(result, day)
        import_result_player(result, day)
        import_result_control(result, day)
      end
    end
  end

  private

  def import_result(result, day)
    Result.seed do |r|
      r.bib = result.bib
      r.score = result.score
      r.rank = result.rank
      r.disq = result.disq
      r.ret = result.ret
      r.time = result.time
      r.demerit_point = result.demerit_point
      r.score_without_demerit_point = result.score + result.demerit_point.abs
      r.day1 = day == 1
      r.day2 = day == 2
    end
  end

  def import_player(result)
    result.players.each do |player|
      Player.seed do |pl|
        pl.bib = result.bib
        pl.first_name = player.first_name
        pl.last_name = player.last_name
      end
    end
  end

  def import_result_player(result, day)
    result.players.each do |player|
      ResultPlayer.seed do |rp|
        rp.result = Result.find_by(bib: result.bib,
                                   day1: day == 1,
                                   day2: day == 2)
        rp.player = Player.find_by(first_name: player.first_name,
                                   last_name: player.last_name)
      end
    end
  end

  def import_result_control(result, day)
    result.route.each do |route|
      ResultControl.seed do |rc|
        rc.result = Result.find_by(bib: result.bib,
                                   day1: day == 1,
                                   day2: day == 2)
        rc.control = Control.find_by(code: route)
      end
    end
  end

  def files
    Dir.glob('db/fixtures/*.txt')
  end

  def read_results(name)
    results = []
    File.open(name) do |file|
      file.each_line do |line|
        results << ResultClass.new(line)
      end
    end
    results
  end
end

importer = ResultsImporter.new
importer.import
