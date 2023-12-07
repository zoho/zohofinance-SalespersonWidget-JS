# Salesperson_JS

## Description

<p></p>

<p></p>

##### Components Used: 

    SettingWidget - User Interface to select configuration like expense account, paid account etc.
    Global Field - To store the Configuration which was selected through setting widget
    Connections -  To Get GlobalFields, Expense Accounts and paid through Accounts  and Update the GlobalFields 



## Prerequisites:

Make sure you have Node.js and npm (Node Package Manager) installed on your machine. You can download and install them from [Node.js website](https://nodejs.org/).
1. Create a Global Field in the developer portal and paste the field API name [here](https://github.com/zoho/zohofinance-SalespersonWidget-JS/blob/d260b846fc9ab80d8540fd9c119fe7edc411b16d/Salesperson-settingWidget/app/js/extension.js#L65)
2. Create connections and paste the connnection_link_name [here](https://github.com/zoho/zohofinance-SalespersonWidget-JS/blob/d260b846fc9ab80d8540fd9c119fe7edc411b16d/Salesperson-settingWidget/app/js/extension.js#L64) and also paste in [plugin-manifest.json](https://github.com/zoho/zohofinance-SalespersonWidget-JS/blob/d260b846fc9ab80d8540fd9c119fe7edc411b16d/Salesperson-settingWidget/plugin-manifest.json#L21) and ensure the scopes that you created in your developer portal

              
## Development Process of Salesperson Widget:
* Clone Repository
* Run `npm install` in the SettingsWidget Folder
* Run `zet pack` zip will be generated under your_project/dist 
* Upload the widget zip in the developer portal configure tab.
  
