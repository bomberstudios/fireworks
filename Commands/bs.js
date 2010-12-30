// bs.js Library
// a collection of (hopefully) useful tools for Fireworks

// Utility methods
FwArray.prototype.clone = Array.prototype.clone = function(){
  return [].concat(this);
};
FwArray.prototype.each_with_index = Array.prototype.each_with_index = function(callback,traverse_groups){
  Selection.forget();

  var count = 0;
  for (var i = this.length - 1; i >= 0; i--){
    el = this[i];
    fw.selection = el;

    switch (el.kind()) {
      case 'autoshape':
        traverse_groups = false;
        break;
      default:
        if (traverse_groups == undefined) {
          traverse_groups = true;
        }
        break;
    }

    if (el.is_group() && traverse_groups) {
      el.each_in_group(callback);
    } else {
      callback.call(this,el,count);
      Selection.stored_selection.push(fw.selection[0]);
    }
    count++;
  };
  Selection.restore();
};
FwArray.prototype.each = Array.prototype.each = FwArray.prototype.each_with_index;

Number.prototype.times = function(callback){
  for (var s = this - 1; s >= 0; s--){
    callback.call(this,s);
  };
};
Element.each_in_group = function(callback){
  for (var e = this.elements.length - 1; e >= 0; e--){
    if (this.elements[e].is_group()) {
      this.elements[e].each_in_group(callback);
    } else {
      callback.call(this,this.elements[e]);
      Selection.stored_selection.push(fw.selection[0]);
    }
  }
};
Text.prototype.resize = function(w,h) {
  fw.selection = this;
  if (w){
    w = Math.round(w);
    h = Math.round(h);
    this.autoExpand = false;

    var offset = Math.round(h - Math.round(this.height)),
        leading = this.textRuns.initialAttrs.leading,
        leadingMode = this.textRuns.initialAttrs.leadingMode;

    if (leadingMode == 'percentage') {
      offset = offset/100;
    };

    this.rawWidth = w - 4; // amazingly stupid bug in Fireworks...
    if (offset) {
      fw.getDocumentDOM().setTextLeading(leading + offset, leadingMode);
    };
  } else {
    this.autoExpand = true;
  }
};
Object.prototype.is_group = function(){
  return (this == "[object Group]");
};
Element.resize = function(w,h){
  //if (this.__proto__ == Instance) {
    // FIXME: Object is a symbol, and they sometimes get destroyed when resized below its minimum size
  //};
  if(isNaN(w) || isNaN(h)) return;
  fw.selection = this;
  // Round numbers, because half pixels suck big time
  //var x_pos = Math.round(this.left);
  //var y_pos = Math.round(this.top);
  w = Math.round(w);
  h = Math.round(h);
  //fw.getDocumentDOM().setSelectionBounds({left:x_pos,top:y_pos,right:(x_pos + w),bottom:(y_pos + h)},"autoTrimImages transformAttributes");
  fw.getDocumentDOM().resizeSelection(w,h);
};
Element.set_position = function(x,y){
  fw.selection = this;
  x = Math.round(x);
  y = Math.round(y);

  switch (this.kind()) {
    case 'text':
      this.rawLeft = x + 2;
      this.rawTop = y + 2;
      break;
    case 'image':
    case 'group':
      this.left = x;
      this.top = y;
      break;
    case 'autoshape':
      fw.getDocumentDOM().moveSelectionBy({x: x - this.left, y: y - this.top}, false, false);
      break;
    case 'element':
      var x_offset = 0,
          y_offset = 0;

      if (this.pathAttributes.brush) {
        if(this.pathAttributes.brushPlacement == 'outside') {
          y_offset = this.pathAttributes.brush.diameter;
        }
        if(this.pathAttributes.brushPlacement == 'center') {
          y_offset = Math.floor(this.pathAttributes.brush.diameter / 2);
        }
        x_offset = y_offset * 2;
      };
      this.left = x - x_offset;
      this.top = y - y_offset;
      break;
    default:
      // don't do anything for unknown objects...
      break;
  }
};

