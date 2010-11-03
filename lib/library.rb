module FW
  class Library

    attr_accessor :path, :categories, :commands

    def initialize folder
      @path = folder
      @commands = Dir["#{path}/**/**.jsf"].map { |filename| FW::Command.new(filename)}
      @categories = Dir["#{path}/**"].reject { |filename| !File.directory?(filename) || filename =~ /Development/ }.map { |filename| FW::Category.new(filename) }
      yield if block_given?
    end

    def files
      Dir["#{path}/**/**.jsf","#{path}/**/**.js","#{path}/**/**.swf"].reject { |o| (o =~ /Development/) }
    end
  end
  class Command
    attr_accessor :name, :category, :path, :shortcut, :docs
    def initialize filename
      @path = filename
    end
    def modifiers
      {
      :CTRL => 8,
      :COMMAND => 4,
      :SHIFT => 2,
      :ALT => 1
      }
    end
    def keycodes
      {
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
    end
    def name
      File.basename(path,'.jsf')
    end
    def category
      path.split('/')[1]
    end
    def shortcut
      File.read(path).match(/shortcut: (.*)/)
      $1 || "No shortcut"
    end
    def docs
      File.read(path).match(/\*\*DOC\*\*\n(.*)\*\*DOC\*\*/m)
      $1 || ""
    end
    def modifier
      modifier_number = 0
      parts = shortcut.split(" + ")
      parts.each do |item|
        if modifiers[item.to_sym]
          modifier_number += modifiers[item.to_sym]
        end
      end
      modifier_number
    end
    def key
      parts = shortcut.split(" + ")
      keycodes["k#{parts.pop}".to_sym]
    end
    def to_xml
      return "\t\t<jscommand name=\"#{name}\" count=\"1\" >
      \t\t\t<shortcut text=\"#{modifier} #{key}\" />
      \t\t</jscommand>"
    end
  end
  class Category
    attr_accessor :name, :path, :commands
    def initialize folder
      @path = folder
    end
    def name
      path.split('/').last
    end
    def commands
      Dir["#{path}/**/**.jsf"].map { |filename| FW::Command.new(filename)}
    end
    def description
      File.read("#{path}/../#{name}.md").to_s if File.exist? "#{path}/../#{name}.md"
    end
  end
end