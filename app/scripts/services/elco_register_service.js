'use strict';

/**
 * @ngdoc service
 * @name opensrpSiteApp.elcoRegisterService
 * @description
 * # elcoRegisterService
 * Service in the opensrpSiteApp.
 */
angular.module('opensrpSiteApp')
  .service('ElcoRegisterService', function ($http,$rootScope,Base64,OPENSRP_WEB_BASE_URL) {
        var elcos = null;
        var apiURLs = OPENSRP_WEB_BASE_URL+"/registers/ec?anm-id="+$rootScope.username; 
        var elcoData = $http.get(apiURLs, { cache: true}).success(function (data) {            
        elcos = data.ecRegisterEntries;
        //console.log(elcos);
        var date = '2015-03-31';
        window.elcoData = JSON.parse(JSON.stringify(data));            
        var queryResult= jsonsql.query("select * from elcoData.ecRegisterEntries where (TODAY >='"+date+"' && TODAY <='2015-04-30' && PROVIDERID =='opensrp' ) ",elcoData);
        //console.log(queryResult);            
        //console.log(queryResult.length);
        // calculate date range
        function getDates(startDate, stopDate) {
            var dateArray = [];
            var currentDate = moment(startDate);            
            while (currentDate <= moment(stopDate)) {                
                dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
                currentDate = moment(currentDate).add(1, 'days');
            }
            return dateArray;
        }
        var days = getDates('2015-03-31','2015-04-30');
        var totalDays = parseInt(getDates('2015-03-31','2015-04-30').length);
        //console.log(totalDays);
        var totalWeeks = Math.ceil(totalDays/7);
        //console.log(totalWeeks)
        // create weeks with demanding day 
         var weeks = [];
        for(var initWeeks=0;initWeeks<totalWeeks;initWeeks++){
            weeks[initWeeks] = [];
            var startValue = parseInt(initWeeks*7);
            var endValue = parseInt(startValue+7);
            var incrementValue = 0;           
            //console.log(endValue)            
            for (var initDays = startValue; initDays <endValue; initDays++) {
                if ( days[initDays]) {
                    weeks[initWeeks][incrementValue] = days[initDays];
                    incrementValue++;
                }
            }
                
        }
        //provider list
        var providerList = ['opensrp','sohel','demotest'];
        
        //console.log(weeks);
        var reportData= [];
        for(var provider=0;provider<providerList.length;provider++){
            reportData[provider]=[];
            for(var init=0;init<weeks.length;init++){
                var startDate =weeks[init][0];
                var endDate = weeks[init][weeks[init].length-1];
                //console.log(startDate);
                //console.log(endDate);
                var queryResult= jsonsql.query("select * from elcoData.ecRegisterEntries where (TODAY >='"+startDate+"' && TODAY <='"+endDate+"' && PROVIDERID =='"+providerList[provider]+"' ) ",elcoData);
                ///console.log(queryResult.length);
                reportData[provider][init] =queryResult.length; 
            }
        }
        console.log(reportData[0]);
        console.log(reportData[1]);
        console.log(reportData[2]);
        var json = {
    "html": {
        "head": {
            "title": {
                "__prefix": "h",
                "__text": "Farmer Producer Group Registration"
            },
            "model": {
                "instance": {
                    "data": {
                        "i_start_time": "",
                        "Region": "",
                        "Block": "",
                        "Village": "",
                        "VC": "",
                        "G_Name": "",
                        "PG_SI": "",
                        "G_Leader": "",
                        "Sex_G_Leader": "",
                        "BL_date": "",
                        "SI": "",
                        "Member_Name": "",
                        "Father": "",
                        "Husband": "",
                        "Voter_ID": "",
                        "Sex": "",
                        "Mobile": "",
                        "Age": "",
                        "Category": "",
                        "Position": "",
                        "FarmerPic": "",
                        "FarmerHhGPS": "",
                        "Remarks": "",
                        "i_end_time": "",
                        "_id": "2"
                    }
                },
                "itext": {
                    "translation": {
                        "text": [
                            {
                                "value": "প্রকল্প অঞ্চল :",
                                "_id": "/data/Region:label"
                            },
                            {
                                "value": "বরিশাল",
                                "_id": "/data/Region:B"
                            },
                            {
                                "value": "ফরিদপুর",
                                "_id": "/data/Region:F"
                            },
                            {
                                "value": "যশোর",
                                "_id": "/data/Region:J"
                            },
                            {
                                "value": "খুলনা",
                                "_id": "/data/Region:K"
                            },
                            {
                                "value": "ব্লক :",
                                "_id": "/data/Block:label"
                            },
                            {
                                "value": "গ্রামঃ",
                                "_id": "/data/Village:label"
                            },
                            {
                                "value": " ভেলুচেইনের নাম :",
                                "_id": "/data/VC:label"
                            },
                            {
                                "value": "Jute",
                                "_id": "/data/VC:Ju"
                            },
                            {
                                "value": "Aquaculture",
                                "_id": "/data/VC:Aq"
                            },
                            {
                                "value": "Mung Bean",
                                "_id": "/data/VC:Mb"
                            },
                            {
                                "value": "Chili",
                                "_id": "/data/VC:Ch"
                            },
                            {
                                "value": "Dairy",
                                "_id": "/data/VC:Da"
                            },
                            {
                                "value": "Beef Fattening",
                                "_id": "/data/VC:Bf"
                            },
                            {
                                "value": "Ground Nut",
                                "_id": "/data/VC:Gn"
                            },
                            {
                                "value": "Watermelon",
                                "_id": "/data/VC:Wm"
                            },
                            {
                                "value": "Tomato",
                                "_id": "/data/VC:To"
                            },
                            {
                                "value": "দলের নাম :",
                                "_id": "/data/G_Name:label"
                            },
                            {
                                "value": "উৎপাদক দলের ক্রম:",
                                "_id": "/data/PG_SI:label"
                            },
                            {
                                "value": "দলনেতার নাম: ",
                                "_id": "/data/G_Leader:label"
                            },
                            {
                                "value": "দলনেতার লিঙ্গ: ",
                                "_id": "/data/Sex_G_Leader:label"
                            },
                            {
                                "value": "পুরুষ",
                                "_id": "/data/Sex_G_Leader:1"
                            },
                            {
                                "value": "মহিলা",
                                "_id": "/data/Sex_G_Leader:2"
                            },
                            {
                                "value": " তথ্য সংগ্রহের তারিখ : ",
                                "_id": "/data/BL_date:label"
                            },
                            {
                                "value": "দলের সদস্যের ক্রম ",
                                "_id": "/data/SI:label"
                            },
                            {
                                "value": "দলের সদস্যের নাম",
                                "_id": "/data/Member_Name:label"
                            },
                            {
                                "value": " পিতার নাম ",
                                "_id": "/data/Father:label"
                            },
                            {
                                "value": " স্বামীর নাম ",
                                "_id": "/data/Husband:label"
                            },
                            {
                                "value": " জাতীয় পরিচয়পত্র নম্বর #",
                                "_id": "/data/Voter_ID:label"
                            },
                            {
                                "value": " লিঙ্গ",
                                "_id": "/data/Sex:label"
                            },
                            {
                                "value": "পুরুষ",
                                "_id": "/data/Sex:1"
                            },
                            {
                                "value": "মহিলা",
                                "_id": "/data/Sex:2"
                            },
                            {
                                "value": " মোবাইল নম্বর",
                                "_id": "/data/Mobile:label"
                            },
                            {
                                "value": " বয়স (বছর)",
                                "_id": "/data/Age:label"
                            },
                            {
                                "value": "মোট জমির পরিমাণ অনুযায়ী কৃষকের ধরণ  ",
                                "_id": "/data/Category:label"
                            },
                            {
                                "value": "ভূমিহীন (০-৪৯ শতক) কৃষক",
                                "_id": "/data/Category:1"
                            },
                            {
                                "value": "ক্ষুদ্র (৫০-২৪৭ শতক) কৃষক",
                                "_id": "/data/Category:2"
                            },
                            {
                                "value": "বড় (২৪৭ শতকের এর অধিক) কৃষক",
                                "_id": "/data/Category:3"
                            },
                            {
                                "value": "দলীয় পদ",
                                "_id": "/data/Position:label"
                            },
                            {
                                "value": "কৃষি দলনেতা",
                                "_id": "/data/Position:1"
                            },
                            {
                                "value": "কৃষক নেতা-এক্সটেনশন",
                                "_id": "/data/Position:2"
                            },
                            {
                                "value": "কৃষক নেতা-আইসিটি",
                                "_id": "/data/Position:3"
                            },
                            {
                                "value": "কৃষক নেতা-মার্কেটিং",
                                "_id": "/data/Position:4"
                            },
                            {
                                "value": "সাধারণ সদস্য",
                                "_id": "/data/Position:5"
                            },
                            {
                                "value": "দলের সদস্যের ছবি তুলুন",
                                "_id": "/data/FarmerPic:label"
                            },
                            {
                                "value": " সদস্যের অবস্থানের জিপিএস রেকর্ড নিন",
                                "_id": "/data/FarmerHhGPS:label"
                            },
                            {
                                "value": "মন্তব্য",
                                "_id": "/data/Remarks:label"
                            }
                        ],
                        "_lang": "eng"
                    }
                },
                "bind": [
                    {
                        "_jr:preload": "timestamp",
                        "_jr:preloadParams": "start",
                        "_nodeset": "/data/i_start_time",
                        "_type": "dateTime"
                    },
                    {
                        "_nodeset": "/data/Region",
                        "_type": "select1",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/Block",
                        "_type": "string",
                        "_constraint": "(regex(., \"^(0[1-9]|[1-9][0-9])$\"))",
                        "_jr:constraintMsg": "দয়া করে  দুই  ডিজিট প্রবেশ করুন",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/Village",
                        "_type": "string",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/VC",
                        "_type": "select1",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/G_Name",
                        "_type": "string",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/PG_SI",
                        "_constraint": "(regex(., \"^(00[1-9]|0[1-9][0-9]|1[0-9][0-9]|[2-9][0-9][0-9])$\"))",
                        "_jr:constraintMsg": "দয়া করে তিন ডিজিট প্রবেশ করুন",
                        "_type": "string",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/G_Leader",
                        "_type": "string",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/Sex_G_Leader",
                        "_type": "select1",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/BL_date",
                        "_type": "date",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/SI",
                        "_constraint": "(regex(., \"^(0[1-9]|[1-9][0-9])$\"))",
                        "_jr:constraintMsg": "দয়া করে  দুই  ডিজিট প্রবেশ করুন",
                        "_type": "string",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/Member_Name",
                        "_type": "string",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/Father",
                        "_type": "string",
                        "_required": "false()"
                    },
                    {
                        "_nodeset": "/data/Husband",
                        "_relevant": "/data/Father = null",
                        "_type": "string",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/Voter_ID",
                        "_type": "string",
                        "_constraint": "(regex(., \"^(\\d{13})$\")) or (regex(., \"^(\\d{17})$\"))",
                        "_jr:constraintMsg": "দয়া করে, ১৩ অথবা ১৭ ডিজিট প্রবেশ করুন",
                        "_required": "false()"
                    },
                    {
                        "_nodeset": "/data/Sex",
                        "_type": "select1",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/Mobile",
                        "_type": "string",
                        "_constraint": "(regex(., \"^(\\d{11})$\"))",
                        "_jr:constraintMsg": "দয়া করে ১১ ডিজিট প্রবেশ করুন",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/Age",
                        "_constraint": ".> 17 and .< 101",
                        "_jr:constraintMsg": "বয়স ১৮ বছর থেকে সর্বোচ্চ ১০০ বছর হতে পারে",
                        "_type": "int",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/Category",
                        "_type": "select1",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/Position",
                        "_type": "select1",
                        "_required": "true()"
                    },
                    {
                        "_nodeset": "/data/FarmerPic",
                        "_type": "binary",
                        "_required": "false()"
                    },
                    {
                        "_nodeset": "/data/FarmerHhGPS",
                        "_type": "geopoint",
                        "_required": "false()"
                    },
                    {
                        "_nodeset": "/data/Remarks",
                        "_type": "string",
                        "_required": "false()"
                    },
                    {
                        "_jr:preload": "timestamp",
                        "_jr:preloadParams": "end",
                        "_nodeset": "/data/i_end_time",
                        "_type": "dateTime"
                    }
                ]
            },
            "_xmlns": "",
            "__prefix": "h"
        },
        "body": {
            "select1": [
                {
                    "label": {
                        "_ref": "jr:itext('/data/Region:label')"
                    },
                    "item": [
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Region:B')"
                            },
                            "value": "B"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Region:F')"
                            },
                            "value": "F"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Region:J')"
                            },
                            "value": "J"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Region:K')"
                            },
                            "value": "K"
                        }
                    ],
                    "_ref": "/data/Region"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/VC:label')"
                    },
                    "item": [
                        {
                            "label": {
                                "_ref": "jr:itext('/data/VC:Ju')"
                            },
                            "value": "Ju"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/VC:Aq')"
                            },
                            "value": "Aq"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/VC:Mb')"
                            },
                            "value": "Mb"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/VC:Ch')"
                            },
                            "value": "Ch"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/VC:Da')"
                            },
                            "value": "Da"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/VC:Bf')"
                            },
                            "value": "Bf"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/VC:Gn')"
                            },
                            "value": "Gn"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/VC:Wm')"
                            },
                            "value": "Wm"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/VC:To')"
                            },
                            "value": "To"
                        }
                    ],
                    "_ref": "/data/VC"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/Sex_G_Leader:label')"
                    },
                    "item": [
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Sex_G_Leader:1')"
                            },
                            "value": "1"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Sex_G_Leader:2')"
                            },
                            "value": "2"
                        }
                    ],
                    "_ref": "/data/Sex_G_Leader"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/Sex:label')"
                    },
                    "item": [
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Sex:1')"
                            },
                            "value": "1"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Sex:2')"
                            },
                            "value": "2"
                        }
                    ],
                    "_ref": "/data/Sex"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/Category:label')"
                    },
                    "item": [
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Category:1')"
                            },
                            "value": "1"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Category:2')"
                            },
                            "value": "2"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Category:3')"
                            },
                            "value": "3"
                        }
                    ],
                    "_ref": "/data/Category"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/Position:label')"
                    },
                    "item": [
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Position:1')"
                            },
                            "value": "1"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Position:2')"
                            },
                            "value": "2"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Position:3')"
                            },
                            "value": "3"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Position:4')"
                            },
                            "value": "4"
                        },
                        {
                            "label": {
                                "_ref": "jr:itext('/data/Position:5')"
                            },
                            "value": "5"
                        }
                    ],
                    "_ref": "/data/Position"
                }
            ],
            "input": [
                {
                    "label": {
                        "_ref": "jr:itext('/data/Block:label')"
                    },
                    "_appearance": "numbers",
                    "_ref": "/data/Block"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/Village:label')"
                    },
                    "_ref": "/data/Village"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/G_Name:label')"
                    },
                    "_ref": "/data/G_Name"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/PG_SI:label')"
                    },
                    "_appearance": "numbers",
                    "_ref": "/data/PG_SI"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/G_Leader:label')"
                    },
                    "_ref": "/data/G_Leader"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/BL_date:label')"
                    },
                    "_appearance": "month-year",
                    "_ref": "/data/BL_date"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/SI:label')"
                    },
                    "_appearance": "numbers",
                    "_ref": "/data/SI"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/Member_Name:label')"
                    },
                    "_ref": "/data/Member_Name"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/Father:label')"
                    },
                    "_ref": "/data/Father"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/Husband:label')"
                    },
                    "_ref": "/data/Husband"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/Voter_ID:label')"
                    },
                    "_appearance": "numbers",
                    "_ref": "/data/Voter_ID"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/Mobile:label')"
                    },
                    "_appearance": "numbers",
                    "_ref": "/data/Mobile"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/Age:label')"
                    },
                    "_ref": "/data/Age"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/FarmerHhGPS:label')"
                    },
                    "_ref": "/data/FarmerHhGPS"
                },
                {
                    "label": {
                        "_ref": "jr:itext('/data/Remarks:label')"
                    },
                    "_ref": "/data/Remarks"
                }
            ],
            "upload": {
                "label": {
                    "_ref": "jr:itext('/data/FarmerPic:label')"
                },
                "_ref": "/data/FarmerPic",
                "_mediatype": "image/*"
            },
            "__prefix": "h"
        },
        "_xmlns": "http://www.w3.org/2002/xforms",
        "_xmlns:h": "http://www.w3.org/1999/xhtml",
        "_xmlns:ev": "http://www.w3.org/2001/xml-events",
        "_xmlns:jr": "http://openrosa.org/javarosa",
        "_xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
        "__prefix": "h"
    }
    
}
        var bind = json.html.head.model.bind;
        var bi = JSON.stringify(bind).replace(":", "");
        var bb = JSON.parse(bi);
        console.log(bb)
        for(var k=0;k<bb.length;k++){
            console.log(bb[k]._jrpreload);
            
        }
        });    
        return {
            promise:elcoData,
            setData: function (data) {
                elcos = data;
            },
            Data: function () {        
                return elcos;
            }
        };
   
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
