$(document).ready(function(){
    
    $("#HHDATA").on("click", function (event) {
        var data = HhData;        
        if(data == '')
            return;
        
        JSONToCSVConvertor(data, "Household form ", true);
    });
});
function integerFiltering(age){
  if (age == "NaN") {
    return "";
  }else{
    return parseInt(age);
  }
  
}
function checkNullValue(value){
  if (value == "" || value == null || value == "undefined" || value == 'null' || value == 'NaN') {
    return "";
  }else{
    return value;
  }
  
}
function convertString(value){
  return String(value);
}
function newHhFormExport(JSONData, ReportTitle, ShowLabel) {
  
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var Data = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
     
    //CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        /*for (var index in Data[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }*/
        row += 'FWA WORKER ID' + ',';
        row += 'today_newhh_FW' + ',';
        row += 'start_newhh_FW' + ',';
        row += 'end_newhh_FW' + ',';
        row += 'FWNHREGDATE' + ',';
        row += 'FWGOBHHID' + ',';
        row += 'FWJIVHHID' + ',';
        row += 'FWUNION' + ',';
        row += 'FWWARD' + ',';
        row += 'FWSUBUNIT' + ','; //10
        row += 'FWMAUZA_PARA' + ',';
        row += 'FWHOHFNAME' + ',';
        row += 'FWHOHBIRTHDATE' + ',';
        row += 'FWHOHGENDER' + ',';
        row += 'FWNHHMBRNUMB' + ',';
        row += 'FWNHHMWRA' + ',';
        row += 'REGDATE' + ',';
        row += 'FWWOMFNAME' + ',';
        row += 'FWBIRTHDATE' + ',';
        row += 'FWWOMAGE' + ','; //20
        row += 'FWCWOMSTRMEN' + ',';
        row += 'FWCWOMHUSLIV' + ',';
        row += 'FWCWOMHUSALV' + ',';
        row += 'FWCWOMHUSSTR' + ',';
        row += 'FWELIGIBLE' + ',';
        row += 'FWWOMANYID' + ',';
        row += 'FWWOMNID' + ',';
        row += 'FWWOMBID' + ',';
        row += 'FWHUSNAME' + ',';
        row += 'ELCO' + ','; //30
        row += 'Latitude' + ',';
        row += 'Longitude' + ',';
        row += 'RECEIVED TIME AT SERVER' + ',';
        row += 'FD WORKER ID' + ',';       
        row += 'INSTANCE ID' + ',';
        row += 'ENTITY ID' + ','; //36
        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < Data.length; i++) {
        //2nd loop will extract each column and convert it in string comma-seprated
        if(Data[i].ELCODETAILS.length == 0 ){
            var row = "";
            row += '"' + checkNullValue(Data[i].PROVIDERID) + '",';
            row += '"' + checkNullValue(Data[i].TODAY) + '",';
            row += '"' + checkNullValue(Data[i].START) + '",';
            row += '"' + checkNullValue(Data[i].END) + '",';
            row += '"' + checkNullValue(Data[i].FWNHREGDATE) + '",';
            row += '"' + checkNullValue(Data[i].FWGOBHHID) + '",';
            row += '"' + checkNullValue(Data[i].FWJIVHHID) + '",';
            row += '"' + checkNullValue(Data[i].FWUNION) + '",';
            row += '"' + checkNullValue(Data[i].FWWARD) + '",';
            row += '"' + checkNullValue(Data[i].FWSUBUNIT) + '",';   //10
            row += '"' + checkNullValue(Data[i].FWMAUZA_PARA) + '",';
            row += '"' + checkNullValue(Data[i].FWHOHFNAME) + '",';
            row += '"' + checkNullValue(Data[i].FWHOHBIRTHDATE) + '",';
            row += '"' + checkNullValue(Data[i].FWHOHGENDER) + '",';
            row += '"' + checkNullValue(Data[i].FWNHHMBRNUM) + '",';
            row += '"' + checkNullValue(Data[i].FWNHHMWRA) + '",';
            row += ',';
            row += ',';
            row += ',';
            row += ','; //20
            row += ',';
            row += ',';
            row += ',';
            row += ',';
            row += ',';
            row += ',';
            row += ",";
            row += ",";                        
            row += ",";            
            row += '"' + Data[i].ELCO + '",'; //30
            row += ",";
            row += ",";           
            row += '"' + checkNullValue(Data[i].details.received_time) + '",';
            row += '"' + checkNullValue(Data[i].external_user_ID) + '",';
            row += '"' + checkNullValue(Data[i].INSTANCEID) + '",';
            row += '"' + checkNullValue(Data[i].CASEID) + '",'; //36
            CSV += row + '\r\n';          
        } 
        for (var index=0 ; index< Data[i].ELCODETAILS.length;index++) {         
          if (Data[i].ELCODETAILS[index].form_name =='FWNewHH') {
            var row = "";
            row += '"' + checkNullValue(Data[i].PROVIDERID) + '",';
            row += '"' + checkNullValue(Data[i].TODAY) + '",';
            row += '"' + checkNullValue(Data[i].START) + '",';
            row += '"' + checkNullValue(Data[i].END) + '",';
            row += '"' + checkNullValue(Data[i].FWNHREGDATE) + '",';
            row += '"' + checkNullValue(Data[i].FWGOBHHID) + '",';
            row += '"' + checkNullValue(Data[i].FWJIVHHID) + '",';
            row += '"' + checkNullValue(Data[i].FWUNION) + '",';
            row += '"' + checkNullValue(Data[i].FWWARD) + '",';
            row += '"' + checkNullValue(Data[i].FWSUBUNIT) + '",';
            row += '"' + checkNullValue(Data[i].FWMAUZA_PARA) + '",';
            row += '"' + checkNullValue(Data[i].FWHOHFNAME) + '",';
            row += '"' + checkNullValue(Data[i].FWHOHBIRTHDATE) + '",';
            row += '"' + checkNullValue(Data[i].FWHOHGENDER) + '",';
            row += '"' + checkNullValue(Data[i].FWNHHMBRNUM) + '",';
            row += '"' + checkNullValue(Data[i].FWNHHMWRA) + '",';
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].TODAY) + '",';
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWWOMFNAME) + '",';
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWBIRTHDATE) + '",';
            row += '"' + checkNullValue((Data[i].ELCODETAILS[index].FWWOMAGE)) + '",';
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWCWOMSTRMEN) + '",';
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWCWOMHUSLIV) + '",';
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWCWOMHUSALV) + '",';
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWCWOMHUSSTR) + '",';
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWELIGIBLE) + '",';
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWWOMANYID) + '",';
            if (convertString(Data[i].ELCODETAILS[index].FWWOMNID) ==null || convertString(Data[i].ELCODETAILS[index].FWWOMNID) =="") {
              row += ",";
            }else{
              row +=  "'"+ convertString(Data[i].ELCODETAILS[index].FWWOMNID)+"',";
            }
            if (convertString(Data[i].ELCODETAILS[index].FWWOMBID) ==null || convertString(Data[i].ELCODETAILS[index].FWWOMBID) == "") {
              row += ",";
            }else{
              row += "'" + convertString(Data[i].ELCODETAILS[index].FWWOMBID)+"',";
            }
            
            row += '"' + Data[i].ELCODETAILS[index].FWHUSNAME + '",';            
            row += '"' + Data[i].ELCO + '",';
            var gps = checkNullValue(Data[i].ELCODETAILS[index].FWWOMGPS);
            var location = gps.split(" ");           
            if (location.length > 1 ) {
              row += '"' + location[0] + '",';
              row += '"' + location[1] + '",'; 
            }else{
              row += ",";
              row += ",";
            }            
            row += '"' + checkNullValue(Data[i].details.received_time) + '",';
            row += '"' + checkNullValue(Data[i].external_user_ID) + '",';
            row += '"' + checkNullValue(Data[i].INSTANCEID) + '",';
            row += '"' + checkNullValue(Data[i].CASEID) + '",';
            CSV += row + '\r\n';
          }
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
    //window.open(link);
    document.body.removeChild(link);
}

