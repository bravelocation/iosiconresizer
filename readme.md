# iOS Icon Resizer #

A simple nodeJS script that takes an input image and generates
images of the required sizes for iOS apps

## Installation ##

1. Install [nodeJS](https://nodejs.org) if you don't have it on your system already
2. Download all the code, and run `npm install`

## Running the script ##

`node iosiconresizer.js [path to source image]`

This will generate images in the same directory as the source image,
with the new files named using the size of the image

e.g. node iosiconresizer.js /path/to/image/rootimage.jpg will generate:

- /path/to/image/rootimage29.jpg
- /path/to/image/rootimage40.jpg
- /path/to/image/rootimage58.jpg
- ...
