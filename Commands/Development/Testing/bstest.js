try {
  fw.runScript(fw.appJsCommandsDir + "/bs.js");
} catch(e){
  alert("This command requires the bs.js library\rGet it at http://github.com/bomberstudios/fireworks/");
};

var test_document;
var asserts = 0;
var ok = 0;
var fail = 0;
var test_output = "";
function log(msg){
  //alert(msg);
  test_output += msg + ' (' + new Date() + ')\n';
}
// General setup
function add_rectangle(){
  fw.getDocumentDOM().addNewRectanglePrimitive({left:0, top:0, right:100, bottom:100}, 0);
  fw.getDocumentDOM().setBrushNColor(null, "#ffffff00");
}

// Test init

function assert(desc, expression, thing, expected) {
  test_output += "- " + desc + ": ";
  asserts++;
  if ((expression)) {
    ok++;
    test_output += "OK.\n";
  } else {
    fail++;
    test_output += 'FAIL.';
    if (thing != null) {
      test_output += ' Got ' + thing + ', expected ' + expected;
    };
    test_output += '\n';
  }
}
function assert_equal(desc,thing,expected){
  assert(desc, thing === expected, thing, expected);
}
function assert_not_equal(desc,first,second){
  // special check for arrays
  if (second !== undefined) {
    if ((first.constructor == [].constructor) && (second.constructor == [].constructor)) {
      first = first.toString();
      second = second.toString();
    };
  }
  assert(desc, first !== second);
}
function assert_is_defined(desc, thing) {
  assert_not_equal(desc, thing, undefined);
}
function assert_is_number(desc, thing) {
  assert(desc, thing.constructor === new Number().constructor );
}

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

// redefine fw.browseForFolderURL
fw.browseForFolderURL = function(){
  return prompt_folder;
};

function setup() {
  test_document = fw.createFireworksDocument({x:400,y:400}, {pixelsPerUnit:72, units:"inch"}, '#ffffff00');
  add_rectangle();
}
function teardown() {
  fw.closeDocument(test_document,false);
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

