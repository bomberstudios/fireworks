HOME = ENV["HOME"]
CS3 = HOME + "/Library/Application Support/Adobe/Fireworks CS3/"
CS4 = HOME + "/Library/Application Support/Adobe/Fireworks CS4/"
destinations = [CS3,CS4]

desc "Install commands and extensions in Fireworks CS3 and CS4"
task :install do
  puts "Installing commands..."
  destinations.each do |dest|
    if File.directory?(dest)
      %x(rsync -azv 'Commands' 'Common Library' 'en' '#{dest}')
    end
  end
end