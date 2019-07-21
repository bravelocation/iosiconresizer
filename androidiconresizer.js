#!/usr/bin/env node

var Jimp = require('jimp');
var path = require('path');

var inputPath = process.argv[2];
var outputRootDir = process.argv[3];
var padding = 0

var inputSize = parseInt(process.argv[4])
var sizes = [
	{ size: inputSize, dir: "drawable-mdpi"}, 
	{ size: inputSize * 1.5, dir: "drawable-hdpi"}, 
	{ size: inputSize * 2, dir: "drawable-xhdpi"}, 
	{ size: inputSize * 3, dir: "drawable-xxhdpi"}
];

if (process.argv.length > 5) {
	padding = parseInt(process.argv[5])
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
		let outputDirectory = path.join(outputRootDir, item.dir)
		let outputPath = path.join(outputDirectory, inputFileDetails.name + inputFileDetails.ext);

		let imageSize = item.size;
		resizeWithMargin(image.resize(imageSize, imageSize).quality(100), padding).write(outputPath);

		console.log('Icon created: ' + outputPath + ' (' + imageSize + 'x' + imageSize + ')');
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