function psrfFromExport(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var Data = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';    
    //Set Report title in first row or line
   // CSV += ReportTitle + '\r\n\n';
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";        
        row += 'start' + ',';//1
        row += 'end' + ',';//2
        row += 'today' + ',';//3
        row += 'FWGOBHHID' + ',';//4
        row += 'FWJIVHHID' + ',';//5
        row += 'FWUNION' + ',';//6
        row += 'FWWARD' + ',';//7
        row += 'FWSUBUNIT' + ',';//8
        row += 'FWMAUZA_PARA' + ',';//9
        row += 'wom_nid' + ',';//10
        row += 'wob_bid' + ',';//11
        row += 'wom_age' + ',';//12
        row += 'first_name' + ',';//13
        row += 'husname' + ',';//14
        row += 'FD Worker ID' + ',';//15
        row += 'FWA Worker ID' + ','; //16
        row += 'Form Status at Submission' + ',';//17
        row += 'SCHEDULED_DATE_PSRF_FWA' + ',';//18
        row += 'FWPSRDATE' + ',';//19
        row += 'FWPSRSTS' + ',';//20
        row += 'FWPSRLMP' + ',';//21
        row += 'FWPSRPREGSTS' + ',';//22
        row += 'FWPSRPREGWTD' + ',';//23
        row += 'FWPSRHUSPREGWTD' + ',';//24
        row += 'FWPSREVRPREG' + ',';//25
        row += 'FWPSRTOTBIRTH' + ',';//26
        row += 'FWPSRNBDTH' + ',';//27
        row += 'FWPSRPRSB' + ',';//28
        row += 'FWPSRPRMC' + ',';//29
        row += 'FWPSRPREGTWYRS' + ',';//30        
        row += 'FWPSRPRVPREGCOMP' + ',';//31
        row += 'FWPSRPRCHECKS' + ',';//32
        row += 'FWPSRANM' + ',';//33
        row += 'FWPSRHBP' + ',';//34
        row += 'FWPSRDBT' + ',';//35
        row += 'FWPSRTHY' + ',';//36
        row += 'FWPSRVDGMEM' + ',';//37
        row += 'FWPSRWOMEDU' + ',';//38
        row += 'FWPSRHHLAT' + ',';//39
        row += 'FWPSRHHRICE' + ',';//40
        row += 'FWPSRPHONE' + ',';//41
        row += 'FWPSRPHONENUM' + ',';//42
        row += 'FWPSRMUAC' + ',';//43
        row += 'FWVG' + ',';//44
        row += 'FWHRP' + ','; //45       
        row += 'FWHR_PSR' + ',';//46
        row += 'FWFLAGVALUE' + ',';//47
        row += 'FWSORTVALUE' + ',';//48
        row += 'RECEIVED_TIME_AT_SERVER' + ','; //49       
        row += 'INSTANCE ID' + ','; //50
        row += 'ENTITY ID' + ','; //51
        row = row.slice(0, -1);        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    //1st loop is to extract each row
    for (var i = 0; i < Data.length; i++) {      
       
        //2nd loop will extract each column and convert it in string comma-seprated
      if(Data[i].PSRFDETAILS.length !=0){        
        for (var index=0 ; index< Data[i].PSRFDETAILS.length;index++) {
            var row = "";
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].start) + '",';//1
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].end) + '",';//2
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].today) +'",';//3
            row += '"' + checkNullValue(Data[i].GOBHHID) + '",';//4
            row += '"' + checkNullValue(Data[i].JiVitAHHID) + '",';//5
            row += '"' + checkNullValue(Data[i].FWWOMUNION) + '",';//6
            row += '"' + checkNullValue(Data[i].FWWOMWARD) + '",';//7
            row += '"' + checkNullValue(Data[i].FWWOMSUBUNIT) + '",';//8
            row += '"' + checkNullValue(Data[i].FWWOMMAUZA_PARA) + '",';//9
            if (convertString(Data[i].FWWOMRETYPENID) =='null' || convertString(Data[i].FWWOMRETYPENID) =="") {
              row += ",";
            }else{
              row +=  "'"+ convertString(Data[i].FWWOMRETYPENID)+"',";
            }
            if (convertString(Data[i].FWWOMRETYPEBID) =='null' || convertString(Data[i].FWWOMRETYPEBID) == "") {
              row += ",";
            }else{
              row += "'" + convertString(Data[i].FWWOMRETYPEBID)+"',";
            }
            
            //row += '"' + Data[i].FWWOMRETYPENID + '",';//10
            //row += '"' + Data[i].FWWOMRETYPEBID + '",';//11
            row += '"' + checkNullValue(Data[i].FWWOMAGE) + '",';//12
            row += '"' + checkNullValue(Data[i].FWWOMFNAME) + '",';//13
            row += '"' + checkNullValue(Data[i].FWHUSNAME) + '",';//14            
            row += '"' + checkNullValue(Data[i].details.external_user_ID) + '",';//15
            row += '"' + checkNullValue(Data[i].PROVIDERID) + '",';//16
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].current_formStatus)  + '",';//17
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].start)  + '",';//18
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRDATE) + '",'; //19FWPSRSTS
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRSTS) + '",';//20
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRLMP) + '",';//21
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRPREGSTS) + '",';//22
            row += '"' + checkNullValue(Data[i].details.FWPSRPREGWTD)  + '",';//23
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRHUSPREGWTD) + '",';//24
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSREVRPREG) + '",';//25
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRTOTBIRTH) + '",';//26
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRNBDTH)+ '",';//27
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRPRSB) + '",';//28
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRPRMC) + '",';//29
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRPREGTWYRS) + '",';//30
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRPRVPREGCOMP) + '",';//31
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRPRCHECKS) + '",';//32
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRANM) + '",';//33
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRHBP) + '",';//34
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRDBT) + '",';//35
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRTHY) + '",';//36
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRVDGMEM) + '",';//37
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRWOMEDU) + '",';//38
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRHHLAT) + '",';//39
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRHHRICE) + '",';//40
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRPHONE) + '",';//41
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRPHONENUM) + '",';//42
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWPSRMUAC) + '",';//43
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWVG) + '",';//44
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWHRP) + '",';//45
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWHR_PSR) + '",';//46
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWFLAGVALUE) + '",';//47
            row += '"' + checkNullValue(Data[i].PSRFDETAILS[index].FWSORTVALUE) + '",';//48           
            row += '"' + checkNullValue(Data[i].details.received_time) + '",';//49
            row += '"' + checkNullValue(Data[i].INSTANCEID) + '",';//50 
            row += '"' + checkNullValue(Data[i].CASEID) + '",';//51
            //row.slice(0, row.length - 1);        
            //add a line break after each row
            CSV += row + '\r\n';
        //row += '"' + checkNullValue(Data[i].details}) + '",';//48 
        }
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
    //window.open(link);
    document.body.removeChild(link);
}


