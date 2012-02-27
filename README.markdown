# Orange Commands v1.7 for Adobe Fireworks

Orange Commands is a collection of scripts for Adobe Fireworks that make the life of a web designer easier (or at least allow him/her to work faster :)


## Installation

1. Download:
    - [Orange Commands 1.7 for Fireworks CS3](http://orangecommands.com/dl/OrangeCommands_1.7_CS3.zip)
    - [Orange Commands 1.7 for Fireworks CS4](http://orangecommands.com/dl/OrangeCommands_1.7_CS4.zip)
    - [Orange Commands 1.7 for Fireworks CS5](http://orangecommands.com/dl/OrangeCommands_1.7_CS5.zip)

2. Expand the ZIP.
3. Double click the MXP file to install the commands.
4. To install the custom keyboard shortcuts, copy the XML files to:

      Mac: /Users/**YOU**/Library/Application Support/Adobe/Fireworks CS5/**YOURLANGUAGE**/Keyboard Shortcuts/  
      Win: \\Users\\**YOU**\\AppData\\Roaming\\Adobe\\Fireworks CS5\\**YOUR LANGUAGE**\\Keyboard Shortcuts

5. Change the keyboard shortcuts in Fireworks in the "Fireworks » Keyboard Shortcuts..." menu, and pick one of the '+ Extras' sets.
6. Restart Fireworks
7. Enjoy!


## Commands: What they do, and how to use them


### Align


- **Center on Canvas - Both**  (No shortcut)
  
  Centers the selected object(s) on the canvas, both horizontally and vertically.

- **Center on Canvas - Horizontal**  (No shortcut)
  
  Centers the selected object(s) on the canvas, horizontally.

- **Center on Canvas - Vertical**  (No shortcut)
  
  Centers the selected object(s) on the canvas, vertically.

- **Space Horizontal**  (No shortcut)
  
  Distributes the selected elements horizontally, with the same distante beetween them.

- **Space Vertical**  (No shortcut)
  
  Distributes the selected elements vertically, with the same distante beetween them.

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

- **Stroke Alpha 10**  (CTRL + SHIFT + 1)
  
  Set the selected objects’ stroke alpha to 10%

- **Stroke Alpha 100**  (CTRL + SHIFT + 0)
  
  Set the selected objects’ stroke alpha to 100%

- **Stroke Alpha 20**  (CTRL + SHIFT + 2)
  
  Set the selected objects’ stroke alpha to 20%

- **Stroke Alpha 30**  (CTRL + SHIFT + 3)
  
  Set the selected objects’ stroke alpha to 30%

- **Stroke Alpha 40**  (CTRL + SHIFT + 4)
  
  Set the selected objects’ stroke alpha to 40%

- **Stroke Alpha 50**  (CTRL + SHIFT + 5)
  
  Set the selected objects’ stroke alpha to 50%

- **Stroke Alpha 60**  (CTRL + SHIFT + 6)
  
  Set the selected objects’ stroke alpha to 60%

- **Stroke Alpha 70**  (CTRL + SHIFT + 7)
  
  Set the selected objects’ stroke alpha to 70%

- **Stroke Alpha 80**  (CTRL + SHIFT + 8)
  
  Set the selected objects’ stroke alpha to 80%

- **Stroke Alpha 90**  (CTRL + SHIFT + 9)
  
  Set the selected objects’ stroke alpha to 90%

- **Stroke Alpha To**  (No shortcut)
  
  Set the selected objects’ stroke alpha

### Canvas


- **Canvas Height**  (CTRL + ALT + H)
  
  Sets the height of the canvas.

- **Canvas Size**  (CTRL + ALT + S)
  
  Sets the size of the canvas.

- **Canvas Width**  (CTRL + ALT + W)
  
  Sets the width of the canvas.

### Color
Commands to change an object's fill and stroke color. When pressing the shortcut, a color picker will appear at the mouse pointer's position, allowing you to pick a color quite fast.


- **Canvas Color**  (CTRL + ALT + C)
  
  Set Canvas Color

- **Copy Fill Color**  (No shortcut)
  
  Copies the currently selected object's fill color.

- **Fill Color**  (CTRL + C)
  
  Set fill color. If the selection is a group, every object inside the group will be filled with the selected color. If the selected object has a gradient fill, it will be replaced with a solid fill. If the selected object is a Symbol, a Color Effect will be applied to it.

- **Paste Fill Color**  (No shortcut)
  
  Pastes the color copied using the Copy Fill Color command to all selected objects.

- **Stroke Color**  (CTRL + SHIFT + C)
  
  Set stroke color.

### Effects


- **Background Rectangle**  (No shortcut)
  
  
- **Fake Border Inside**  (No shortcut)
  
  
- **Fake Border**  (No shortcut)
  
  
- **Lightbox**  (No shortcut)
  
  Creates a Lightbox.  
What the command does is this:  
  - Duplicates the current page.
  - Selects everything.
  - Flattens the selection and locks the resulting bitmap image.
  - Adds a black, semitransparent overlay and locks it.
  - Creates a white rectangle on top of everything.

- **Plastic**  (CTRL + G)
  
  Fills the selected object with a vertical gradient based on the current color, giving it a 'Plastic' effect.

- **Reflection**  (No shortcut)
  
  It creates a "wet floor" reflection of the currently selected object(s). The command asks for the reflection's height.

- **Repeat Horizontal**  (No shortcut)
  
  Repeats the currently selected object(s) horizontally. It asks for the number of copies and the distance between them.

- **Repeat Vertical**  (No shortcut)
  
  Repeats the currently selected object(s) vertically. It asks for the number of copies and the distance between them.

- **Safe Flatten**  (CTRL + SHIFT + ALT + Z)
  
  This command duplicates the current selection, flattens it, and hides the original. Super usefull if you want your symbols to remain sharp.

### Export


- **All Documents as JPG in**  (No shortcut)
  
  Exports all pages as JPG with the highest quality (100).  
The commands prompts you for a folder to export, and files are saved with the document's name plus '_page_X' as the file names.  
It also changes the Optimize settings for all pages, because I hate the "GIF as default format" :)

- **All Pages as PNG 24 in**  (No shortcut)
  
  Exports all pages as flattened (non editable) PNG files with a 24 bits color depth.  
The commands prompts you for a folder to export, and files are saved with the page names as the file names.  
It also changes the Optimize settings for all pages, because I hate the "GIF as default format" :)

- **All Pages as PNG 24 with Prefix**  (No shortcut)
  
  Exactly as 'All Pages as PNG 24', but asks for a prefix to be added before each page's name.  
This command is useful when you have a complex nomenclature for files, but don't want to fill your Pages panel with it :)

- **All Pages as PNG 24**  (CTRL + ALT + SHIFT + X)
  
  Exports all pages as flattened (non editable) PNG files with a 24 bits color depth.  
The files are saved in a folder named YYYYMMDDHHMMSS (i.e: 20091028170642) inside the current folder, with the page names as the file names.  
It also changes the Optimize settings for all pages, because I hate the "GIF as default format" :)

