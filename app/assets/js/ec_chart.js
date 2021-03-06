jQuery(document).ready(function($) {    
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var date = new Date()
    var monthLists = [];
    monthLists[0] = new Date(date.getFullYear(), date.getMonth(), 1);
    monthLists[1] = new Date(date.getFullYear(), date.getMonth()-1, 1);
    monthLists[2] = new Date(date.getFullYear(), date.getMonth()-2, 1);
    monthLists[3] = new Date(date.getFullYear(), date.getMonth()-3, 1);
   
    function waitForElement(){
     if(typeof window.columnChartData !== "undefined"){
      window.chartData = window.columnChartData;
        $('#ecChart').highcharts({         
            chart: {
                type: 'column'
            },
            title: {
                text: 'Weekly Elco Register Form Submission'
            },
            
            xAxis: {
                categories: [
                     monthNames[monthLists[0].getMonth()],
                     monthNames[monthLists[1].getMonth()],
                     monthNames[monthLists[2].getMonth()],
                     monthNames[monthLists[3].getMonth()],
                    
                    
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Quantity'
                }
            },
            credits: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
                enabled: false
            },
            plotOptions: {
                
            column: 
            { 
              dataLabels: 
              { 
                enabled: true, 
                formatter: function() { return this.y  }
              } 
            }, 
            series: 
            {
              groupPadding: 0.125
            } 
            },
            series: [{
                name: '1st Week',
                data: [chartData[0].init, chartData[5].init, chartData[10].init, chartData[15].init]
    
            }, {
                name: '2nd Week',
                data: [chartData[1].init, chartData[6].init, chartData[11].init, chartData[16].init]
    
            }, {
                name: '3rd Week',
                data: [chartData[2].init, chartData[7].init, chartData[12].init, chartData[17].init]
    
            },
        {
                name: '4th Week',
                data: [chartData[3].init, chartData[8].init, chartData[13].init, chartData[18].init]
    
            },
        {
                name: '5th Week',
                data: [chartData[4].init, chartData[9].init,chartData[14].init, chartData[19].init]
    
            }]
        });
      }else{
         setTimeout(function(){
                 waitForElement();
         },250);
     }
    }
    waitForElement();

});