#!/usr/bin/env node

var Jimp = require('jimp');
var path = require('path');

var inputPath = process.argv[2];
var sizes = [20, 29, 40, 44, 48, 55, 58, 60, 76, 80, 87, 88, 100, 120, 152, 167, 180, 172, 196, 216, 1024];
var padding = 0

if (process.argv.length > 3) {
	var inputSize = parseInt(process.argv[3])
	sizes = [inputSize, inputSize * 2, inputSize * 3];

	if (process.argv.length > 4) {
		padding = parseInt(process.argv[4])
	}
}

Jimp.read(inputPath).then(function (image) {
	// Check input image is square	
	var existingWidth = image.bitmap.width;
	var existingHeight = image.bitmap.height;
	
	if (existingWidth != existingHeight) {
		console.error('We can only process square images');
		return;
	}
}).catch(function (err) {
    console.error(err);
});
	
var inputFileDetails = path.parse(inputPath);

// For each size, generate a resized image
sizes.map(function(item) {
	Jimp.read(inputPath).then(function (image) {
		let outputPath = path.join(inputFileDetails.dir, inputFileDetails.name + item.toString() + inputFileDetails.ext);

		resizeWithMargin(image.resize(item, item).quality(100), padding).write(outputPath);

		console.log('Icon created: ' + outputPath + ' (' + item + 'x' + item + ')');
	}).catch(function (err) {
    console.error(err);
	});
});


function resizeWithMargin(image, margin) {
	if (margin == 0) {
		return image
	}

    var backgroundColor = image.bitmap.data.readUInt32BE(0);
    var originalWidth = image.bitmap.width;
	var originalHeight = image.bitmap.height;
	var dimensionChange = margin * 2;

	image = image.resize(originalWidth - dimensionChange, originalHeight - dimensionChange);

    var canvas = new Jimp(image.bitmap.width + margin * 2, image.bitmap.height + margin * 2, backgroundColor);

    // Clear the area for the image
    canvas.scan(margin, margin, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        canvas.bitmap.data[idx + 3] = 0;
    });

    canvas.composite(image, margin, margin);
    return canvas;
}