const createDesktopShortcut = require('create-desktop-shortcuts');
const path = require('path');
function createShortcut (path) {
  
    const pathToYourScript = "C:\\Users\\model\\Desktop\\hotelManagmentV2\\server1.js";
    const options = {
      name: 'SERVER1',
      filePath: 'node',
      arguments: '"' + pathToYourScript + '"'
    };
  
    const shortcutsCreated = createDesktopShortcut({
      windows: options,
    
    });
  
    if (shortcutsCreated) {
      console.log('Everything worked correctly!');
    } else {
      console.log('Could not create the icon or set its permissions (in Linux if "chmod" is set to true, or not set)');
    }
  }
  createShortcut(path);