function censusFornExport(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var Data = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;    
    var CSV = '';    
    //Set Report title in first row or line     
    //CSV += ReportTitle + '\r\n\n';
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";        
        //This loop will extract the label from 1st index of on array
        /*for (var index in Data[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }*/
        row += 'Form Status at Submission' + ','; //1
        row += 'SCHEDULED_DATE_Census_FW' + ','; //2
        row += 'today_census_FW' + ','; //3
        row += 'start_census_FW' + ','; //4
        row += 'end_census_FW' + ','; //5
        row += 'FWCENDATE' + ','; //6
        row += 'FWCENSTAT' + ','; //7
        row += 'FWGOBHHID' + ','; //8
        row += 'FWJIVHHID' + ','; //9
        row += 'FWUNION' + ','; //10
        row += 'FWWARD' + ','; //11
        row += 'FWSUBUNIT' + ','; //12
        row += 'FWMAUZA_PARA' + ','; //13
        row += 'ELCO' + ','; //14
        row += 'existing_ELCO' + ','; //15
        row += 'new_ELCO' + ','; //16
        row += 'CENDATE' + ','; //17
        row += 'FWWOMFNAME' + ','; //18
        row += 'FWBIRTHDATE' + ','; //19
        row += 'FWWOMAGE' + ','; //20
        row += 'FWCWOMSTRMEN' + ','; //21
        row += 'FWCWOMHUSLIV' + ','; //22
        row += 'FWCWOMHUSALV' + ','; //23
        row += 'FWCWOMHUSSTR' + ','; //24
        row += 'FWELIGIBLE' + ','; //25
        row += 'FWWOMANYID' + ','; //26
        row += 'FWWOMNID' + ','; //27
        row += 'FWWOMBID' + ','; //28
        row += 'FWHUSNAME' + ','; //29       
        row += 'RECEIVED TIME AT SERVER' + ','; //30
        row += 'FD WORKER ID' + ','; //31
        row += 'FWA WORKER ID' + ','; //32    
        row += 'INSTANCE ID' + ','; //33
        row += 'ENTITY ID' + ','; //34
        row = row.slice(0, -1);        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < Data.length; i++) {      
        var comming = '';
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index=0 ; index< Data[i].ELCODETAILS.length;index++) {
          if (Data[i].ELCODETAILS[index].form_name =='Census') {
            var row = "";
            row += '"' + checkNullValue(Data[i].current_formStatus) + '",'; //1   
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].start) + '",'; //2
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].TODAY) + '",'; //3
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].start) + '",'; //4
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].end) + '",';//5
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWCENDATE) + '",';//6
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWCENSTAT) + '",';//7
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].GOBHHID) + '",'; //8
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].JiVitAHHID) + '",'; //9
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWWOMUNION) + '",'; //10
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWWOMWARD) + '",'; //11
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWWOMSUBUNIT) + '",'; //12
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWWOMMAUZA_PARA) + '",'; //13
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].ELCO) + '",'; //14
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].existing_ELCO) + '",'; //15
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].new_ELCO) + '",'; //16
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWCENDATE) + '",'; // 17
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWWOMFNAME) + '",'; //18
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWBIRTHDATE) + '",'; //19
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWWOMAGE) + '",'; //20
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWCWOMSTRMEN) + '",'; //21
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWCWOMHUSLIV) + '",'; //22
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWCWOMHUSALV) + '",'; //23
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWCWOMHUSSTR) + '",'; //24            
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWELIGIBLE) + '",'; //25
           
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWWOMANYID) + '",'; //26
            
            if (convertString(Data[i].ELCODETAILS[index].FWWOMRETYPENID) =='null' || convertString(Data[i].ELCODETAILS[index].FWWOMRETYPENID) =="") {
              row += ",";
            }else{
              row +=  "'"+ convertString(Data[i].ELCODETAILS[index].FWWOMRETYPENID)+"',";
            }
            if (convertString(Data[i].ELCODETAILS[index].FWWOMRETYPEBID) =='null' || convertString(Data[i].ELCODETAILS[index].FWWOMRETYPEBID) == "") {
              row += ",";
            }else{
              row += "'" + convertString(Data[i].ELCODETAILS[index].FWWOMRETYPEBID)+"',";
            }
            
            row += '"' + checkNullValue(Data[i].ELCODETAILS[index].FWHUSNAME) + '",'; //29 
            row += '"' + checkNullValue(Data[i].details.received_time) + '",'; //30
            row += '"' + checkNullValue(Data[i].external_user_ID) + '",'; //31
            row += '"' + checkNullValue(Data[i].PROVIDERID) + '",'; //32
            row += '"' + checkNullValue(Data[i].INSTANCEID) + '",'; //33
            row += '"' + checkNullValue(Data[i].CASEID) + '",'; //34
            CSV += row + '\r\n';
          } 
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
    //window.open(link);
    document.body.removeChild(link);
}

