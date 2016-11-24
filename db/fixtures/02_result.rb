require 'csv'

class PlayerClass

  attr_reader :first_name, :last_name

  def initialize(name_list)
    @last_name, @first_name = name_list
  end

  def name
    "#{@last_name} #{@first_name}"
  end
end

class ResultClass

  attr_accessor :line
  attr_reader :bib, :time, :route, :players

  def initialize(line)
    @line = line.chomp
  end

  def rank
    @rank ||= @line.match(/^(\d+) /)[1]
  end

  def bib
    @bib ||= @line.match(/\((\d+)\)/)[1]
  end

  def players
    return @players unless @players.nil?
    player_list = @line.split(' ')
    player1 = PlayerClass.new(player_list[2,2])
    player2 = PlayerClass.new(player_list[4,2])
    @players = [player1, player2]
  end

  def time
    @time ||= @line.match(/(\d+:\d+:\d+)/)[1]
  end

  def route=(line)
    @route ||= line.chomp.split('-')
  end

  def score
    return @score unless @score.nil?
    @score = 0
    @route.each do |point|
      @score += point.to_i if (point != 'F' && !point.nil?)
    end
    @score
  end
end

class ResultsImporter

  def import
    files.each do |f|
      results = read_results(f)
      results.each do |result|
        Result.seed do |r|
          r.bib = result.bib
          r.score = result.score
        end

        result.players.each do |player|
          Player.seed do |pl|
            pl.first_name = player.first_name
            pl.last_name = player.last_name
          end
        end

        result.players.each do |player|
          ResultPlayer.seed do |rp|
            rp.result = Result.find_by(bib: result.bib)
            rp.player = Player.find_by(first_name: player.first_name,
                                       last_name: player.last_name)
          end
        end

        result.route.each do |route|
          ResultControl.seed do |rc|
            rc.result = Result.find_by(bib: result.bib)
            rc.control = Control.find_by(code: route)
          end
        end
      end
    end
  end

  private

  def files
    Dir.glob('db/fixtures/*.txt')
  end

  def read_results(name)
    results = []
    File.open(name) do |file|
      result = nil
      is_route = false
      file.each_line do |line|
        if line.match(/\(\d+\)/)
          result = ResultClass.new(line)
          is_route = true
          next
        end
        result.route = line if is_route
        is_route = false
        results << result unless result.nil?
      end
    end
    results
  end
end

importer = ResultsImporter.new
importer.import
