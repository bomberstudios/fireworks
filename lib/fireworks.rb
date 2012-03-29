class Fireworks
  attr_accessor :path, :lang, :shortcuts_folder

  def initialize version
    @path = "/Applications/Adobe Fireworks #{version}"
    @lang = File.basename(Dir["#{path}/**.app/Contents/Resources/**.lproj"][0], '.lproj')
    @shortcuts_folder = "#{path}/Adobe Fireworks #{version}.app/Contents/Resources/#{lang}.lproj/Keyboard Shortcuts/"
    yield if block_given?
  end
end