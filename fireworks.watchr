watch('logs/.*\.txt') do |match|
  line = File.readlines(match[0])[0].split("\r").last.strip
  version = line.split(':')[0].strip
  msg = line.split(':')[1].strip
  cmd = "growlnotify -n OrangeCommands --image lib/fireworks.png"
  ok = msg['0 failed']
  if !ok
    cmd << " -p 2 -s"
  end
  system "#{cmd} -m '#{msg}' #{version}"
end