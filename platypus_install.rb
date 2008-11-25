#!/usr/bin/env ruby
require "fileutils"

FIREWORKS_CS3 = "/Applications/Adobe Fireworks CS3/"
FIREWORKS_CS4 = "/Applications/Adobe Fireworks CS4/"
USER_FOLDER_CS3 = ENV['HOME'] + "/Library/Application Support/Adobe/Fireworks CS3/"
USER_FOLDER_CS4 = ENV['HOME'] + "/Library/Application Support/Adobe/Fireworks CS4/"

STRINGS = {
  :en => {
    :title => "Orange Commands v1.0-alpha",
    :installed => "Orange Commands already installed :)",
    :installing => "Installing Orange Commands in",
    :done => "Done!",
    :requirements => "OrangeCommands needs Fireworks CS3"
  },
  :es => {
    :title => "Orange Commands v1.0-alpha",
    :installed => "Orange Commands ya está instalado :)",
    :installing => "Instalando Orange Commands en",
    :done => "¡Listo!",
    :requirements => "OrangeCommands necesita Fireworks CS3"
  }
}

class OrangeCommands
  public
  def install
    header(label(:title))
    if is_cs3
      if is_installed?
        output "<h2>#{label(:installed)}</h2>"
      else
        copy_files
        output "<strong>#{label(:done)}</strong>"
      end
    else
      output "<h2>#{label(:requirements)}</h2>"
    end
    footer
  end

  private
  def copy_files
    output "#{label(:installing)} <strong>#{dest}</strong>"
    # Commands
    if !File.exist?("#{dest}/Commands")
      %x(mkdir "#{dest}/Commands")
    end
    %x(cp "#{orig}/Commands/bs.js" "#{dest}/Commands/")
    %x(cp -R "#{orig}/Commands/Alpha" "#{dest}/Commands/")
    %x(cp -R "#{orig}/Commands/Color" "#{dest}/Commands/")
    %x(cp -R "#{orig}/Commands/Effects" "#{dest}/Commands/")
    %x(cp -R "#{orig}/Commands/Export" "#{dest}/Commands/")
    %x(cp -R "#{orig}/Commands/Export Settings" "#{dest}/Commands/")
    %x(cp -R "#{orig}/Commands/Grids" "#{dest}/Commands/")
    %x(cp -R "#{orig}/Commands/Guides" "#{dest}/Commands/")
    %x(cp -R "#{orig}/Commands/Pages" "#{dest}/Commands/")
    %x(cp -R "#{orig}/Commands/Position" "#{dest}/Commands/")
    %x(cp -R "#{orig}/Commands/Select" "#{dest}/Commands/")
    %x(cp -R "#{orig}/Commands/Size" "#{dest}/Commands/")
    %x(cp -R "#{orig}/Commands/Text" "#{dest}/Commands/")
    # Keyboard Shortcuts
    FileUtils.mkdir_p("#{dest}/en/Keyboard Shortcuts/")
    %x(cp "#{orig}/en/Keyboard Shortcuts/#{version}/"*.xml "#{dest}/#{lang}/Keyboard Shortcuts/")
  end

  def is_installed?
    if File.exists?("#{dest}/Commands/bs.js") && FileUtils.compare_file("#{dest}/Commands/bs.js","#{orig}/Commands/bs.js")
      return true
    else
      return false
    end
  end

  def orig
    File.dirname(__FILE__)
  end

  def dest
    if File.exist?(USER_FOLDER_CS3)
      # return ENV['HOME'] + "/Desktop/tmp/Platypus/"
      return USER_FOLDER_CS3
    end
    if File.exist?(USER_FOLDER_CS4)
      return USER_FOLDER_CS4
    end
  end
  def lang
    Dir["#{FIREWORKS_CS3}/Adobe Fireworks CS3.app/Contents/Resources/*.lproj"].each do |dir|
      return dir.match(/\/(\w+).lproj/)[1]
    end
  end
  def is_cs3
    return File.exist?(USER_FOLDER_CS3)
  end
  def version
    "CS3"
  end
  def header txt
    puts <<-HTML
<style type="text/css" media="screen">
  body { font-family: Helvetica; }
</style>
<body>
  <h1>#{txt}</h1>
HTML
  end
  def footer
    puts <<-HTML
</body>
HTML
  end
  def output txt
    puts "<p>#{txt}</p>"
  end

  def label name
    STRINGS[lang.to_sym][name]
  end
end

OrangeCommands.new.install