require "rubygems"
require "rake"
require "rdiscount"
require "erb"
require 'fileutils'
require 'lib/library'

ORANGE_COMMANDS_VERSION = "1.4.4"
DOWNLOAD_SERVER = "http://orangecommands.com/dl/"
@fw_versions = ["CS3","CS4"]
@orangecommands = FW::Library.new 'Commands'

desc "Build MXI file with Commands"
task :mxi => [:clean] do
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
  xml_source_dirs = [
    "/Applications/Adobe Fireworks CS3/Adobe Fireworks CS3.app/Contents/Resources/en.lproj/Keyboard Shortcuts/",
    "/Applications/Adobe Fireworks CS4/Adobe Fireworks CS4.app/Contents/Resources/en.lproj/Keyboard Shortcuts/"
  ]
  xml_target_dirs = [
    "en/Keyboard\ Shortcuts/CS3",
    "en/Keyboard\ Shortcuts/CS4"
  ]

  LINE_REGEXP = /<dynamic_commands \/>|<dynamic_commands >(.+)<\/dynamic_commands>/ # cr(ap|ee)py

  @commands = @orangecommands.commands

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
  %x(open -a "/Applications/Adobe Extension Manager/Extension Manager.app" OrangeCommands_#{ORANGE_COMMANDS_VERSION}_CS3.mxi)
  %x("/Applications/Adobe Extension Manager CS4/Adobe Extension Manager CS4.app/Contents/MacOS/Adobe Extension Manager CS4" -package mxi="OrangeCommands_#{ORANGE_COMMANDS_VERSION}_CS4.mxi" mxp="OrangeCommands_#{ORANGE_COMMANDS_VERSION}_CS4.mxp")
end

task :clean do
  FileUtils.rm Dir.glob(["*.mxi","*.mxp","*.zip","README.html"])
  system("rm -Rf pkg")
end

desc "Pack OrangeCommands as ZIP files"
task :pack do
  @fw_versions.each do |version|
    %x(cp "en/Keyboard\ Shortcuts/#{version}/"*.xml .)
    %x(zip -9 "OrangeCommands_#{ORANGE_COMMANDS_VERSION}_#{version}.zip" OrangeCommands_#{ORANGE_COMMANDS_VERSION}_#{version}.mxp *.xml README.html)
    %x(rm *.xml)
  end
  FileUtils.mkdir_p "pkg/#{ORANGE_COMMANDS_VERSION}"
  system("mv *.zip *.mxi *.mxp pkg/#{ORANGE_COMMANDS_VERSION}/")
end

desc "Release ZIP files to the world"
task :release do
  system("git push origin master")
  @fw_versions.each do |version|
    %x(scp pkg/#{ORANGE_COMMANDS_VERSION}/OrangeCommands_#{ORANGE_COMMANDS_VERSION}_#{version}.zip oc:www/dl/)
    %x(scp pkg/#{ORANGE_COMMANDS_VERSION}/OrangeCommands_#{ORANGE_COMMANDS_VERSION}_#{version}.zip oc:www/dl/orangecommands_latest_#{version.downcase}.zip)
  end
end

task :default => [ :clean, :shortcuts, :readme, :mxi, :mxp, :pack ]

task :install do
  system("rsync -azv Commands \"/Applications/Adobe\ Fireworks\ CS3/Configuration/\"")
end

desc "Build docs"
task :readme do
  open("README.markdown","w") do |f|
    f << ERB.new(File.read("tpl/README.erb")).result
  end
  system('maruku README.markdown')
end