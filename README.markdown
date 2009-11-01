CSS: style.css

# Orange Commands v1.4.3-dev for Adobe Fireworks

Orange Commands is a collection of scripts for Adobe Fireworks CS3 and CS4 that make the life of a web designer easier (or at least allow him/her to work faster :)


## Installation

1. Download Orange Commands [for Fireworks CS3](http://sofanaranja.com/dl/OrangeCommands_1.4.3-dev_CS3.zip) or [for Fireworks CS4](http://sofanaranja.com/dl/OrangeCommands_1.4.3-dev_CS4.zip)
2. Expand the ZIP.
3. Double click the MXP file to install the commands.
4. To install the custom keyboard shortcuts, copy the XML files to:

      /Users/you/Library/Application Support/Adobe/Fireworks CS3/yourlanguage/Keyboard Shortcuts/

    or

      /Users/you/Library/Application Support/Adobe/Fireworks CS4/yourlanguage/Keyboard Shortcuts/

    depending on your version of Fireworks.
5. Change the keyboard shortcuts in Fireworks in the "Fireworks » Keyboard Shortcuts..." menu, and pick one of the '+ Extras' sets.
6. Restart Fireworks
7. Enjoy!


## Commands: What they do, and how to use them


### Alpha
A collection of commands to change an object's alpha. They work on the currently selected object(s). If the selection is a group, the transparency is changed for the whole group.


- **Alpha 10**  (CTRL + 1)
  
  Set the selected objects’ alpha to 10%

- **Alpha 100**  (CTRL + 0)
  
  Set the selected objects’ alpha to 100%

- **Alpha 20**  (CTRL + 2)
  
  Set the selected objects’ alpha to 20%

- **Alpha 30**  (CTRL + 3)
  
  Set the selected objects’ alpha to 30%

- **Alpha 40**  (CTRL + 4)
  
  Set the selected objects’ alpha to 40%

- **Alpha 50**  (CTRL + 5)
  
  Set the selected objects’ alpha to 50%

- **Alpha 60**  (CTRL + 6)
  
  Set the selected objects’ alpha to 60%

- **Alpha 70**  (CTRL + 7)
  
  Set the selected objects’ alpha to 70%

- **Alpha 80**  (CTRL + 8)
  
  Set the selected objects’ alpha to 80%

- **Alpha 90**  (CTRL + 9)
  
  Set the selected objects’ alpha to 90%

### Color
Commands to change an object's fill and stroke color. When pressing the shortcut, a color picker will appear at the mouse pointer's position, allowing you to pick a color quite fast.


- **Canvas Color**  (CTRL + ALT + C)
  
  Set Canvas Color

- **Fill Color**  (CTRL + C)
  
  Set fill color. If the selection is a group, every object inside the group will be filled with the selected color. If the selected object has a gradient fill, it will be replaced with a solid fill. If the selected object is a Symbol, a Color Effect will be applied to it.

- **Stroke Color**  (CTRL + SHIFT + C)
  
  Set stroke color.

### Effects


- **Lightbox**  (No shortcut)
  
  Creates a Lightbox from the current page.

- **Reflection**  (No shortcut)
  
  It creates a "wet floor" reflection of the currently selected object(s). The command asks for the reflection's height.

### Export


- **All Pages as PNG 24 in…**  (No shortcut)
  
  Exports all pages as flattened (non editable) PNG files with a 24 bits color depth.  
The commands prompts you for a folder to export, and files are saved with the page names as the file names.  
It also changes the Optimize settings for all pages, because I hate the "GIF as default format" :)

- **All Pages as PNG 24**  (CTRL + ALT + SHIFT + X)
  
  Exports all pages as flattened (non editable) PNG files with a 24 bits color depth.  
The files are saved in a folder named YYYYMMDDHHMMSS (i.e: 20091028170642) inside the current folder, with the page names as the file names.  
It also changes the Optimize settings for all pages, because I hate the "GIF as default format" :)

- **Current Page as PNG 24 in…**  (No shortcut)
  
  Exports the current page as a flattened (non editable) PNG file with a 24 bits color depth. This command will ask you for the filename and folder location, and is specially built for @plumilla.

- **Current Page as PNG 24**  (CTRL + SHIFT + X)
  
  Exports the current page as a flattened (non editable) PNG file with a 24 bits color depth. The file is saved in the same folder as the current file, with the page name added to the current file name.
I.e: if your file is called CoolDesign.png, and the current page is called 'Home', the command creates a file named CoolDesign_Home.png

### Export Settings


- **Set PNG 24 for All Pages**  (No shortcut)
  
  A command to set the export format of all pages as PNG in 24 bits (something that is currently *so* time consuming and convoluted that it makes you want to cry)

### Grids
Commands to create grids using guides (the commands formerly known as "Reticulator")

- **Reticulator 950-12-10**  (No shortcut)
  
  Creates a 950 pixels wide layout, with 12 columns and a 10 px gutter.

