const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const Confirm = require('prompt-confirm');
var fs = require('fs');

let parameters = process.argv.slice(2);
let numImages = 0;

//Required inputs
let inputtedURL = parameters[0];
let selectedDevices = parameters[1];

//Modifier inputs
let modifiers = parameters.slice(2);
let fullScreenStatus = false;
let forceYes = false;

//Check for screenshots folder, if not found then create it
let dir = './generated-screenshots';
if (!fs.existsSync(dir)){
    console.log("Creating folder '" + dir + "'...");
    fs.mkdirSync(dir);
}

//Check user has provided enough information
if (process.argv.length <= 2) {
    console.log("Incorrect Usage. Please use the following format:\n npm run generate-screenshots https://www.google.com ['iPhone 6', iPhone 5'] | all");
    process.exit(0);
}

//Handle device input
if ( selectedDevices === "all" ) {
    numImages = devices.length;
} else {
    selectedDevices = Array.from(selectedDevices.split(/,\s*/));
    numImages = selectedDevices.length;
}

//Handle modifier input
for (modifier in modifiers) {
    switch (modifiers[modifier]) {
        case 'fullscreen':
            fullScreenStatus = true;
            break;
        case 'force-yes':
            forceYes = true;
            break;
        default:
            console.log('Incorrect modifier provided: ' + modifiers[modifier]);
            process.exit(0);
    }
}

let generate = function() {
    (async() => {
        const browser = await puppeteer.launch();
        let page = await browser.newPage();

        if (selectedDevices !== "all") {
            for (var i=0; i<selectedDevices.length; i++) {
                await page.emulate( devices[ selectedDevices[i] ] );
                await page.goto(inputtedURL);
                await page.screenshot({path: 'generated-screenshots/' + selectedDevices[i] + '.jpg', fullPage: fullScreenStatus});
                console.log('Created file: ' + selectedDevices[i] + '.jpg' + ' inside folder: ' + dir);            
            }
        } else {
            for (var i=0; i<devices.length; i++) {
                await page.emulate( devices[i] );
                await page.goto(inputtedURL);
                await page.screenshot({path: 'generated-screenshots/' + devices[i].name + '.jpg', fullPage: fullScreenStatus});
                console.log('Created file: ' + devices[i].name + '.jpg' + ' inside folder: ' + dir);   
            }
        }

        browser.close();
    })();
};



//Prompt user for confirmation - as long as force-yes isn't provided as a modifier
if (forceYes) {
    generate();
} else {
    new Confirm('This will generate ' + numImages + ' images, are you sure you wish to proceed').ask(function(answer) {
        if (answer) {
            generate();
        } else {
            process.exit(0);
        }
    });
}


