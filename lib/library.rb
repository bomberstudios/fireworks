module FW
  class Library
    attr_accessor :path, :categories, :commands

    def initialize folder
      @path = folder
      @commands = Dir["#{path}/**/**.jsf"].map { |filename| FW::Command.new(filename)}
      @categories = Dir["#{path}/**"].reject { |filename| !File.directory?(filename) || filename =~ /Development/ }.map { |filename| FW::Category.new(filename) }
      yield if block_given?
    end
  end
  class Command
    attr_accessor :name, :category, :path, :shortcut, :docs
    def initialize filename
      @path = filename
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