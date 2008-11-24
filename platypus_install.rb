#!/usr/bin/env ruby
require "fileutils"

FIREWORKS_CS3 = "/Applications/Adobe Fireworks CS3/"
FIREWORKS_CS4 = "/Applications/Adobe Fireworks CS4/"
USER_FOLDER_CS3 = ENV['HOME'] + "/Library/Application Support/Adobe/Fireworks CS3/"
USER_FOLDER_CS4 = ENV['HOME'] + "/Library/Application Support/Adobe/Fireworks CS4/"

class OrangeCommands
  public
  def install
    header "Orange Commands v1.0-alpha"
    if is_cs3
      if is_installed?
        output "<h2>Orange Commands already installed :)</h2>"
      else
        copy_files
        output "<strong>Done!</strong>"
      end
    else
      output "<h2>OrangeCommands needs Fireworks CS3"
    end
    footer
  end

  private
  def copy_files
    output "Installing Orange Commands in <strong>#{dest}</strong>"
    %x(cp -R "#{orig}/Commands" "#{dest}")
    %x(rm -Rf "#{dest}/Commands/Development")
    %x(rm "#{dest}/Commands/Rakefile")
    %x(rm "#{dest}/Commands/Reticulator-en.mxi")
    %x(rm "#{dest}/Commands/Reticulator.mxi")
    %x(cp -R "#{orig}/en" "#{dest}")
  end

  def is_installed?
    if File.exists?("#{dest}/Commands/bs.js") && FileUtils.compare_file(dest + "/Commands/bs.js",orig + "/Commands/bs.js")
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

  def is_cs3
    return File.exist?(USER_FOLDER_CS3)
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
end

OrangeCommands.new.install