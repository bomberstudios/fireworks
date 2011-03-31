# encoding: utf-8

require "rubygems"
require "rake"
require "rdiscount"
require "erb"
require 'fileutils'
require 'lib/library'

ORANGE_COMMANDS_VERSION = "1.7"
DOWNLOAD_SERVER = "http://orangecommands.com/dl/"
@fw_versions = ["CS3","CS4","CS5"]
# @fw_versions = ["CS3","CS4","CS5", "CS5.1"]
# @fw_versions = ["CS3","CS5"]
@orangecommands = FW::Library.new 'Commands'
@pro = false

def app_folder
  os = RUBY_PLATFORM
  if os =~"darwin"
    "/Applications/"
  end
end

desc "Update About... command"
task :about do
  if @pro
    system("cd ../OrangeCommandsAbout && rake pro")
    cp "../OrangeCommandsAbout/deploy/OrangeCommandsAboutPro.swf", "Commands/About Orange Commands.swf"
  else
    system("cd ../OrangeCommandsAbout && rake")
    cp "../OrangeCommandsAbout/deploy/OrangeCommandsAbout.swf", "Commands/About Orange Commands.swf"
  end
end
task :about_pro do
  @pro = true
end

desc "Build MXI file with Commands"
task :mxi => :clean do
  @files = @orangecommands.files
  @fw_versions.each do |fw_version|
    case fw_version
    when "CS3"
      @documentation = File.read("README.markdown").gsub('&#x2303;','CONTROL').gsub('&#x21E7;','SHIFT').gsub('&#x2325;','ALT').gsub(/^\n/,"\n\n")
    when 'CS4'
      @documentation = RDiscount.new(File.read("README.markdown")).to_html.gsub(/<h(\d+)>/,"<b>").gsub(/<\/h(\d+)>/,"</b>")
    end
    open("OrangeCommands_#{ORANGE_COMMANDS_VERSION}_#{fw_version}.mxi","w") do |f|
      f << ERB.new(File.read('tpl/OrangeCommands.rmxi')).result
    end
  end
end

desc "Build XML for keyboard shortcuts"
task :shortcuts do
  running_folder = %x(pwd).chomp
  xml_source_dirs = @fw_versions.map { |v| "/Applications/Adobe Fireworks #{v}/Adobe Fireworks #{v}.app/Contents/Resources/en.lproj/Keyboard Shortcuts/" }
  xml_source_dirs << 'tpl'
  xml_target_dirs = @fw_versions.map { |v| "en/Keyboard\ Shortcuts/#{v}" }
  xml_target_dirs << "en/Keyboard\ Shortcuts/Orange"

  LINE_REGEXP = /<dynamic_commands \/>|<dynamic_commands >(.+)<\/dynamic_commands>/ # cr(ap|ee)py

  @commands = @orangecommands.commands.reject { |command| command.shortcut == "No shortcut" }

  new_commands = ERB.new(File.read('tpl/OrangeCommands.rxml')).result(binding)

  xml_target_dirs.each do |dir|
    if !File.exist? dir
      FileUtils.mkdir_p dir
    end
  end

  xml_source_dirs.each_with_index do |folder,i|
    Dir["#{folder}/*.xml"].each do |f|
      cp f, "#{xml_target_dirs[i]}/"
      file_name = File.basename(f,".xml")
      puts "Generating #{file_name} + Extras"
      file_contents = File.read(f)
      open("#{xml_target_dirs[i]}/#{file_name}.xml","w") do |new_file|
        new_file << file_contents.gsub(LINE_REGEXP,new_commands)
      end
      mv "#{xml_target_dirs[i]}/#{file_name}.xml", "#{xml_target_dirs[i]}/#{file_name} + Extras.xml"
    end
  end
end

