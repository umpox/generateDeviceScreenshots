const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const Confirm = require('prompt-confirm');

if (process.argv.length <= 2) {
    console.log("Incorrect Usage. Please use the following format:\n npm run generate-screenshots https://www.google.com ['iPhone 6', iPhone 5'] | all");
    process.exit(0);
}

let parameters = process.argv.slice(2);
let numImages = 0;
let inputtedURL = parameters[0];
let selectedDevices = parameters[1];


if ( selectedDevices === "all" ) {
    numImages = devices.length;
} else {
    selectedDevices = Array.from(selectedDevices.split(/,\s*/));
    numImages = selectedDevices.length;
}
/*
new Confirm('This will generate ' + numImages + ' images, are you sure?').ask(function(answer) {
    if (answer) {
        generate();
    } else {
        process.exit(0);
    }
});

let generate = function() {
    puppeteer.launch().then(async browser => {
        let page = await browser.newPage();

        if (selectedDevices !== "all") {
            for (device in selectedDevices) {
                await page.emulate( devices[ selectedDevices[device] ] );
                await page.goto(inputtedURL);
                await page.screenshot({path: 'screens/' + selectedDevices[device] + '.jpg'});
            }
        } else {
            for (device in devices) {
                await page.emulate( devices[device] );
                await page.goto(inputtedURL);
                await page.screenshot({path: 'screens/' + devices[device].name + '.jpg'});            
            }
        }

        browser.close();
    });
};
*/