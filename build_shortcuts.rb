=begin

what this does:

- open original XML file
- find the <dynamic_commands /> node (using pure and simple brute-force)
- replace the node by a new one full of stuff
- save the contents to a new file

TODO: add (dont replace) custom commands in Photoshop and Web Extras files

=end

require "rubygems"
require "rake"
require "erb"

SOURCE_DIR = "/Applications/Adobe Fireworks CS4/Adobe Fireworks CS4.app/Contents/Resources/en.lproj/Keyboard Shortcuts/"
TARGET_DIR = "en/Keyboard\ Shortcuts/"
LINE_REGEXP = /<dynamic_commands \/>|<dynamic_commands >(.+)<\/dynamic_commands>/ # cr(ap|ee)py

# Generate the new <dynamic_commands/> node
COMMANDS_TEMPLATE = <<-HTML
<dynamic_commands><% @commands.each do |command| %>
\t\t<jscommand name="<%= command.name %>" count="1" >
\t\t\t<shortcut text="<%= command.modifier %> <%= command.key %>" />
\t\t</jscommand><% end %>
\t</dynamic_commands>
HTML

MODIFIERS = {
  :CTRL => 8,
  :COMMAND => 4,
  :SHIFT => 2,
  :ALT => 1
}
KEYCODES = {
  :kLEFT => "28",
  :kRIGHT => "29",
  :kUP => "30",
  :kDOWN => "31",

  :k0 => "48", 
  :k1 => "49",
  :k2 => "50",
  :k3 => "51",
  :k4 => "52",
  :k5 => "53",
  :k6 => "54",
  :k7 => "55",
  :k8 => "56",
  :k9 => "57",

  :kA => "65",
  :kB => "66",
  :kC => "67",
  :kD => "68",
  :kE => "69",
  :kF => "70",
  :kG => "71",
  :kH => "72",
  :kI => "73",
  :kJ => "74",
  :kK => "75",
  :kL => "76",
  :kM => "77",
  :kN => "78",
  :kO => "79",
  :kP => "80",
  :kQ => "81",
  :kR => "82",
  :kS => "83",
  :kT => "84",
  :kU => "85",
  :kV => "86",
  :kW => "87",
  :kX => "88",
  :kY => "89",
  :kZ => "90",
}

class Command
  attr_accessor :name
  attr_accessor :modifier
  attr_accessor :key

  def initialize(command_path,shortcut_line)
    self.name = File.basename(command_path,".jsf")
    modifier = 0
    parts = shortcut_line.match(/shortcut: (.*)/)[1].split(" + ")
    self.key = KEYCODES["k#{parts.pop}".to_sym]
    parts.each do |item|
      if MODIFIERS[item.to_sym]
        modifier += MODIFIERS[item.to_sym]
      end
    end
    self.modifier = modifier
  end
end

@commands = []

Dir["Commands/**/**.jsf"].each do |f|
  File.readlines(f).each do |line|
    if line =~ /shortcut:/
      @commands << Command.new(f,line)
      break
    end
  end
end
new_commands = ERB.new(COMMANDS_TEMPLATE).result(binding)
p new_commands

Dir["#{SOURCE_DIR}/*.xml"].each do |f|
  cp f, "#{TARGET_DIR}/"
  file_name = File.basename(f,".xml")
  puts "Generating #{file_name} + Extras"
  file_contents = File.read(f)
  open("#{TARGET_DIR}/#{file_name}.xml","w") do |new_file|
    p file_contents.match(LINE_REGEXP)
    new_file << file_contents.gsub(LINE_REGEXP,new_commands)
  end
  mv "#{TARGET_DIR}/#{file_name}.xml", "#{TARGET_DIR}/#{file_name} + Extras.xml"
end