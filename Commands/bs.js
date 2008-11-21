// bs.js Library
// a collection of (hopefully) useful tools for Fireworks
// 
// Credits:
// ----------------------------------------------
// Selection Save & Restore Functions v1.1
// ----------------------------------------------
// Created by Matt Stow & Amos Robinson 2008
// http://www.mattstow.com
// http://www.amospheric.com
// ----------------------------------------------

var doc = fw.getDocumentDOM();

// Utility methods
Array.prototype.clone = function(){
  var tmp_array = new Array();
  for(var i = 0; i < this.length; i++){
    tmp_array.push(this[i]);
  }
  return tmp_array;
}
Array.prototype.each = function(callback){
  for (var s=0; s < this.length; s++){
    var el = this[s];
    callback.call(this,el);
  }
}

User = {
  getLanguage: function(){
    var tmp = Files.getLanguageDirectory().split("/");
    var lang = ((tmp[tmp.length-1]).substr(0,2)).toLowerCase();
    return lang;
  },
  getJSDir: function(){
    return fw.userJsCommandsDir;
  }
};

Document = {
  dump: function(){
    var doc = fw.getDocumentDOM();
    var filePath = fw.userJsCommandsDir;
    var fileName = doc.docTitleWithoutExtension;
    if(fileName == ""){
      fileName = "untitled";
    }
    fileName = "/" + fileName + "_dump.txt";
    Files.createFile(filePath + fileName,".txt","FWMX");
    var my_file = Files.open(filePath + fileName,true); // Open file for writing
    my_file.write(doc.javascriptString);
    my_file.close();
  }
};

Guides = {
  clear: function(direction){
    var dom = fw.getDocumentDOM();
    if(!direction){
      dom.removeAllGuides('horizontal');
      dom.removeAllGuides('vertical');
    } else {
      dom.removeAllGuides(direction);
    }
  },
  get: function(){
    // We don't return the fw.getDocumentDOM().guides object
    // Instead, we clone the contents of the vGuides and hGuides arrays,
    // so we have a 'snapshot' of the guides. Extremely useful for
    // guide manipulation like that on the Document.guide.remove()
    // function (where we delete a guide by clearing all guides and
    // then re-creating all the original guides except the one we
    // wanted to delete...)
    var current_v_guides = fw.getDocumentDOM().guides.vGuides;
    var current_h_guides = fw.getDocumentDOM().guides.hGuides;
    var current_guides = {
      vGuides: [],
      hGuides: []
    };
    for(var i = 0; i< current_v_guides.length; i++){
      current_guides.vGuides.push(current_v_guides[i]);
    }
    for(var j = 0; j< current_h_guides.length; j++){
      current_guides.hGuides.push(current_h_guides[j]);
    }
    return current_guides;
  },
  add: function(where,direction){
    if (direction == "vertical") {
      Guides.addVertical(where);
    }
    if (direction == "horizontal") {
      Guides.addHorizontal(where);
    }
  },
  remove: function(where,direction){
    var current_guides = Guides.get();
    if (direction == "horizontal") {
      Guides.clear('horizontal');
      for(var i=0; i < current_guides.hGuides.length; i++){
        if(current_guides.hGuides[i] != where){
          Guides.addHorizontal(current_guides.hGuides[i]);
        }
      }
    } else {
      Guides.clear('vertical');
      for(var j=0; j < current_guides.vGuides.length; j++){
        if(current_guides.vGuides[j] != where){
          Guides.addVertical(current_guides.vGuides[j]);
        }
      }
    }
  },
  addVertical: function(where){
    fw.getDocumentDOM().addGuide(where,"vertical");
  },
  addHorizontal: function(where){
    fw.getDocumentDOM().addGuide(where,"horizontal");
  },
  vertical_grid: function(grid_width,number_of_columns,gutter_width){

    doc = fw.getDocumentDOM();

    // Check if there's an object selected, and use its position as the starting position
    sel = doc.getSelectionBounds();
    if(sel){
      var start_position = Math.floor(sel.left);
    } else {
      var start_position = 0;
    }
    
    var guide_position = start_position;
    var last_guide_position = 0;

    // Calculate column width
    var column_width = Math.floor(( grid_width - ( (number_of_columns - 1) * gutter_width ) ) / number_of_columns);

    // Make sure the guides are visible
    doc.setShowGuides(true);

    for(i=0; i < number_of_columns; i++){
      Guides.add(guide_position,"vertical");
      guide_position += column_width;
      last_guide_position = guide_position;
      Guides.add(guide_position,"vertical");
      guide_position += gutter_width;
    }
    if(User.getLanguage() == "en"){
      alert("Column size: " + column_width + "\n" + "Grid width: " + (last_guide_position - start_position));
    }
    if(User.getLanguage() == "es"){
      alert("Ancho de columna: " + column_width + "\n" + "Ancho de la retícula: " + (last_guide_position - start_position));
    }
  },
  horizontal_grid: function(grid_width,number_of_columns,gutter_width){
    doc = fw.getDocumentDOM();
    // Check if there's an object selected, and use its position as the starting position
    sel = doc.getSelectionBounds();
    if(sel){
      var start_position = sel.top;
    } else {
      var start_position = 0;
    }
    var guide_position = start_position;

    // Calculate column width
    var column_width = Math.floor(( grid_width - ( (number_of_columns - 1) * gutter_width ) ) / number_of_columns);

    // Make sure the guides are visible
    doc.setShowGuides(true);

    for(i=0; i < number_of_columns; i++){
      Guides.add(guide_position,"horizontal");
      guide_position += column_width;
      Guides.add(guide_position,"horizontal");
      guide_position += gutter_width;
    }
    alert("Column size: " + column_width);
  }
};

