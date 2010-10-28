var asserts = 0;
var ok = 0;
var fail = 0;
var test_output = "";
function log(msg){
  alert(msg);
  test_output += msg + ' (' + new Date() + ')\n';
}
// General setup
function add_rectangle(){
  fw.getDocumentDOM().addNewRectanglePrimitive({left:0, top:0, right:100, bottom:100}, 0);
}

// Test init
function assert(desc, thing, expected) {
  test_output += "- " + desc + ": ";
  asserts++;
  if (thing === expected) {
    ok++;
    test_output += "OK.\n";
  } else {
    fail++;
    test_output += 'FAIL. Got ' + thing + ' and expected ' + expected.toString() + '\n';
  }
}
function setup() {
  a = new Array(10);
  for (var i=0; i < a.length; i++) {
    a[i] = i;
  };
  add_rectangle();
  // redefine prompt() function so that we can specify the value(s) it returns.
  // This way, we can run tests on commands that ask the user for values.
  prompt = function(msg,default_value){
    if (prompt_return) {
      return prompt_return;
    } else {
      return default_value;
    }
  };
  // redefine alert();
  // alert = log;
  // redefine fw.popupColorPickerOverMouse
  fw.popupColorPickerOverMouse = function(){
    return prompt_return;
  };
}
function teardown() {
  fw.getDocumentDOM().selectAll();
  fw.deleteSelection();
  delete(a);
}
function run_command(kind, command){
  try {
    f = fw.appJsCommandsDir + "/" + kind + "/" + encodeURIComponent(command) + ".jsf";
    fw.runScript(f);
  } catch (exception) {
    alert("Error running command " + kind + "/" + command + ".\n" + [exception, exception.lineNumber, exception.fileName].join("\n"));
  }
}
function test(what,f) {
  scenario = what;
  test_output += '\n' + what + '\n';
  setup();
  f.call();
  teardown();
}
function xtest(what,f){ };