desc "Build MXP files"
task :mxp do
  system("'/Applications/Adobe Extension Manager CS4/Adobe Extension Manager CS4.app/Contents/MacOS/Adobe Extension Manager CS4' -suppress -package mxi=OrangeCommands_#{ORANGE_COMMANDS_VERSION}_CS3.mxi mxp=OrangeCommands#{@pro ? 'Pro': ''}_#{ORANGE_COMMANDS_VERSION}_CS3.mxp")
  system("'/Applications/Adobe Extension Manager CS4/Adobe Extension Manager CS4.app/Contents/MacOS/Adobe Extension Manager CS4' -suppress -package mxi=OrangeCommands_#{ORANGE_COMMANDS_VERSION}_CS4.mxi mxp=OrangeCommands#{@pro ? 'Pro': ''}_#{ORANGE_COMMANDS_VERSION}_CS4.mxp")
  system("'/Applications/Adobe Extension Manager CS5/Adobe Extension Manager CS5.app/Contents/MacOS/Adobe Extension Manager CS5' -suppress -package mxi=OrangeCommands_#{ORANGE_COMMANDS_VERSION}_CS5.mxi mxp=OrangeCommands#{@pro ? 'Pro': ''}_#{ORANGE_COMMANDS_VERSION}_CS5.mxp")
end

task :clean do
  FileUtils.rm Dir.glob(["*.mxi","*.mxp","*.zip","README.html"])
end

desc "Pack OrangeCommands as ZIP files"
task :pack do
  @fw_versions.each do |version|
    %x(cp "en/Keyboard\ Shortcuts/#{version}/"*.xml .)
    %x(zip -9 "OrangeCommands#{@pro ? 'Pro': ''}_#{ORANGE_COMMANDS_VERSION}_#{version}.zip" OrangeCommands#{@pro ? 'Pro': ''}_#{ORANGE_COMMANDS_VERSION}_#{version}.mxp *.xml README.html)
  end
  %x(rm *.xml *.mxi)
  FileUtils.mkdir_p "pkg/#{ORANGE_COMMANDS_VERSION}"
  system("mv *.zip *.mxp pkg/#{ORANGE_COMMANDS_VERSION}/")
  if @pro
    %x(cd pkg/#{ORANGE_COMMANDS_VERSION} && zip -9 "OrangeCommandsPro_All_Versions.zip" OrangeCommandsPro*.zip)
  end
end

desc "Release ZIP files to the world"
task :release do
  system("git push origin master")
  @fw_versions.each do |version|
    system("scp 'pkg/#{ORANGE_COMMANDS_VERSION}/OrangeCommands_#{ORANGE_COMMANDS_VERSION}_#{version}.zip' oc:www/dl/")
    system("ssh oc cp www/dl/OrangeCommands_#{ORANGE_COMMANDS_VERSION}_#{version}.zip www/dl/orangecommands_latest_#{version.downcase}.zip")
  end
end

task :normal => [ :clean, :shortcuts, :readme, :about, :mxi, :mxp, :pack ] do
  puts "Orange Commands #{ORANGE_COMMANDS_VERSION} ready"
end

task :pro    => [ :clean, :shortcuts, :readme, :about_pro, :about, :mxi, :mxp, :pack ] do
  puts "Orange Commands Pro #{ORANGE_COMMANDS_VERSION} ready"
end


task :install do
  system("rsync -azv Commands \"/Applications/Adobe\ Fireworks\ CS3/Configuration/\" --exclude='*.md'")
  system("rsync -azv Commands \"/Applications/Adobe\ Fireworks\ CS4/Configuration/\" --exclude='*.md'")
  system("rsync -azv Commands \"/Applications/Adobe\ Fireworks\ CS5/Configuration/\" --exclude='*.md'")
  system("rsync -azv Commands \"/Applications/Adobe\ Fireworks\ CS5.1/Configuration/\" --exclude='*.md'")
end

desc "Build docs"
task :readme do
  open("README.markdown","w") do |f|
    f << ERB.new(File.read("tpl/README.erb")).result
  end
  system('maruku README.markdown')
end

def run_test version
  %x(open Commands/Development/Testing/TestSuite.jsf -a "Adobe Fireworks #{version}.app")
end

namespace :test do
  desc 'Test in Fireworks CS3 only'
  task :cs3 do
    run_test 'CS3'
  end

  desc 'Test in Fireworks CS4 only'
  task :cs4 do
    run_test 'CS4'
  end

  desc 'Test in Fireworks CS5 only'
  task :cs5 do
    run_test 'CS5'
  end

  desc 'Test in Fireworks CS5.1 only'
  task :cs51 do
    run_test 'CS5.1'
  end

  task :all => [:install, :cs3, :cs4, :cs5, :cs51]
end

desc 'Run Test Suite'
task :test => :"test:all"

task :kill do
  @fw_versions.each do |version|
    system("killall 'Adobe Fireworks #{version}'")
  end
end

task :count do
  puts @orangecommands.files.size
end