function misCensusFormExport(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var Data = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';    
    //Set Report title in first row or line
   // CSV += ReportTitle + '\r\n\n';
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = ""; 
        row += 'FWA Worker ID' + ',';//1     
        row += 'existing_location' + ',';//2
        row += 'today' + ',';//3 
        row += 'FWGOBHHID' + ',';//4
        row += 'FWJIVHHID' + ',';//5
        row += 'FWUNION' + ',';//6
        row += 'FWWARD' + ',';//7
        row += 'FWSUBUNIT' + ',';//8
        row += 'FWMAUZA_PARA' + ',';//9
        row += 'FWWOMNID' + ',';//10
        row += 'FWWOMBID' + ',';//11
        row += 'wom_age' + ',';//12
        row += 'first_name' + ',';//13
        row += 'husname' + ',';//14
        row += 'FD Worker ID' + ',';//15
        row += 'FWA Worker ID' + ','; //16
        row += 'Form Status at Submission' + ',';//17
        row += 'SCHEDULED_DATE' + ',';//18
        row += 'start' + ',';//19 
        row += 'end' + ',';//20
        row += 'FWMISCENSUSDATE' + ',';//21
        row += 'FWCOUPLENUM' + ',';//22
        row += 'FWTETSTAT' + ',';//23
        row += 'FWMARRYDATE' + ',';//24
        row += 'num_children_alive_grp' + ',';//25
        row += 'FWCHILDALIVEB' + ',';//26
        row += 'FWCHILDALIVEG' + ',';//27
        row += 'RECEIVED_TIME_AT_SERVER' + ','; //28       
        row += 'INSTANCE ID' + ','; //29
        row += 'ENTITY ID' + ','; //30
        row = row.slice(0, -1);        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    //1st loop is to extract each row
    for (var i = 0; i < Data.length; i++) {            
        //2nd loop will extract each column and convert it in string comma-seprated
      if(Data[i].details.length != 0)
        if(Data[i].details.MisToday != null && Data[i].details.MisToday != ""){        
            var row = "";
            row += '"' + checkNullValue(Data[i].PROVIDERID) + '",';//1
            row += '"' + checkNullValue(Data[i].FWWOMMAUZA_PARA) + '",';//2
            row += '"' + checkNullValue(Data[i].details.MisToday) +'",';//3
            row += '"' + checkNullValue(Data[i].GOBHHID) + '",';//4
            row += '"' + checkNullValue(Data[i].JiVitAHHID) + '",';//5
            row += '"' + checkNullValue(Data[i].FWWOMUNION) + '",';//6
            row += '"' + checkNullValue(Data[i].FWWOMWARD) + '",';//7
            row += '"' + checkNullValue(Data[i].FWWOMSUBUNIT) + '",';//8
            row += '"' + checkNullValue(Data[i].FWWOMMAUZA_PARA) + '",';//9
            if (convertString(Data[i].FWWOMRETYPENID) =='null' || convertString(Data[i].FWWOMRETYPENID) =="") {
            row += ",";
            }else{
            row +=  "'"+ convertString(Data[i].FWWOMRETYPENID)+"',";
            }
            if (convertString(Data[i].FWWOMRETYPEBID) =='null' || convertString(Data[i].FWWOMRETYPEBID) == "") {
            row += ",";
            }else{
            row += "'" + convertString(Data[i].FWWOMRETYPEBID)+"',";
            }

            //row += '"' + Data[i].FWWOMRETYPENID + '",';//10
            //row += '"' + Data[i].FWWOMRETYPEBID + '",';//11
            row += '"' + checkNullValue(Data[i].FWWOMAGE) + '",';//12
            row += '"' + checkNullValue(Data[i].FWWOMFNAME) + '",';//13
            row += '"' + checkNullValue(Data[i].FWHUSNAME) + '",';//14            
            row += '"' + checkNullValue(Data[i].details.external_user_ID) + '",';//15
            row += '"' + checkNullValue(Data[i].PROVIDERID) + '",';//16
            row += '"' + checkNullValue(Data[i].details.mis_census_current_formStatus) + '",';//17
            row += '"' + checkNullValue(Data[i].details.MisStart) + '",';//18
            row += '"' + checkNullValue(Data[i].details.MisStart) + '",';//19
            row += '"' + checkNullValue(Data[i].details.MisEnd) + '",';//20
            row += '"' + checkNullValue(Data[i].details.FWMISCENSUSDATE) + '",';//21
            row += '"' + checkNullValue(Data[i].details.FWCOUPLENUM) + '",';//22
            row += '"' + checkNullValue(Data[i].details.FWTETSTAT) + '",';//23
            row += '"' + checkNullValue(Data[i].details.FWMARRYDATE) + '",';//24
            row += ",";//25
            row += '"' + checkNullValue(Data[i].details.FWCHILDALIVEB) + '",';//26
            row += '"' + checkNullValue(Data[i].details.FWCHILDALIVEG) + '",';//27
            row += '"' + checkNullValue(Data[i].details.received_time) + '",';//28
            row += '"' + checkNullValue(Data[i].INSTANCEID) + '",';//29
            row += '"' + checkNullValue(Data[i].CASEID) + '",';//30
            //row.slice(0, row.length - 1);        
            //add a line break after each row
            CSV += row + '\r\n';
        //row += '"' + checkNullValue(Data[i].details}) + '",';//48 
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
    //window.open(link);
    document.body.removeChild(link);
}

function misElcoFormExport(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var Data = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';    
    //Set Report title in first row or line
    // CSV += ReportTitle + '\r\n\n';
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = ""; 
        row += 'FWA Worker ID' + ',';//1     
        row += 'Form Status at Submission' + ',';//2
        row += 'SCHEDULED_DATE' + ',';//3 
        row += 'FWGOBHHID' + ',';//4
        row += 'FWJIVHHID' + ',';//5
        row += 'FWUNION' + ',';//6
        row += 'FWWARD' + ',';//7
        row += 'FWSUBUNIT' + ',';//8
        row += 'FWMAUZA_PARA' + ',';//9
        row += 'FWWOMNID' + ',';//10
        row += 'FWWOMBID' + ',';//11
        row += 'wom_age' + ',';//12
        row += 'first_name' + ',';//13
        row += 'husname' + ',';//14
        row += 'FD Worker ID' + ',';//15
        row += 'FWA Worker ID' + ','; //16
        row += 'today' + ',';//17
        row += 'start' + ',';//18
        row += 'end' + ',';//19
        row += 'FWMISELCODATE' + ',';//20
        row += 'FWPMISBIRTHCTRL' + ',';//21
        row += 'FWMISBCSOURCE' + ',';//22
        row += 'RECEIVED_TIME_AT_SERVER' + ','; //23       
        row += 'INSTANCE ID' + ','; //24
        row += 'ENTITY ID' + ','; //25
        row = row.slice(0, -1);        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    //console.log(Data);

    //1st loop is to extract each row
    for (var i = 0; i < Data.length; i++) {      
        //2nd loop will extract each column and convert it in string comma-seprated
      if(Data[i].MISDETAILS != null){
      if(Data[i].MISDETAILS.length !=0){      
        for (var index=0 ; index< Data[i].MISDETAILS.length;index++) {
            var row = "";
            row += '"' + checkNullValue(Data[i].PROVIDERID) + '",';//1
            if (Data[i].MISDETAILS[index].mis_elco_current_formStatus == null || Data[i].MISDETAILS[index].mis_elco_current_formStatus =="") {
              row += ",";
            }else{
              row += '"' + convertString(Data[i].MISDETAILS[index].mis_elco_current_formStatus)+ '",';
            } 
            row += '"' + checkNullValue((Data[i].MISDETAILS[index].start).substring(0,10)) +'",';//3
            row += '"' + checkNullValue(Data[i].GOBHHID) + '",';//4
            row += '"' + checkNullValue(Data[i].JiVitAHHID) + '",';//5
            row += '"' + checkNullValue(Data[i].FWWOMUNION) + '",';//6
            row += '"' + checkNullValue(Data[i].FWWOMWARD) + '",';//7
            row += '"' + checkNullValue(Data[i].FWWOMSUBUNIT) + '",';//8
            row += '"' + checkNullValue(Data[i].FWWOMMAUZA_PARA) + '",';//9
            if (convertString(Data[i].FWWOMRETYPENID) =='null' || convertString(Data[i].FWWOMRETYPENID) =="") {
            row += ",";
            }else{
            row +=  "'"+ convertString(Data[i].FWWOMRETYPENID)+"',";
            }
            if (convertString(Data[i].FWWOMRETYPEBID) =='null' || convertString(Data[i].FWWOMRETYPEBID) == "") {
            row += ",";
            }else{
            row += "'" + convertString(Data[i].FWWOMRETYPEBID)+"',";
            }

            //row += '"' + Data[i].FWWOMRETYPENID + '",';//10
            //row += '"' + Data[i].FWWOMRETYPEBID + '",';//11
            row += '"' + checkNullValue(Data[i].FWWOMAGE) + '",';//12
            row += '"' + checkNullValue(Data[i].FWWOMFNAME) + '",';//13
            row += '"' + checkNullValue(Data[i].FWHUSNAME) + '",';//14            
            row += '"' + checkNullValue(Data[i].details.external_user_ID) + '",';//15
            row += '"' + checkNullValue(Data[i].PROVIDERID) + '",';//16
            row += '"' + checkNullValue(Data[i].MISDETAILS[index].today) + '",';//17
            row += '"' + checkNullValue(Data[i].MISDETAILS[index].start) + '",';//18
            row += '"' + checkNullValue(Data[i].MISDETAILS[index].end) + '",';//19
            row += '"' + checkNullValue(Data[i].MISDETAILS[index].FWMISELCODATE) + '",';//20
            row += '"' + checkNullValue(Data[i].MISDETAILS[index].FWPMISBIRTHCTRL) + '",';//21
            if (Data[i].MISDETAILS[index].FWMISBCSOURCE == null || Data[i].MISDETAILS[index].FWMISBCSOURCE =="") {
              row += ",";
            }else{
              row += '"' + convertString(Data[i].MISDETAILS[index].FWMISBCSOURCE)+ '",';
            }  
            row += '"' + checkNullValue(Data[i].details.received_time) + '",';//23
            row += '"' + checkNullValue(Data[i].INSTANCEID) + '",';//24
            row += '"' + checkNullValue(Data[i].CASEID) + '",';//25

            //row.slice(0, row.length - 1);        
            //add a line break after each row
            CSV += row + '\r\n';
        //row += '"' + checkNullValue(Data[i].details}) + '",';//48 
        }
        }
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
    //window.open(link);
    document.body.removeChild(link);
}