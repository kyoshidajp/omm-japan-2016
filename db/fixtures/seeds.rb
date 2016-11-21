require 'csv'

class Player

  attr_reader :first_name, :last_name

  def initialize(name_list)
    @last_name, @first_name = name_list
  end

  def name
    "#{@last_name} #{@first_name}"
  end
end

class Team

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
    player1 = Player.new(person_list[2,2])
    player2 = Player.new(person_list[4,2])
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

class TeamsImporter

  def import
    files.map do |f|
      team = read_team(f)
      team
      #Control.seed(:code) do |s|
      #  s.code = row[0]
    end
  end

  private

  def files
    Dir.glob('db/fixtures/*.txt')
  end

  def read_team(name)
    result = []
    File.open(name) do |file|
      team = nil
      is_route = false
      file.each_line do |line|
        if line.match(/^\d+ \(\d+\)/)
          team = Team.new(line)
          is_route = true
          next
        end
        team.route = line if is_route
        is_route = false
        result << team unless team.nil?
      end
    end
    result
  end
end

class ControlsImporter
  def import
    CSV.foreach('db/fixtures/controls.csv') do |row|
      Control.seed(:code) do |s|
        s.code = row[0]
        s.points = row[1]
        s.description = row[2]
        s.lat = row[3]
        s.lng = row[4]
      end
    end
  end
end

#control_importer = ControlsImporter.new
#control_importer.import
timporter = TeamsImporter.new
one = timporter.import.first.first
p one
