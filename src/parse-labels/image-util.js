let fs = require('fs');
let path = require('path');

const getImageMap = (dirs, type) => {
    let typeSuffix = 'COLOR-8-BIT.JPG';
    if (type == 'thermal') {
        typeSuffix = 'THERM-16BIT.PNG';
    }
    let map = new Map();
    for (let dir of dirs) {
        let files = fs.readdirSync(dir);
        for (let file of files) {
            if (file.endsWith(typeSuffix)) {
                map.set(file, path.join(dir, file));
            }
        }
    }
    return map;
}

const copyImageFilesToDir = (images, imageMap, dir) => {
    let i = 0;
    for (let image of images) {
        fs.copyFile(imageMap.get(image), path.join(dir, image), (err) => {
            if (err) {
                console.log(`Failed to copy ${image}: ${err}`);
            }
            if (++i % 1000 == 0) {
                console.log(`${i} images copied`);
            }
        });
    }
}

module.exports.getImageMap = getImageMap;
module.exports.copyImageFilesToDir = copyImageFilesToDir;
