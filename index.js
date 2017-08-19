#!/usr/bin/env node

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const Confirm = require('prompt-confirm');
const fs = require('fs');

const parameters = process.argv.slice(2);
let numImages = 0;

//Required inputs
const inputtedURL = parameters[0];
let selectedDevices = parameters[1];

//Modifier inputs
const modifiers = parameters.slice(2);
let fullScreenStatus = false;
let forceYes = false;

//Check user has provided enough information
if (process.argv.length <= 2) {
    console.log("Incorrect Usage. Please use the following format:\n npm run generate-screenshots https://www.google.com ['iPhone 6', iPhone 5'] | all");
    process.exit(0);
}

//Check for screenshots folder, if not found then create it
const dir = './generated-screenshots';
if (!fs.existsSync(dir)){
    console.log(`Creating folder ${dir}...`);
    fs.mkdirSync(dir);
}

//Handle device input
if ( selectedDevices === "all" ) {
    numImages = devices.length;
} else {
    selectedDevices = selectedDevices.split(/,\s*/);
    numImages = selectedDevices.length;
}

//Handle modifier input
for (let modifier in modifiers) {
    switch (modifiers[modifier]) {
        case 'fullscreen':
            fullScreenStatus = true;
            break;
        case 'force-yes':
            forceYes = true;
            break;
        default:
            console.log(`Incorrect modifier provided: ${modifiers[modifier]}`);
            process.exit(0);
    }
}

let generate = async () => {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    let currentDevice;

    if (selectedDevices !== "all") {
        for (let i=0; i<selectedDevices.length; i++) {
            currentDevice = selectedDevices[i]

            await page.emulate( devices[ currentDevice ] );
            await page.goto(inputtedURL);
            await page.screenshot({path: 'generated-screenshots/' + currentDevice + '.jpg', fullPage: fullScreenStatus});
            console.log('Created file: ' + currentDevice + '.jpg' + ' inside folder: ' + dir);            
        }
    } else {
        for (let i=0; i<devices.length; i++) {
            currentDevice = devices[i];

            await page.emulate( currentDevice );
            await page.goto(inputtedURL);
            await page.screenshot({path: 'generated-screenshots/' + currentDevice.name + '.jpg', fullPage: fullScreenStatus});
            console.log('Created file: ' + currentDevice.name + '.jpg' + ' inside folder: ' + dir);   
        }
    }

    browser.close();
};

//Prompt user for confirmation - as long as force-yes isn't provided as a modifier
if (forceYes) {
    generate();
} else {
    new Confirm(`This will generate ${numImages} images, are you sure you wish to proceed`).ask(function(answer) {
        if (answer) {
            generate();
        } else {
            process.exit(0);
        }
    });
}