- **Reticulator 951-16-9**  (CTRL + SHIFT + R)
  
  Creates a 951 pixels wide layout, with 16 columns and a 9 px gutter.

- **Reticulator Horizontal**  (No shortcut)
  
  Creates a grid using horizontal guides.

- **Reticulator**  (No shortcut)
  
  Creates a grid using vertical guides. It asks for the layout width, the number of columns, and the gutter width. If you have a selected object, the command will use its current position as the starting position of the grid, and its width as the default layout width.

### Guides


- **Around Selection**  (CTRL + SHIFT + W)
  
  Creates four guides that frame the currently selected objects.

- **Clear All**  (No shortcut)
  
  Removes all guides from the current page.

- **Clear Horizontal**  (No shortcut)
  
  Removes all horizontal guides from the current page.

- **Clear Vertical**  (No shortcut)
  
  Removes all vertical guides from the current page.

- **Copy from Page**  (No shortcut)
  
  Asks for a page number, and copies the guides from that page to the current one.

- **Copy to Page**  (No shortcut)
  
  Asks for a page number, and copies the guides from the current page to that one.

### Pages


- **Duplicate Current**  (CTRL + SHIFT + D)
  
  Duplicates the current page at the end of the page list.

- **Numberize**  (No shortcut)
  
  Adds a number in front of the page name, according to its order in the page panel.  
If you reorder your pages, run this command again to have them renumbered.

- **Pages to Frames**  (No shortcut)
  
  A command that copies all your pages to frames on a new scratch page.
Specially built for <http://limalimon.com.es>

- **Set Page Name**  (CTRL + SHIFT + P)
  
  Asks for a new name for the current page. This command was born out of frustration with the way page names are edited in Fireworks CS3. If your page names have more than 10 characters, it's really hard not to get crazy editing names :)

- **Sort**  (No shortcut)
  
  Sorts the pages in alphabetical order.

- **Vertical Trim All Pages**  (CTRL + SHIFT + T)
  
  Trims all pages vertically, fitting the contents. It does not modify the width of the pages.

- **Vertical Trim**  (CTRL + T)
  
  Trims the current page vertically, fitting the contents. It does not modify the width of the page.  

### Position


- **Fix Position**  (CTRL + F)
  
  This command tries to fix a nasty bug where Fireworks will draw an item at a subpixel position. The command also tries to fix the width and height of the item so that they become integer numbers. Why Adobe thought it would be useful to draw using half pixels is beyond me...

- **Set Position**  (CTRL + P)
  
  It asks for the new position in x,y coordinates.

### Properties


- **Set Rectangle Roundness in Pixels**  (CTRL + R)
  
  Sets the selection corner roundness in pixels (something that is not possible in CS3). Useful when you want to set the same roundness in a collection of rectangles with different sizes.
This command only makes sense for CS3, as CS4 lets you specify roundness in pixels.

### Select


- **Text Objects**  (No shortcut)
  
  Selects all text objects in the current page.
Extremely useful when you need to change the font for all text in a page.

### Size
A collection of commands to resize objects.

If multiple objects are selected, each one will be transformed independently.

All Size commands support math operations, so you can quickly make an object 23 pixels wider, or half its height, or...

**Bonus points:** if the selected object is a Text box, you can use a width of '0' to have it automatically resize to fit the content without wrapping.


- **Height +1**  (CTRL + DOWN)
  
  Increment selected object’s height by 1 pixel.

- **Height +10**  (CTRL + SHIFT + DOWN)
  
  
- **Height -1**  (CTRL + UP)
  
  Decrease selected object’s height by 1 pixel.

- **Height -10**  (CTRL + SHIFT + UP)
  
  Decrease selected object's height by 10 pixels.

- **Height**  (CTRL + H)
  
  Sets the height of the selection.

- **Set Size**  (CTRL + S)
  
  Sets selected object’s size. It asks for the width and height in w,h format. Supports math operations.

- **Width +1**  (CTRL + RIGHT)
  
  Increment selected object’s width by 1 pixel.

- **Width +10**  (CTRL + SHIFT + RIGHT)
  
  Increment selected object’s width by 10 pixels.

- **Width -1**  (CTRL + LEFT)
  
  Decrease selected object’s width by 1 pixel.

- **Width -10**  (CTRL + SHIFT + LEFT)
  
  Decrease selected object’s width by 10 pixels.

- **Width**  (CTRL + W)
  
  Sets the width of the selection.

### Text


- **Arialize Selection**  (CTRL + A)
  
  Sets currently selected text blocks to Arial with 'smooth' antialiasing.

- **Disable Antialias**  (No shortcut)
  
  Disable text antialiasing in all pages of the current document.

- **Join with…**  (CTRL + SHIFT + J)
  
  Creates a new text object containing the selected text objects’ content, joined by the desired character.

- **Join**  (CTRL + J)
  
  Creates a new text object containing the selected text objects’ content.
Each content is added on a new line.


---
Orange Commands v1.4.3-dev — last updated Sun Nov 01 07:30:24 +0100 2009