Element.is_symbol = function(){
  return (this.kind() == 'symbol');
};
Element.is_text = function(){
  return (this.kind() == 'text');
};
Object.prototype.kind = function(){

  if(this.smartShapeCode != undefined ) { return 'autoshape'; };

  if (this.elements) { return 'group'; };

  if (this.__proto__ == Text.prototype ) { return 'text'; };

  if (this.__proto__ == Instance ) { return 'symbol'; };

  if (this == "[object Image]") { return 'image'; };

  return 'element';
};

function dump(obj) {
  var output = "Dumping " + obj + "\n\n";
  for ( var i in obj ){
    output += obj + '.'+ i + " (" + typeof(obj[i]) + ") = " + obj[i] + "\n";
  }
  alert(output);
}

function benchmark(func){
  // CS3: 1000x1000 canvas, transparent bg
  // object is a simple rectangle with plain fill
  // objects are not grouped
  // 
  // resize v2: inverse loop
  // resize v3: don't remember selections
  // resize v4: remember selections, traverse groups
  // resize v5: remember selections, traverse groups, resizeSelection
  // 
  // Objects      Operation       Time (ms), CS3      Time (ms), CS5
  // ===============================================================
  //   1          resize                 2
  //   2          resize                 3
  //   4          resize                 8
  //   8          resize                21
  //  16          resize                65
  //  32          resize               245
  // 100          resize              3644                  4075
  // 200          resize             16633                 23910
  // 400          resize             94193                146241 (crash)
  //              resize v2          80439
  //              resize v3           1402
  //              resize v4           1856
  //              resize v5           1473                  1652

  start = new Date();
  func.call();
  end = new Date();
  alert(end - start);
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
  path: function(){
    return fw.getDocumentPath(null).split(escape(fw.getDocumentDOM().docTitleWithoutExtension))[0];
  },
  dump: function(){
    var filePath = fw.userJsCommandsDir;
    var fileName = fw.getDocumentDOM().docTitleWithoutExtension;
    if(fileName == ""){
      fileName = "untitled";
    }
    fileName = "/" + fileName + "_dump.txt";
    Files.createFile(filePath + fileName,".txt","FWMX");
    var my_file = Files.open(filePath + fileName,true); // Open file for writing
    my_file.write(fw.getDocumentDOM().javascriptString);
    my_file.close();
  },
  export_in: function(path,options){
    if (options == undefined) {
      Document.set_export_as_png_24();
    } else {
      fw.getDocumentDOM().setExportOptions(options);
    }
    fw.exportDocumentAs(null, path, null);
  },
  set_export_as_png_24: function(){
    fw.getDocumentDOM().setExportOptions({animAutoCrop:true,animAutoDifference:true,applyScale:false,colorMode:"24 bit",crop:false,cropBottom:0,cropLeft:0,cropRight:0,cropTop:0,ditherMode:"none",ditherPercent:100,exportFormat:"PNG",frameInfo:[  ],interlacedGIF:false,jpegQuality:80,jpegSelPreserveButtons:false,jpegSelPreserveText:true,jpegSelQuality:90,jpegSelQualityEnabled:false,jpegSmoothness:0,jpegSubsampling:0,localAdaptive:true,lossyGifAmount:0,macCreator:"",macFileType:"",name:"PNG 24",numCustomEntries:0,numEntriesRequested:0,numGridEntries:6,optimized:true,paletteEntries:null,paletteInfo:null,paletteMode:"adaptive",paletteTransparency:"none",percentScale:100,progressiveJPEG:false,savedAnimationRepeat:0,sorting:"none",useScale:true,webSnapAdaptive:false,webSnapTolerance:14,xSize:0,ySize:0});
  },
  is_saved: function(){
    return (fw.getDocumentPath(null) != "");
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
    for (var i = current_v_guides.length - 1; i >= 0; i--){
      current_guides.vGuides.push(current_v_guides[i]);
    }
    for (var j = current_h_guides.length - 1; j >= 0; j--){
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
      for (var i = current_guides.hGuides.length - 1; i >= 0; i--){
        if(current_guides.hGuides[i] != where){
          Guides.addHorizontal(current_guides.hGuides[i]);
        }
      }
    } else {
      Guides.clear('vertical');
      for (var j = current_guides.vGuides.length - 1; j >= 0; j--){
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

    var doc = fw.getDocumentDOM();

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

    for (var i = number_of_columns - 1; i >= 0; i--){
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
    var doc = fw.getDocumentDOM();
    // Check if there's an object selected, and use its position as the starting position
    var sel = doc.getSelectionBounds();
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

    for (var i = number_of_columns - 1; i >= 0; i--){
      Guides.add(guide_position,"horizontal");
      guide_position += column_width;
      Guides.add(guide_position,"horizontal");
      guide_position += gutter_width;
    }
    alert("Column size: " + column_width);
  }
};

Selection = {
  stored_selection: [],
  all: function(){
    fw.getDocumentDOM().selectAll();
    return fw.selection;
  },
  get_bounds: function(){
    return fw.getDocumentDOM().getSelectionBounds();
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
    [].concat(fw.selection).each(callback);
  },
  save: function(){
    this.stored_selection = fw.selection.clone();
  },
  forget: function(){
    this.stored_selection = [];
  },
  restore: function() {
    fw.selection = this.stored_selection;
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
    text_fields.sort(Sort.by_x);
    text_fields.sort(Sort.by_y);
    text_fields.each(function(t){
      for (var i = t.textRuns.textRuns.length - 1; i >= 0; i--){
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
  create: function(contents,url){
    // Delete any existing file with the same name. If
    // you do not, and then open the file for rewriting,
    // saved text will be written over the existing file
    // which could leave remnants of the old file behind
    if (!url) {
      fileURL = fw.browseForFileURL("select", "", "");
    } else {
      fileURL = url;
    }

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
  count: function(){
    try {
      return fw.getDocumentDOM().pagesCount;
    } catch (exception) {
      // Create page at the end of page list...
      fw.getDocumentDOM().addNewPage();

      // Move it to the first position
      last_page_index = fw.getDocumentDOM().currentPageNum;
      fw.getDocumentDOM().reorderPages(last_page_index, 0);

      // Change active page to first page
      fw.getDocumentDOM().changeCurrentPage(0);

      // Remove it
      fw.getDocumentDOM().deletePageAt(0);
  
      return last_page_index;
    }
  },
  each: function(callback){
    var i = Pages.count() - 1;
    for (i; i >= 0; i--){
      fw.getDocumentDOM().changeCurrentPage(i);
      callback.call(this,i);
    }
  },
  vertical_trim: function(){
    var doc = fw.getDocumentDOM();
    var l = doc.layers.length - 1;
    for (l; l >= 0; l--){
      doc.selectAllOnLayer(l,true,false);
      // Here be dragons.
      // Now, *this* is a perfect example of why Fireworks seems to be
      // coded by a bunch of drunk monkeys. If you don't add the "lock everything"
      // line, the command works *but* if you UNDO it, *everything* will be locked
      // regardless of its original state. I wish my prose would be as cool as to
      // allow me to say something like <http://twitter.com/pieratt/status/5238194652>
      // but the best I can muster is a simple "Adobe, fuck you".
      doc.setElementLocked(-1, -1, -1, true, true, true); // lock everything
      doc.setElementLocked(-1, -1, -1, false, true, false); // unlock everything
    }
    var doc_height = Selection.bottom();
    doc.setDocumentCanvasSize({left:0, top: 0, right: doc.width, bottom: doc_height}, true);
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

Color = {
  hex_to_rgba: function(hexstr){
    var a, i, r, g, b, alpha;
    hexstr = hexstr.replace(/[^0-9a-f]+/ig, '');
    if (hexstr.length == 3) {
      a = hexstr.split('');
    } else if (hexstr.length == 6 || hexstr.length == 8) {
      a = hexstr.match(/(\w{2})/g);
    }
    for (i = a.length - 1; i >= 0; i--){
      if (a[i].length == 2) {
        a[i] = parseInt(a[i], 16);
      } else {
        a[i] = parseInt(a[i], 16);
        a[i] = a[i]*16 + a[i];
      }
    }
    // RGB
    r = a[0];
    g = a[1];
    b = a[2];

    // Alpha
    if (a.length == 3) {
      alpha = 1;
    } else if (a[3] == 0) {
      alpha = 0;
    } else {
      alpha =  Math.round((a[3] / parseInt('ff',16))*100) / 100;
    }
    return 'rgba('+r+','+g+','+b+','+alpha+')';
  }
};

UI = {
  prompt: function(txt,default_value){
    setTimeout('quit()',10000);
    return prompt(txt,default_value);
  }
};
