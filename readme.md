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

# License #

(The MIT License)

Copyright © 2015 John Pollard

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ‘Software’), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
