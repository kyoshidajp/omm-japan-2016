require 'csv'

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

control_importer = ControlsImporter.new
control_importer.import
