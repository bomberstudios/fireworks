# Fireworks

These are my commands and libraries for Adobe Fireworks.

## Commands
Most of my commands are intended to be bound to keyboard shortcuts. You wouldn't believe how much time you can save just by using keys to change an object's size :)

If you want to use my custom keyboard shortcuts, you can use a very-experimental, very-prone-to-fail Rake task by running

    rake shortcuts

It will generate a "Shortcuts.xml" file you can copy to $HOME/Library/Application Support/Adobe/Fireworks CS3/en/Keyboard Shortcuts/ and then choose in Fireworks by using the **Fireworks » Keyboard Shortcuts** menu.

### Alpha
A collection of commands to change an object's alpha. They work on the currently selected object(s). I bind them to Control + 1 .. 0

### Color
Two commands to change an object's fill and stroke color. I bind them to Control + C (for Fill Color) and Control + Shift + C (for Stroke Color).

### Effects
Right now there's just one command: Reflection. It creates a "wet floor" reflection of the currently selected object(s).

### Export
A command to export the current page as a PNG in 24 bits.

### Export Settings
A command to set the export format of all pages as PNG in 24 bits.

### Grids
Commands to create grids using guides (aka Reticulator)

### Guides
Commands to manage guides. The "Around Selection" creates four guides that frame the currently selected object.

### Select
Just one command that selects all Text objects in the page.

### Size
A collection of commands to resize objects. I bind them to Control + Arrows for 1 pixel increments and Control + Shift + Arrows for 10 pixel increments.

There's also three commands to set the size of the currently selected objects with numbers: **Size**, **Width** and **Height**. I bind them to Control + S, Control + W and Control + W.

All Size commands support math operations, so you can quickly make an object 23 pixels wider, or half its height, or...

Bonus points: if the selected object is a Text box, you can use a width of '0' to have it automatically resize to fit the content without wrapping.


## Libraries

TBD