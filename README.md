opensrp-site: This data visualization dashboard is using by bd-site for their mCare2 project. Currently HouseHold, Eligible Couple (ELCO), Pregnant mother (ANC,PNC) information collected through openSRP application present here through user friendly view. You can export data from here for further analysis and report. It also allow to see openSRP schedule information at a glance and filter through different indicators (by health worker id, schedule date and schedule status). This help health supervisors to monitor performance, activities and follow ups of their health workers day by day task. A resource limited version of this site is also available that allows you visulize your data in Tablet. It specially useful while data bandwidth is your concern. This is angular js site and highly customizable to meet your visualization needs.

# opensrp-site

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Install for ubuntu 12.04,14.04
  Install NodeJS:
  1. Version : v0.12.7
  2. AngularJS v1.5.0
  3. export PATH=$PATH:/opt/node-v0.12.7/bin
  4. npm install -g handlebars 
  5. npm install -g karma 
  6. npm install -g grunt-cli 
  7. npm install -g corsproxy
  8. npm install -g yo 
  9. npm install -g bower
  10. npm install -g generator-angular && npm install -g generator-karma
  11. http://stackoverflow.com/questions/13767725/unable-to-install-gem-failed-to-build-gem-native-extension-cannot-load-such
  12. sudo gem install compass
  13. git clone https://github.com/OpenSRP-Dashboard/opensrp-site.git
  14. go to project directory
  15. npm install
  16. bower install
  
  For run
  17. grunt serve
  
  For deployment
  18grunt dist 
  

## Features
1. Login.
2. Logout.
3. Household list.
4. Household details.
5. ELCO list.
6. ELCO details.
7. Pregnant women list.
8. Pregnant women details.
9. Mapbox integrate.
10. Angular chart integrate.
11. Access controll list.



