'use strict';

/**
 * @ngdoc function
 * @name opensrpSiteApp.controller:HhCtrl
 * @description
 * # HhCtrl
 * Controller of the opensrpSiteApp
 */
angular.module('opensrpSiteApp')
  .controller('HhCtrl', function ($scope,$http,$rootScope,HHRegisterService,page,HH,Common) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     $scope.detailDataLink =
     ' <a href="#/households">'+
     '<i class="glyphicon glyphicon-list-alt"></i>'+
    ' <span>Data Details</span>'+
    '</a>';
    
    //console.log(daysInMonth(1,2015));
    $scope.data = HHRegisterService.Data();    
    var date = new Date();
    var currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);    
    var firstDay = moment(currentMonth).format('YYYY-MM-DD');
    var toDay = moment(date).format('YYYY-MM-DD');
    
    var previousSevenDaysDate = moment(date.setDate(date.getDate()-7)).format('YYYY-MM-DD');
    
    function thisMonth(getData,start,end){
      var queryResult= jsonsql.query("select * from getData where (TODAY >='"+start+"' && TODAY <='"+end+"') ",getData);                   
      $scope.thisMonth = queryResult.length;
    }
    
    function daysInMonth(month,year) {
      return new Date(year, month, 0).getDate();
    }
    
    var monthLists = [];
    monthLists[0] = new Date(date.getFullYear(), date.getMonth(), 1);
    monthLists[1] = new Date(date.getFullYear(), date.getMonth()-1, 1);
    monthLists[2] = new Date(date.getFullYear(), date.getMonth()-2, 1);
    monthLists[3] = new Date(date.getFullYear(), date.getMonth()-3, 1);
    
    Common.chartDataCal(monthLists,window.getHHata,'FWNHREGDATE');
    
    page.reportThisMonth($scope,$scope.data,$rootScope,'FWNHREGDATE','thisMonth');
    page.reportThisWeek($scope,$scope.data,$rootScope,'FWNHREGDATE','thisWeek');
    page.reportToday($scope,$scope.data,$rootScope,'FWNHREGDATE','today'); 
    //thisMonth(getData,firstDay,toDay);
   /* $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.0f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 30
                }
            }
        };
         $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [
            {
                key: "Cumulative Return",
                 xAxis: {
                    axisLabel: 'X Axis'
                },
                values: [
                    {
                        "label" : "A" ,
                        "value" : 29.765957771107
                    } ,
                    {
                        "label" : "B" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "C" ,
                        "value" : 32.807804682612
                    } ,
                    {
                        "label" : "D" ,
                        "value" : 196.45946739256
                    } ,
                    {
                        "label" : "E" ,
                        "value" : 0.19434030906893
                    } ,
                    {
                        "label" : "F" ,
                        "value" : 98.079782601442
                    } ,
                    {
                        "label" : "G" ,
                        "value" : 13.925743130903
                    } ,
                    {
                        "label" : "H" ,
                        "value" : 5.1387322875705
                    }
                ]
            },{
                key: "Cumulative Returndd",
                title:"jany",
                values: [
                    {
                        "label" : "AA" ,
                        "value" : 29.765957771107
                    } ,
                    {
                        "label" : "BN" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "Cdf" ,
                        "value" : 32.807804682612
                    } ,
                    {
                        "label" : "Dd" ,
                        "value" : 196.45946739256
                    } ,
                    {
                        "label" : "Ed" ,
                        "value" : 0.19434030906893
                    } ,
                    {
                        "label" : "Fd" ,
                        "value" : 98.079782601442
                    } ,
                    {
                        "label" : "Gd" ,
                        "value" : 13.925743130903
                    } ,
                    {
                        "label" : "Hd" ,
                        "value" : 5.1387322875705
                    }
                ]
            }
        ]
    */
    $scope.labels = ['2006', '2007', '2008', '2009'];
    $scope.series = ['1st ', '2nd ','3rd ', '4th ','5th '];
    $scope.data = [
      [65, 59, 80, 81],
      [28, 48, 40, 19],
      [65, 59, 80, 81],
      [65, 59, 80, 81],
      [65, 59, 80, 81]
    ];
  });
