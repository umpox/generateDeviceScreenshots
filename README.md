# generate-device-screenshots
A simple command line tool to generate device screenshots of different webpages.

## Installation
*generate-device-screenshots requires Node version 7.10 or greater*

To use generate-device-screenshots in your project, run:
```
npm i generate-device-screenshots
```

Then add the following to your `package.json` file
```
"scripts":{
  "generate-device-screenshots": "generate-device-screenshots"
}
```


> **Note**: Installing generate-device-screenshots will install [Puppeteer](https://github.com/GoogleChrome/puppeteer), a headless version of Chromium (~71Mb Mac, ~90Mb Linux, ~110Mb Win)



## Usage
#### Generate screenshot from a single device
`npm run generate-device-screenshots https://example.com "iPhone 6"`

#### Generate screenshots from multiple devices
`npm run generate-device-screenshots https://example.com "iPhone 6, Nexus 10"`

#### Generate screenshots from [every device currently available in Google developer tools](https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js)
`npm run generate-device-screenshots https://example.com "all"`

#### Generate fullscreen screenshot
`npm run generate-device-screenshots https://example.com "iPhone 6" fullscreen`

#### Generate screenshot without prompting the user for confirmation (used in a build process)
`npm run generate-device-screenshots https://example.com "iPhone 6" force-yes`


## Parameter documentation
`npm run generate-device-screenshots <url> <devices> <fullscreen> <force-yes>`

```
<url>
- Required
- Example: https://example.com
```

```
<devices>
- Required
- Example 1: "iPhone 6"
- Example 2: "iPhone 6, iPhone 5"
- Example 3: "all"
- Must be a valid and exact name from the list of available devices or "all" to use every device
```

```
<fullscreen>
- Optional
- Example: fullscreen
```

```
<force-yes>
- Optional
- Example: force-yes
```
