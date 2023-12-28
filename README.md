# Salesperson-JS

## Description

<p>In this Git project, we'll explain how you can build the Salesperson widget using the Vanilla JS.</p>


## Components Used: 
<p>The following components are used in building the widget for the Salesperson extension</p>

    SettingWidget - The user interface to select configurations such as the expense account under which the salesperson's commission is stored, the account through which commission is paid to the salesperson, etc is done using settings widget.
    Global Field -  The global field is used to store the configurations that are built using the settings widget.
    Connections -  The connection is used give the extension the permission required to access the required data from Zoho Books via scopes. 


## Prerequisites:

1. You need to download and install Node.js and Node Package Manager (npm) in your device. You can install Node.js from the [Node.js website](https://nodejs.org/).
1. Create the global field in the Developer Portal and paste the global field's placeholder (API) in the [extension.js file](https://github.com/zoho/zohofinance-SalespersonWidget-JS/blob/d260b846fc9ab80d8540fd9c119fe7edc411b16d/Salesperson-settingWidget/app/js/extension.js#L65)
2. Paste the Connection Link Name in the [extension.js file](https://github.com/zoho/zohofinance-SalespersonWidget-JS/blob/d260b846fc9ab80d8540fd9c119fe7edc411b16d/Salesperson-settingWidget/app/js/extension.js#L64).In the [plugin-manifest.json file](https://github.com/zoho/zohofinance-SalespersonWidget-JS/blob/d260b846fc9ab80d8540fd9c119fe7edc411b16d/Salesperson-settingWidget/plugin-manifest.json#L21) paste the Connection Link Name and the connection's scopes.

              
## Development Process of Salesperson Widget:
* Clone the git repository by clicking Code at the top and selecting either the HTTPS or GitHub CLI link. You can paste this link in the terminal or command prompt of your device.
* In the terminal or command prompt, navigate to the settings widget folders and run the command `npm install`.
* In the settings widget folder, run the command `zet pack`. This will create a ZIP file of the widget.
* Upload the ZIP file generated in the Configure section of the Developer Portal.
  
