// bs.js Library
// a collection of (hopefully) useful tools for Fireworks

var doc = fw.getDocumentDOM();

// Utility methods
FwArray.prototype.clone = function(){
  var tmp_array = new Array();
  for(var i = 0; i < this.length; i++){
    tmp_array.push(this[i]);
  }
  return tmp_array;
};
FwArray.prototype.each = function(callback){
  for (var s=0; s < this.length; s++){
    var el = this[s];
    if (el.is_group()) {
      el.each_in_group(callback);
    } else {
      callback.call(this,el);
    }
  };
};
Array.prototype.each = function(callback){
  for (var s=0; s < this.length; s++){
    var el = this[s];
    if (el.is_group()) {
      el.each_in_group(callback);
    } else {
      callback.call(this,el);
    }
  };
};
Element.each_in_group = function(callback){
  for (var e=0; e < this.elements.length; e++){
    if (this.elements[e].is_group()) {
      this.elements[e].each_in_group(callback);
    } else {
      callback.call(this,this.elements[e]);
    }
  }
};
Text.prototype.resize = function(w,h) {
  if (w){
    w = Math.round(w);
    h = Math.round(h);
    this.autoExpand = false;
    this.rawWidth = w - 4; // amazingly stupid bug in Fireworks...
    this.rawHeight = h;
  } else this.autoExpand = true;
};
Element.is_group = function(){
  return (this == "[object Group]");
};
Element.resize = function(w,h){
  //if (this.__proto__ == Instance) {
    // FIXME: Object is a symbol, and they sometimes get destroyed when resized below its minimum size
  //};
  if(isNaN(w) || isNaN(h)) return;
  Selection.save();
  fw.selection = this;
  // Round numbers, because half pixels suck big time
  var x_pos = Math.round(this.left);
  var y_pos = Math.round(this.top);
  w = Math.round(w);
  h = Math.round(h);
  fw.getDocumentDOM().setSelectionBounds({left:x_pos,top:y_pos,right:(x_pos + w),bottom:(y_pos + h)},"autoTrimImages transformAttributes");
  Selection.restore();
};
Element.set_position = function(x,y){
  x = Math.round(x);
  y = Math.round(y);
  if (this.is_text()){
    this.rawLeft = x + 2;
    this.rawTop = y + 2;
  } else {
    this.left = x;
    this.top = y;
  }
};
Element.is_symbol = function(){
  return (this.__proto__ == Instance);
};
Element.is_text = function(){
  return (this.__proto__ == Text.prototype);
};

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
  path: function(){
    return fw.getDocumentPath(null).split(escape(fw.getDocumentDOM().docTitleWithoutExtension))[0];
  },
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
  },
  export_in: function(path,options){
    if (options == undefined) {
      Document.set_export_as_png_24();
    };
    fw.exportDocumentAs(null, path, null);
  },
  set_export_as_png_24: function(){
    fw.getDocumentDOM().setExportOptions({animAutoCrop:true,animAutoDifference:true,applyScale:false,colorMode:"24 bit",crop:false,cropBottom:0,cropLeft:0,cropRight:0,cropTop:0,ditherMode:"none",ditherPercent:100,exportFormat:"PNG",frameInfo:[  ],interlacedGIF:false,jpegQuality:80,jpegSelPreserveButtons:false,jpegSelPreserveText:true,jpegSelQuality:90,jpegSelQualityEnabled:false,jpegSmoothness:0,jpegSubsampling:0,localAdaptive:true,lossyGifAmount:0,macCreator:"",macFileType:"",name:"PNG 24",numCustomEntries:0,numEntriesRequested:0,numGridEntries:6,optimized:true,paletteEntries:null,paletteInfo:null,paletteMode:"adaptive",paletteTransparency:"none",percentScale:100,progressiveJPEG:false,savedAnimationRepeat:0,sorting:"none",useScale:true,webSnapAdaptive:false,webSnapTolerance:14,xSize:0,ySize:0});
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
    var start_position;
    if(sel){
      start_position = Math.floor(sel.left);
    } else {
      start_position = 0;
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
    var start_position;
    if(sel){
      start_position = sel.top;
    } else {
      start_position = 0;
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
  each: function(callback){ fw.selection.each(callback); },
  save: function(){
    if (fw.selection != null && fw.selection.length > 0) {
      Selection.each(function(e){
        e.customData['is_selected'] = true;
      });
    }
  },
  restore: function() {
    var doc = fw.getDocumentDOM();
    var objects = new Array();
    for (var l=0; l < doc.layers.length; l++) {
      doc.selectAllOnLayer(l,true);
      Selection.each(function(e){
        if(e.customData['is_selected']){
          objects.push(e);
        }
        e.customData['is_selected'] = false;
      });
    }
    fw.selection = objects;
  },
  join: function(delimiter){
    if (fw.selection.length < 2) {
      return;
    };
    if (delimiter == undefined) {
      delimiter = "\u000D";
    };

    var text_fields = new Array();

    Selection.each(function(field){
      if (field.is_text()) {
        text_fields.push(field);
      }
    });

    var merged_text = {};
    merged_text.initialAttrs = text_fields[0].textRuns.initialAttrs;
    merged_text.textRuns = [];
    text_fields.sort(Sort.by_y);
    text_fields.each(function(t){
      for ( var i = 0; i < t.textRuns.textRuns.length; i++ ) {
        var current_text_run = t.textRuns.textRuns[i];
        if (i == t.textRuns.textRuns.length - 1) {
          current_text_run.characters += delimiter;
        };
        if (i == 0) {
          current_text_run.changedAttrs = t.textRuns.initialAttrs;
        }
        merged_text.textRuns.push(current_text_run);
      }
    });
    fw.getDocumentDOM().addNewText({left:Selection.left(), top:Selection.top(), right:Selection.right(), bottom:Selection.bottom()}, true);
    fw.getDocumentDOM().setTextRuns(merged_text);
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

Pages = {
  each: function(callback){
    var doc = fw.getDocumentDOM();

    // Create page at the end of page list...
    doc.addNewPage();

    // Move it to the first position
    last_page_index = doc.currentPageNum;
    doc.reorderPages(last_page_index, 0);

    // Change active page to first page
    doc.changeCurrentPage(0);

    // Remove it
    doc.deletePageAt(0);

    for(var i=0; i < last_page_index; i++){
      doc.changeCurrentPage(i);
      callback.call(this);
    }
  }
};

Sort = {
  by_y: function(a,b){
    return a.top - b.top;
  },
  by_x: function(a,b){
    return a.left - b.left;
  }
};

