
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var Data = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        /*for (var index in Data[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }*/
        row += 'workerID' + ',';
        row += 'today_newhh_FW' + ',';
        row += 'start_newhh_FW' + ',';
        row += 'end_newhh_FW' + ',';
        row += 'FWNHREGDATE' + ',';
        row += 'FWGOBHHID' + ',';
        row += 'FWJIVHHID' + ',';
        row += 'FWUNION' + ',';
        row += 'FWWARD' + ',';
        row += 'FWSUBUNIT' + ',';
        row += 'FWMAUZA_PARA' + ',';
        row += 'FWHOHFNAME' + ',';
        row += 'FWHOHBIRTHDATE' + ',';
        row += 'FWHOHGENDER' + ',';
        row += 'FWNHHMBRNUMB' + ',';
        row += 'FWNHHMWRA' + ',';
        row += 'REGDATE' + ',';
        row += 'FWWOMFNAME' + ',';
        row += 'FWBIRTHDATE' + ',';
        row += 'FWWOMAGE' + ',';
        row += 'FWNHWOMSTRMEN' + ',';
        row += 'FWNHWOMHUSLIV' + ',';
        row += 'FWNHWOMHUSALV' + ',';
        row += 'FWNHWOMHUSSTR' + ',';
        row += 'FWELIGIBLE' + ',';
        row += 'FWWOMANYID' + ',';
        row += 'FWWOMNID' + ',';
        row += 'FWWOMBID' + ',';
        row += 'FWHUSNAME' + ',';
        row += 'ELCO' + ',';
        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < Data.length; i++) {      
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index=0 ; index< Data[i].ELCODETAILS.length;index++) {
           var row = "";
            row += '"' + Data[i].PROVIDERID + '",';
            row += '"' + Data[i].TODAY + '",';
            row += '"' + Data[i].START + '",';
            row += '"' + Data[i].END + '",';
            row += '"' + Data[i].FWNHREGDATE + '",';
            row += '"' + Data[i].FWGOBHHID + '",';
            row += '"' + Data[i].FWJIVHHID + '",';
            row += '"' + Data[i].FWUNION + '",';
            row += '"' + Data[i].FWWARD + '",';
            row += '"' + Data[i].FWSUBUNIT + '",';
            row += '"' + Data[i].FWMAUZA_PARA + '",';
            row += '"' + Data[i].FWHOHFNAME + '",';
            row += '"' + Data[i].FWHOHBIRTHDATE + '",';
            row += '"' + Data[i].FWHOHGENDER + '",';
            row += '"' + Data[i].FWNHHMBRNUM + '",';
            row += '"' + Data[i].FWNHHMWRA + '",';
            row += '"' + Data[i].ELCODETAILS[index].TODAY + '",';
            row += '"' + Data[i].ELCODETAILS[index].FWWOMFNAME + '",';
            row += '"' + Data[i].ELCODETAILS[index].FWBIRTHDATE + '",';
            row += '"' + Data[i].ELCODETAILS[index].FWWOMAGE + '",';
            row += '"' + Data[i].ELCODETAILS[index].FWNHWOMSTRMEN + '",';
            row += '"' + Data[i].ELCODETAILS[index].FWNHWOMHUSLIV + '",';
            row += '"' + Data[i].ELCODETAILS[index].FWNHWOMHUSALV + '",';
            row += '"' + Data[i].ELCODETAILS[index].FWNHWOMHUSSTR + '",';
            row += '"' + Data[i].ELCODETAILS[index].FWELIGIBLE + '",';
            row += '"' + Data[i].ELCODETAILS[index].FWWOMANYID + '",';
            row += '"' + Data[i].ELCODETAILS[index].FWWOMNID + '",';
            row += '"' + Data[i].ELCODETAILS[index].FWWOMBID + '",';
            row += '"' + Data[i].ELCODETAILS[index].FWHUSNAME + '",';
            row += '"' + Data[i].ELCO + '",';
            
            //row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
            
        }

        
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



var myJSONObject = {"ircEvent": "PRIVMSG", "method": "newURI", "regex": "^http://.*"};
delete myJSONObject.regex;


