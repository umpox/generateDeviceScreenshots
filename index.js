const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const Confirm = require('prompt-confirm');

let parameters = process.argv.slice(2);
let numImages = 0;
let inputtedURL = parameters[0];
let selectedDevices = parameters[1].split(/,\s*/);

if ( selectedDevices === "all" ) {
    numImages = devices.length;
} else {
    selectedDevices = Array.from(selectedDevices);
    numImages = selectedDevices.length;
}

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

        await page.goto(inputtedURL);

        if (selectedDevices !== "all") {
            for (device in selectedDevices) {
                await page.emulate( devices[ selectedDevices[device] ] );
                await page.screenshot({path: 'screens/' + selectedDevices[device] + '.png'});
            }
        } else {
            for (device in devices) {
                await page.emulate( devices[device] );
                await page.screenshot({path: 'screens/' + devices[device].name + '.png'});            
            }
        }

        browser.close();
    });
};