Selection = {
  get_bounds: function(){
    doc = fw.getDocumentDOM();
    sel = doc.getSelectionBounds();
    return sel;
  },
  width: function(){
    sel = Selection.get_bounds();
    if(sel){
      return (sel.right - sel.left);
    } else {
      return 0;
    }
  },
  height: function(){
    sel = Selection.get_bounds();
    if(sel){
      return (sel.bottom - sel.top);
    } else {
      return 0;
    }
  },
  left: function(){
    return Selection.get_bounds().left;
  },
  right: function(){
    return Selection.get_bounds().right;
  },
  top: function(){
    return Selection.get_bounds().top;
  },
  bottom: function(){
    return Selection.get_bounds().bottom;
  },
  each: function(callback){
    for (var s=0; s < fw.selection.length; s++){
      var el = fw.selection[s];
      if (el.is_group()) {
        el.each_in_group(function(e) { callback.call(this,e); })
      } else {
        callback.call(this,el);
      }
    }
  },
  clone: function(){
    var tmp_array = new Array();
    for(var i = 0; i < fw.selection.length; i++){
      tmp_array.push(fw.selection[i]);
    }
    return tmp_array;
  },
  save: function(){
    this.is_sel_id = "is_sel_id_" + (Math.random() * 100000000000000000000);
    if (fw.selection != null && fw.selection.length > 0) {
      for (var s in fw.selection) {
        if (fw.selection[s].customData != null) {
          fw.selection[s].customData[this.is_sel_id] = true;
        }
      }
    }
  },
  getObjects: function() {
    var doc = fw.getDocumentDOM();
    var objects = new Array();
    for (var lay in doc.layers) {
      for (var elem in doc.layers[lay].elems) {
        if (doc.layers[lay].elems[elem].customData != null && doc.layers[lay].elems[elem].customData[this.is_sel_id]) {
          objects.push(doc.layers[lay].elems[elem]);
        }
      }
    }
    return objects;
  },
  restore: function() {
    fw.selection = this.getObjects();
    this.destroy();
  },
  destroy: function() {
    var doc = fw.getDocumentDOM();
    for (var lay in doc.layers) {
      for (var elem in doc.layers[lay].elems) {
        if (doc.layers[lay].elems[elem].customData != null) {
          delete doc.layers[lay].elems[elem].customData[this.is_sel_id];
        }
      }
    }
  }
};

FW = {
  getTMP: function(){
    return Files.getTempFilePath(null);
  }
};

File = {
  create: function(contents){
    // Delete any existing file with the same name. If
    // you do not, and then open the file for rewriting,
    // saved text will be written over the existing file
    // which could leave remnants of the old file behind

    fileURL = fw.browseForFileURL("select", "", "");
    //alert(fileURL);

    //fileURL = "file:///HD/Users/ale/Desktop/fw_cs3_api.jsf";

    if (Files.deleteFileIfExisting(fileURL)){
      // Create a new file to write in. Note:
      // this is only required for Macs; Windows
      // will create a file with the call to open()
      if (Files.createFile(fileURL, ".txt", "TEXT")){
        // Open the file for writing. If successful, this
        // will return a reference to the file so that
        // text can be added to it using the write()
        // command.
        var fileReference = Files.open(fileURL, true);
          if (fileReference){
            // Write the text to the opened file
            fileReference.write(contents);
            // When finished, be sure to close the
            // file using the close() command so other
            // processes will be able to access it
            fileReference.close();
            // Returning true signals a successful save
            return true;
        }
      }
    }
    // Returning false signals a failed save
    return false;
  }
};

Object.prototype.resize = function(w,h){
  if (this.__proto__ == Instance) {
    // FIXME: Object is a symbol, and they sometimes get destroyed when resized below its minimum size
  };
  if(isNaN(w) || isNaN(h)) return;
  if (this.__proto__ == Text.prototype) {
    if (w){
      this.autoExpand = false;
      this.rawWidth = w - 4; // amazingly stupid bug in Fireworks...
      this.rawHeight = h;
    } else this.autoExpand = true;
  } else {
    fw.selection = this;
    fw.getDocumentDOM().setSelectionBounds({left:this.left,top:this.top,right:(this.left + w),bottom:(this.top + h)},"autoTrimImages transformAttributes");
  }
}
Object.prototype.position = function(x,y){
  this.left = x;
  this.top = y;
}
Object.prototype.is_symbol = function(){
  return (this.__proto__ == Instance);
}
Object.prototype.is_text = function(){
  return (this.__proto__ == Text.prototype);
}
Object.prototype.is_group = function(){
  if (this.elements) { return true; }
  return false;
};
Object.prototype.each_in_selection = function(callback){
  for (var s=0; s < this.length; s++){
    var el = this[s];
    callback.call(this,el);
  }
}
Object.prototype.each_in_group = function(callback){
  if (!this.is_group()) { return; }
  for (var e=0; e < this.elements.length; e++){
    if (this.elements[e].is_group()) {
      this.elements[e].each_in_group(callback);
    }
    callback.call(this,this.elements[e]);
  }
};
Object.prototype.dump = function(){
  alert(this);
}
// TODO: Object.prototype.each