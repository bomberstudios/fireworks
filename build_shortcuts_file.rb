require "erb"

OUTPUT = "en/Keyboard\ Shortcuts/Shortcuts.xml"

MODIFIERS = {
  :CTRL => 8,
  :SHIFT => 2
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

open(OUTPUT,"w") do |f|
  f << ERB.new(IO.read("Shortcuts.erb")).result
end

%x(mate "#{OUTPUT}")


# output_file = File.open(OUTPUT,"w") do |file|
#   file << <<EOF
# <?xml version="1.0" encoding="UTF-8"?>
# <!-- FW shortcut file -->
# 
# <shortcutfile readonly="true" >
#   <menu_commands />
#   <dynamic_commands>
# EOF
# 
#   Dir["Commands/**/**.jsf"].each do |f|
#     commands << Command.new(f)
#     puts command.name
#     key_shortcut = ""
#     modifiers = 0
#     key = ""
#     File.readlines(f).each do |line|
#       if line =~ /shortcut:/
#         shortcut_text = line.match(/shortcut: (.*)/)[1]
#         shortcut_text.split(" + ").each do |item|
#           if MODIFIERS[item.to_sym]
#             modifiers += MODIFIERS[item.to_sym]
#           else
#             key = KEYCODES["k#{item}".to_sym]
#           end
#         end
#       end
#     end
#     file << "<jscommand name=\"#{File.basename(f,'.jsf')}\" count=\"1\">"
#     if modifiers > 0
#       file << "\n<shortcut text=\"#{modifiers.to_s} #{key}\" />\n"
#     end
#     file << "</jscommand>\n"
#   end
#   file << <<EOF
#   </dynamic_commands>
#   <tools />
#   <smartshapes />
# </shortcutfile>
# EOF
# end