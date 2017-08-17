const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const Confirm = require('prompt-confirm');

let parameters = process.argv.slice(2)[0];
let selectedDevices = "";
let numImages = 0;

if ( parameters === "all" ) {
    selectedDevices = "";
    numImages = devices.length;
} else {
    selectedDevices = ['iPhone 6', 'iPhone 4'];
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

        await page.goto('https://www.google.com');

        if (selectedDevices !== "") {
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
