require 'csv'

class ControlsImporter
  def import
    files.each do |control_file|
      day = control_file.match(/day(\d)/)[1]

      CSV.foreach(control_file) do |row|
        Control.seed(:code) do |s|
          s.code = row[0]
          s.points = row[1]
          s.description = row[2]
          s.lat = row[3]
          s.lng = row[4]
          s.day1 = day == "1"
          s.day2 = day == "2"
        end
      end
    end
  end

  private

  def files
    Dir.glob('db/fixtures/controls_day*.csv')
  end
end

control_importer = ControlsImporter.new
control_importer.import