- **All Pages as PSD in**  (No shortcut)
  
  Exports all pages as PSD files.
The command prompts you for a folder to export, and files are saved with the page names as the file names.

- **Current Page as PNG 24 in**  (No shortcut)
  
  Exports the current page as a flattened (non editable) PNG file with a 24 bits color depth. This command will ask you for the filename and folder location, and is specially built for @plumilla.

- **Current Page as PNG 24**  (CTRL + SHIFT + X)
  
  Exports the current page as a flattened (non editable) PNG file with a 24 bits color depth. The file is saved in the same folder as the current file, with the page name added to the current file name.
I.e: if your file is called CoolDesign.png, and the current page is called 'Home', the command creates a file named CoolDesign_Home.png

- **Slices as CSS Sprite**  (No shortcut)
  
  Exports the slices in the current document as a .css file.  
This way, you can use your PNG file as a sprite.

### Export Settings


- **Set PNG 24 for All Pages**  (No shortcut)
  
  A command to set the export format of all pages as PNG in 24 bits (something that is currently *so* time consuming and convoluted that it makes you want to cry)

- **Set PNG 32 for All Pages**  (No shortcut)
  
  A command to set the export format of all pages as PNG in 32 bits (something that is currently *so* time consuming and convoluted that it makes you want to cry)

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

- **Copy from Master Page**  (No shortcut)
  
  Copies the guides from the master page to the current one.

- **Copy from Page**  (No shortcut)
  
  Asks for a page number, and copies the guides from that page to the current one.

- **Copy to Page**  (No shortcut)
  
  Asks for a page number, and copies the guides from the current page to that one.

- **Copy**  (No shortcut)
  
  Copies the guides from the current page.

- **Paste**  (No shortcut)
  
  Pastes the guides copied with the "Guides » Copy" command (works accross documents!).

### Layers


- **Unlock All**  (CTRL + SHIFT + U)
  
  
### Pages


- **Add Page**  (CTRL + SHIFT + N)
  
  
- **DeNumberize**  (No shortcut)
  
  Removes the page number added by the Numberize command.

- **Duplicate Current**  (CTRL + SHIFT + D)
  
  Duplicates the current page and sets it as the current page.

- **Go To Master Page**  (CTRL + SHIFT + M)
  
  The Pages » Go To Master Page command acts as a toggle: run it when in a page and it takes you to the master page. Run it again in the master page, and it takes you back to the page you were in before running the command for the first time.

- **Numberize**  (No shortcut)
  
  Adds a number in front of every page name (except the Master Page), according to its order in the page panel.  
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

- **Swap**  (No shortcut)
  
  Swaps the position of two selected objects.

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

- **Scale to 16-9**  (No shortcut)
  
  This command scales the selected object(s) so that they have a 16:9 aspect ratio.

- **Scale to 4-3**  (No shortcut)
  
  This command scales the selected object(s) so that they have a 4:3 aspect ratio.

- **Scale to Height**  (CTRL + SHIFT + ALT + H)
  
  This command scales the selected object(s) proportionally so that they have the specified height while maintaining their aspect ratio.

- **Scale to Width**  (CTRL + SHIFT + ALT + W)
  
  This command scales the selected object(s) proportionally so that they have the specified width while maintaining their aspect ratio.

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
  
  Sets currently selected text blocks to Arial.

- **Autokern Toggle**  (No shortcut)
  
  Toggles the 'Auto kern' property of selected text objects.

- **Bulletize with…**  (No shortcut)
  
  Adds a custom bullet sign in front of every line in the selected text box(es).

- **Bulletize**  (No shortcut)
  
  Adds a bullet sign (•) in front of every line in the selected text box(es).

- **Disable Antialias**  (No shortcut)
  
  Disable text antialiasing in all pages of the current document.

- **Fix Faux Bolds**  (No shortcut)
  
  Replaces fake bold text with proper Bold family in Fireworks CS4 & CS5

- **Join with…**  (CTRL + SHIFT + J)
  
  Creates a new text object containing the selected text objects’ content, joined by the desired character.

- **Join**  (CTRL + J)
  
  Creates a new text object containing the selected text objects’ content.
Each content is added on a new line.

- **Verdanize Selection**  (No shortcut)
  
  Sets currently selected text blocks to Verdana.


