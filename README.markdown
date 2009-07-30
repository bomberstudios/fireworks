# Adobe Fireworks Orange Commands v1.2.2

Orange Commands is a collection of scripts for Adobe Fireworks CS3 and CS4 that make the life of a web designer easier (or at least allow him/her to work faster :)

## Installation

- Download the ZIP file for Orange Commands:
  - [Orange Commands for CS3 Mac](http://cloud.github.com/downloads/bomberstudios/fireworks/OrangeCommands_1.2.2_CS3.zip)
  - [Orange Commands for CS4 Mac](http://cloud.github.com/downloads/bomberstudios/fireworks/OrangeCommands_1.2.2_CS4.zip)
- Expand the ZIP.
- Double click the MXP file to install the commands.
- To install the custom keyboard shortcuts, copy the XML files to:

        /Users/you/Library/Application Support/Adobe/Fireworks CS3/yourlanguage/Keyboard Shortcuts/

    or

        /Users/you/Library/Application Support/Adobe/Fireworks CS4/yourlanguage/Keyboard Shortcuts/

    depending on your version of Fireworks.
- Change the keyboard shortcuts in Fireworks in the "Fireworks » Keyboard Shortcuts..." menu, and pick one of the '+ Extras' sets.
- Restart Fireworks
- Enjoy!


## Alpha
A collection of commands to change an object's alpha. They work on the currently selected object(s).

**Shortcuts**

- &#x2303; + 1 — 10% Alpha
- &#x2303; + 2 — 20% Alpha
- &#x2303; + 3 — 30% Alpha
- &#x2303; + 4 — 40% Alpha
- &#x2303; + 5 — 50% Alpha
- &#x2303; + 6 — 60% Alpha
- &#x2303; + 7 — 70% Alpha
- &#x2303; + 8 — 80% Alpha
- &#x2303; + 9 — 90% Alpha
- &#x2303; + 0 — 100% Alpha


## Color
Commands to change an object's fill and stroke color.

**Shortcuts**

- &#x2303; + C — Set Fill Color
- &#x2303; + &#x21E7; + C — Set Stroke Color
- &#x2303; + &#x2325; + C — Set Canvas Color


## Effects
Right now there's just one command: Reflection. It creates a "wet floor" reflection of the currently selected object(s).


## Export
A command to export the current page as a PNG in 24 bits (which is what you want to use when sending your designs to a client)

**Shortcuts**

- &#x2303; + &#x21E7; + X — Export Current Page as 24 bits PNG

## Export Settings
A command to set the export format of all pages as PNG in 24 bits (something that is currently *so* time consuming and convoluted that it makes you want to cry)

## Grids
Commands to create grids using guides (aka Reticulator)

**Shortcuts**

- &#x2303; + &#x21E7; + R — Create 951/16/9 Grid

## Guides
Commands to manage guides. The "Around Selection" creates four guides that frame the currently selected object.

**Shortcuts**

- &#x2303; + &#x21E7; + W — Create Guides Around Selection


## Position
Sets the selection position on stage.

**Shortcuts**

- &#x2303; + P — Set Position

  It asks for the new position in x,y coordinates.

- &#x2303; + F — Fix Position.

  This command tries to fix a nasty bug where Fireworks will draw an item at a subpixel position. The command also tries to fix the width and height of the item.


## Properties
Changes to object properties.

**Shortcuts**

- &#x2303; + R — Set Rectangle Roundness in Pixels (supports multiple selections)


## Select
Just one command that selects all Text objects in the page. It selects objects inside groups, so you can use it to change the font on *every* text box on a page.

## Size
A collection of commands to resize objects.

All Size commands support math operations, so you can quickly make an object 23 pixels wider, or half its height, or...

Bonus points: if the selected object is a Text box, you can use a width of '0' to have it automatically resize to fit the content without wrapping.

**Shortcuts**

- &#x2303; + &#x2192; — Increment width by 1 pixel
- &#x2303; + &#x21E7; + &#x2192; — Increment width by 10 pixels
- &#x2303; + &#x2190; — Decrement width by 1 pixel
- &#x2303; + &#x21E7; + &#x2190; — Decrement width by 10 pixels
- &#x2303; + &#x2193; — Increment height by 1 pixel
- &#x2303; + &#x21E7; + &#x2193; — Increment height by 10 pixels
- &#x2303; + &#x2191; — Decrement height by 1 pixel
- &#x2303; + &#x21E7; + &#x2191; — Decrement height by 10 pixels
- &#x2303; + S — Set Size (width,height)
- &#x2303; + W — Set Width
- &#x2303; + H — Set Height


## Text
Text operations

**Shortcuts**

- &#x2303; + A — Arialize selection (sets currently selected text blocks to Arial)