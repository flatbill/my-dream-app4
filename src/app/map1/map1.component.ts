// map1 is a component of my-dream-app4
// I guess it should just show the google map and do nothning else.
// but maybe it needs to play nice with other components.
// I don't know what that means.
// I guess clicking on the map should add an airport to a list.
// who controls the list?  some parent component?
// why make all these separate components, and what brain cells 
// do I use to figure out what goes into each component?
// for now, April 2019, the clicked-aiports are to be added to a list
// inside this map1 component, called airportArrayListThingie1

import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MouseEvent } from '@agm/core';
import AirportJson from '../../assets/airportData5010Mi.json';
import { parseIntAutoRadix } from '@angular/common/src/i18n/format_number';
import { MyAgmMarker } from '../myAgmMarker';

//import * as MarkerClusterer from "@google/markerclusterer";
// npm install js-marker-clusterer @agm/js-marker-clusterer --save
//import { AgmJsMarkerClustererModule, ClusterManager } from '@agm/js-marker-clusterer'; 
@NgModule({
  //imports: [ AgmCoreModule ]
 }) 
@Component({
  selector: 'app-map1',
  templateUrl: './map1.component.html',
  styleUrls: ['./map1.component.scss']
})
export class Map1Component implements OnInit {

 // give my credentials to google for map api.
 // go to my google api key management and
 // add a website to the list-of-referrers
 // https://console.cloud.google.com/apis/credentials/key/654f5fd9-2718-4a6f-a397-a5a21623c392?project=billselzerproject1
 //
 // https://sites.google.com/site/gmapsdevelopment/ icon list
 // http://kml4earth.appspot.com/icons.html#shapes  icon list 
 // https://angular-maps.com/api-docs/agm-core/components/agmmap
 // npm i @google/markerclusterer -S

// agm has some complications on cluster ?  try this maybe...
// https://angular-maps.com/api-docs/js-marker-clusterer/directives/agmmarkercluster

 // google maps zoom level
 zoomeringo = 8;
 maxClusterZoomer = 8;  //break out of clusters at zoom 9 and higher
 // initial center position for the map
 lat: number = 43.2000
 lng: number = -85.4000
//  funkyAgmMarker1: MyAgmMarker;
 markerArray1: MyAgmMarker[] = [] ;


iconPlane  = 'https://maps.google.com/mapfiles/ms/micons/plane.png' ;
//iconPlane  = "https://maps.google.com/mapfiles/kml/pal2/icon48.png"
iconBluDot = 'https://maps.google.com/mapfiles/kml/paddle/blu-circle-lv.png' ;
//iconGrnDot = 'https://maps.google.com/mapfiles/kml/paddle/grn-circle-lv.png' ;
iconGrnDot = "https://maps.google.com/mapfiles/kml/paddle/grn-blank-lv.png"
iconYlwDot = "https://maps.google.com/mapfiles/kml/paddle/ylw-blank-lv.png" 
iconHeli   = 'https://maps.google.com/mapfiles/kml/shapes/heliport.png' ;
airportJson2 = [];
airportArrayListThingie1 = [];
markerCluster1;
// molemap start
// map;  
poly;
homeLatLng;
homeIcao;
navLogArray = [];
markersArray = [];
 airportLenFilt = 5;
 saveIcao = ' ';
 legCount=0;
 marker1;
 listenerHandle2;
 fusionFunc = 'addToRouteFT';
 contentString;
 infoWindow1;
 theCookie = 'no cookie';
 OwnershipList =    "'PR' , 'PU'" ;
 whereClause = " ";
tableId = '1KJMV2bkNkcRvjt0WKdYsj_AqAzTuvimRzCdif1g';
// end moleMap globals


 clickedMarker(label: string, index: number) {
  //alert(`clicked the marker: ${label || index}`)
}

onMapClick($event: MouseEvent) {
  // -alert ('running onMapClick')
  if (this.infoWindow1) {
    this.infoWindow1.close();
 }
}

onMarkerClick(mParmIn: MyAgmMarker) {
  alert('onMarkerClick ' + JSON.stringify(mParmIn, null, 4))
  this.airportArrayListThingie1[1] = mParmIn.locationId ;
  alert(this.airportArrayListThingie1[1]);
  // billy, push the airport into the thingie list of 'clicked markers'.
  // eventually, stick that list on an ag-grid
  // and every airport on that list should be added to a route.

  // if (this.infoWindow1) {
  //   //this.infoWindow1.close();
  // }
  // this.infoWindow1 = infoWindowParmIn;
  // -alert(this.infoWindow1)
}

// markerDragEnd(m: ImyMarker, $event: MouseEvent) {
//   console.log('dragEnd', m, $event);
// }
// markerArray1: ImyMarker[] = [] ;


  constructor() { }

  ngOnInit() {
    // this.funkyAgmMarker1 = new MyAgmMarker;
    // this.funkyAgmMarker1.title = "your string value herezzz";

    this.buildAirportList();
    //this.markerCluster1 = new MarkerClusterer(Map, this.markerArray1);
  } // end ngInit
// //
// ---------------------------------------------

buildAirportList() {
  // this.airportJson2 = AirportJson
  this.airportJson2 = AirportJson
  .filter(this.checkHeli)
  .filter(this.checkPublic)
  .filter(this.checkState)

  var icono =   {
    url: this.iconGrnDot ,
    scaledSize: {  width: 17,  height: 17  }
  }

  for (let i = 0; i < this.airportJson2.length; i++) {

    this.addOneMarker(
      this.airportJson2[i].ARPLatitude  ,
      this.airportJson2[i].ARPLongitude ,
      'something C' ,
      false ,
      icono ,
      this.airportJson2[i].LocationID ,
      this.airportJson2[i].FacilityName
      ) ;
  }

}  // end buildAirportList -------------------------------------------

checkPublic(oneAirportArrayEntryParmIn) {
  // return true if this is a public airport
  if (oneAirportArrayEntryParmIn.Use == 'PU' ) {
    return true ;
  } else {
    return false ; }
}
checkHeli(oneAirportArrayEntryParmIn) {
  // return false if Heliport.  Yes, its backwards, sorry.
  if (oneAirportArrayEntryParmIn.Type == 'HELIPORT' ) {
    return false ;
  } else {
    return true ; }
}
checkState(oneAirportArrayEntryParmIn) {
  // return true if Michigan.
  if (oneAirportArrayEntryParmIn.State == 'MI' ) {
    return true ;
  } else {
    return false ; }
}

addOneMarker(a,b,c,d,e,f,g) {
  // alert('running addOneMarker')
  let myLat = this.convertLatLonToDecimal(a) ;
  let myLon = this.convertLatLonToDecimal(b) * -1 ;  // a hack, should check west instead of -1
  let myDesc = f + ' ' + g ; // airport id + airport name
  let myDesc2 = myDesc + f ;
  var m: MyAgmMarker = {
    lat: myLat ,
    lng:  myLon,
    label: c ,
    draggable: d,
    iconUrl: e,
    locationId: myDesc,
    title: myDesc2,
    urlLink1: ' https://airnav.com/airport/' + f,
    urlLink2:  'http://vfrmap.com/?type=vfrc&lat=42.5&lon=-120.5&zoom=10'
  };
  this.markerArray1.push(m);
}
convertLatLonToDecimal(lParmin): number {
 // call this func with lat or lon from the data table.
 // lat & lon comes from the faa in a dash period format.
 // this func will convert to decimial number, friendly to google maps.
 // returns Decimal Degrees = degrees + (minutes/60) + (seconds/3600)
 // so, call this thing with lat.  then call it again with lon.
  var res1 = lParmin.split(".");
  var res2 = res1[0].split("-");
  let n = 0
  let nn = 0
  let nnn = 0
  if (res2[0]) {  n = parseInt(res2[0], 10)  }
  if (res2[1]) {  nn = parseInt(res2[1], 10)  }
  if (res2[2]) {  nnn = parseInt(res2[2], 10)  }
  let nnnn =   (n + nn / 60 + nnn / 3600)
  return nnnn
}  // end convertLatLonToDecimal

////////////////////////////////////////////////////////////////////////////////////
 LatLon(lat, lon, rad) { //snippet from moveable type, just to get compiled
}

moleInitialize() {
//  Array.prototype.sum = function() {   //provide a way to sum the values in an array.  myArray.sum() 
//                                       for (var i = 0, L = this.length, sum = 0; i < L; sum += this[i++]);
//                                       return sum;
//                                    }
// alert('initialize');
 this.moleMapSize();
this.firstHome();
 
 var myMapOptions = {
   zoom: 11,
   center: this.homeLatLng,
  // mapTypeId: google.maps.MapTypeId.TERRAIN
 };
 //this.map = new google.maps.Map(document.getElementById("map_canvas"), myMapOptions);
 //this.layer2 = new google.maps.FusionTablesLayer({suppressInfoWindows: true});
this.filterMap();
this.markHome();


var polyOptions = {
 strokeColor: '#CCCC33',
 strokeOpacity: 0.5,
 strokeWeight: 13
}
// var poly = new google.maps.Polyline(polyOptions);
// this.poly.setMap(this.map);
// var path = this.poly.getPath();
// path.push(this.homeLatLng);
   
//  google.maps.event.addListener(this.map, 'click',      addToRouteLL);
// //listenerHandle2 = google.maps.event.addListener(layer2,  'click',      doLayer2Click);
//  google.maps.event.addListener(this.poly,    'rightclick', removeFromRoute);
//  google.maps.event.addListener(this.map,    'zoom_changed', zoomChange);
}

// there are   arrays to keep in sync.
// mvcarray 'poly' is the google polyline object made up of points along the route.  each point is a latlng. each point is an entry in the array.
// navLogArray is a std javascript array. each entry the nautical mile distance of the leg.
// markers are not really an array, but more like a collection.  

 placeMarker( newPoint ) {
 alert('placeMarker');
//  var marker2 = new google.maps.Marker({
//  position: newPoint.latLng,
//  title: '#' + '999',
//  map: this.map
// }); 

//this.markersArray.push(marker2); //add this marker to the array of markers so that we can later clear them all

//marker2.setClickable(true) // not sure if this has any effect
// google.maps.event.addListener(marker2, 'click', addToRouteMK);
// google.maps.event.addListener(marker2, 'rightclick', removeMarker);
}



////////////////////////////////////////////////////////////////////////////////////
 testStuff(event){
 alert(event.latLng);  //duznt always work, depends on who called us here
var p1 = this.LatLon(51.5136, -0.0983,'');                                                      
 var p2 = this.LatLon(51.4778, -0.0015,'');                                                      
 //var dist = p1.distanceTo(p2);          // in km                                             
 //var brng = p1.bearingTo(p2);           // in degrees clockwise from north                   
 //alert(brng);

}
////////////////////////////////////////////////////////////////////////////////////
 doLayer2Click(mouseEvent){
//alert('doLayerClick');
if (this.fusionFunc == 'addToRouteFT') { this.addToRouteFT(mouseEvent); }
if (this.fusionFunc == 'newHome')      { this.newHome(mouseEvent); }   
}
////////////////////////////////////////////////////////////////////////////////////
 addToRouteLL(newPoint){  //get here when a map point is clicked (not a marker)
this.addToRoute(newPoint.latLng,'missingSomething','missingSOmething');
//addToRoute(this.latLng); //this duznt work
//addToRoute(this.position); // this duznt work
}
////////////////////////////////////////////////////////////////////////////////////
 addToRouteMK(){  //get here when a marker is clicked
//alert ('addToRouteMK');
//alert(this.position);   //needs fixing when we put more markers than just home marker is on the map.
this.addToRoute('position',this.homeIcao,'my home airport');
}
////////////////////////////////////////////////////////////////////////////////////
 addToRouteFT(mouseEvent){  //get here when a Fusion Table point is clicked (  )
//alert('addToRouteFT');
//alert (mouseEvent.row['City'].value);
let latLngTo = mouseEvent.latLng
let CityTo = mouseEvent.row['City'].value
let icaoTo = mouseEvent.row['LocationID'].value
this.addToRoute(latLngTo, icaoTo, CityTo	);
 }
////////////////////////////////////////////////////////////////////////////////////
 addToRoute(latLngIn, icaoTo, CityTo){
 let path = this.poly.getPath();
// get the latlng of the prior point  -1 cuz this array is zero-based
 var priorLatLng = path.getAt( path.getLength()-1);

// Because path is an MVCArray, we can append a new coordinate
// and it will automatically appear
path.push(latLngIn);  //this also adds 1 to  the length of path

let ddd3 = this.calcDist(priorLatLng,latLngIn);
let bbb3 = this.calcBear(priorLatLng,latLngIn);
let navLogArrayEntry = ddd3   ;
this.navLogArray.push(navLogArrayEntry);

//store this leg's info into a new grid row
this.legCount = path.getLength()-1 ;    //path length is how many points are now on the polyline. 
//                                     //There is 1 leg per point, except the first leg has two points.
// if (this.legCount > 2) {
//  // there is already a summary row, and we want to delete that old summary row before we add the new leg row
//    jQuery("#list4").jqGrid('delRowData', legCount);  // delete old summary row 
// }
var vFrom = this.saveIcao;   
 var vTo = icaoTo;
 var vDist = ddd3;
 var vBear = bbb3;
var vCity = CityTo;
var myrow =  { colfrom: vFrom, colto: vTo, coldist: vDist, colbear: vBear, colCity: vCity};
// jQuery("#list4").jqGrid('addRowData', legCount, myrow);

//  fido = jQuery("#list4").jqGrid('getCell',legCount,2 );  //distance this leg (this  row)
this.saveIcao = vTo;  //save this row's destination (to) for use later in the next row's start point (from)
if (this.legCount > 1) {
 var sumDist = 666 //Math.round( navLogArray.sum() );
 var mySumRow =  { colfrom: ' ', colto: ' ', coldist: sumDist, colbear: ' ', colCity: ' '};
//  jQuery("#list4").jqGrid('addRowData', legCount+1, mySumRow);  //summary row
}


}

////////////////////////////////////////////////////////////////////////////////////
 calcDist(latLng1, latLng2){              // transform into format that moveabletype.js likes
 var lat1 = latLng1.lat();          // lat() is a google maps function, extracts lat from latLng
 var lat2 = latLng2.lat();
var lon1 = latLng1.lng();
var lon2 = latLng2.lng();
var p1 = this.LatLon(lat1,lon1,'');  //LatLon is a moveabletype function
var p2 = this.LatLon(lat2,lon2,'');  
//var dist = p1.distanceTo(p2);      //distanceTo is a moveabletype function. uses kilometers.
//dist = Math.round(dist*10 * 0.539956)/10;  //km to nm round to 1 decimal
return 6616 //dist;

}
////////////////////////////////////////////////////////////////////////////////////
 calcBear(latLng1, latLng2){
 var lat1 = latLng1.lat();  
 var lat2 = latLng2.lat();
var lon1 = latLng1.lng();
var lon2 = latLng2.lng();
var p1 = this.LatLon(lat1,lon1,'');  // moveabletype LanLon function
var p2 = this.LatLon(lat2,lon2,'');  
//var bear = p1.bearingTo(p2);    // moveabletype bearingTo function
var bear = 360 //Math.round(bear);  //   round to whole degrees, no decimals
return bear;
}
////////////////////////////////////////////////////////////////////////////////////
 calcDistance(latLng1, latLng2){    //this is the old one, it works but does not have bearing calc ability.
    var lat1 = latLng1.lat();
 var lat2 = latLng2.lat();
 var lon1 = latLng1.lng();
 var lon2 = latLng2.lng();	
var radlat1 = Math.PI * lat1/180
var radlat2 = Math.PI * lat2/180
var radlon1 = Math.PI * lon1/180
var radlon2 = Math.PI * lon2/180
var theta = lon1-lon2
var radtheta = Math.PI * theta/180
var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
dist = Math.acos(dist)
dist = dist * 180/Math.PI
dist = dist * 60 * 1.1515
dist = Math.round(dist * 0.8684)
return dist
 
}
////////////////////////////////////////////////////////////////////////////////////
 removeMarker1(){
 //alert(this.getPosition());
//alert(this.getTitle());
 this.marker1.setMap(null);
//google.maps.event.addListener(layer2,  'click',      newHome() );

}
////////////////////////////////////////////////////////////////////////////////////
 removeMarker(){
 //alert(this.getPosition());
//alert(this.getTitle());
 //this.setMap(null);
}
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
// function removeFromRoute(){
// //alert(legCount);

// if (legCount > 1) {
//    jQuery("#list4").jqGrid('delRowData', legCount+1);  // delete previous summary row 	  
// }
// jQuery("#list4").jqGrid('delRowData', legCount);  // delete bottom-most leg row 
// path.pop();  //remove the latest entry from the polyline array
// navLogArray.pop(); //remove the latest entry from the navLogArray array
// legCount = path.getLength()-1;  //  there is 1 leg per point on the poly (except you cant count the first point)
// if (legCount > 1) {
//    var sumDist = Math.round( navLogArray.sum() );
//  var mySumRow =  { colfrom: ' ', colto: ' ', coldist: sumDist, colbear: ' ', colCity: ' '};
//  jQuery("#list4").jqGrid('addRowData', legCount+1, mySumRow);  // add summary row
// }
// //alert(jQuery("#list4").jqGrid('getCell',legCount,1 ));
// saveIcao = jQuery("#list4").jqGrid('getCell',legCount,1 );
// }
////////////////////////////////////////////////////////////////////////////////////
 showLeg(){
 alert(this.navLogArray.toString());
}
////////////////////////////////////////////////////////////////////////////////////
 showRoute(){
//alert(navLogArray);
alert(this.navLogArray.toString());
}
////////////////////////////////////////////////////////////////////////////////////
 clearRoute(){  
//this.clearRouteLegs();  
}
////////////////////////////////////////////////////////////////////////////////////
 clearHome() {
//this.path.clear();
this.removeMarker1();
//google.maps.event.removeListener(listenerHandle2);
//google.maps.event.clearListeners(layer2, 'click'); 
//google.maps.event.addListener(layer2,  'click',      newHome() );  //add listener for new home


}

////////////////////////////////////////////////////////////////////////////////////
// function clearRouteLegs() {                       //kill all polyline segments, kill all jqgrid rows
// jQuery("#list4").jqGrid('clearGridData');       //preserve home
// saveIcao = homeIcao;
// navLogArray = [];              
// path.clear();
// path.push(homeLatLng);

// }



////////////////////////////////////////////////////////////////////////////////////
 clearMarkers(){
for (let i = 0 ; i > this.markersArray.length ; i++) {
   this.markersArray[i].setMap(null);
 }
this.markersArray = [];
}
////////////////////////////////////////////////////////////////////////////////////
 userProfile() {
   alert("under construction");
   //this.value = 'RouteOn';
    
}
////////////////////////////////////////////////////////////////////////////////////
 firstHome() {  
//  this.homeLatLng = new google.maps.LatLng(43.142412,-85.254951);
this.saveIcao = '6D6';	
this.homeIcao = '6D6'
this.theCookie = this.readCookie() ;	
//alert ('first home');
//alert(theCookie);
if (this.theCookie != 'no cookie') {
  let theCookieArray = this.theCookie.split('|');
    this.homeIcao = theCookieArray[0];
  let homeLat = theCookieArray[1];
  let homeLng = theCookieArray[2];
  // this.homeLatLng = new google.maps.LatLng(homeLat,homeLng);
  this.saveIcao = this.homeIcao	   ;
 }
}
////////////////////////////////////////////////////////////////////////////////////
 newHome(mouseEvent) {  
//alert('newHome');
//clearHome();
this.homeLatLng = mouseEvent.latLng
var path = this.poly.getPath();
path.push(this.homeLatLng);
this.saveIcao = mouseEvent.row['LocationID'].value ;
this.homeIcao = mouseEvent.row['LocationID'].value ;
//saveIcao = 'home';
this.markHome();   
this.writeCookie();
this.fusionFunc = 'addToRouteFT';
}
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
 markHome() {      
//   this.marker1 = new google.maps.Marker({
//    position: this.homeLatLng, 
//    map: this.map,
//    title: this.homeIcao
//  });
//google.maps.event.addListener(marker1, 'click',      addToRouteMK);
this.contentString='<p> <a href="http://www.airnav.com/airport/KPDC">'+
 'http://airnav.com/airport/KPDC</a> </p>'
 this.contentString='click on the map to add to the route'
// var infowindow1 = new google.maps.InfoWindow({    content: this.contentString});
//  google.maps.event.addListener(this.marker1, 'click', function() {  infowindow1.open(map,marker1);  });
 }

/////////////////////////////////////////////////////////////////////////
// function drawLayer2222(){
//layer1 = new google.maps.FusionTablesLayer(396286);  //runways 1619566
 //layer1.setMap(map);
//layer2 = new google.maps.FusionTablesLayer(396286, {
//  suppressInfoWindows: true,
 //  query: "SELECT lat FROM 396286 WHERE lat > 10"}
//);
 // var whereClause = " LocationID = '24C'  "
//	  suppressInfoWindows: true,
//1KJMV2bkNkcRvjt0WKdYsj_AqAzTuvimRzCdif1g
//'1GGwfDQmtJRz0IqCX15lxL4AM7aRfW-6eXN_BVPA'
//styles: [                      
//        { where: 'OperationsCommercial' > 0, markerOptions: { iconName: "small_yellow"   } } ,
//	     { where: 'OperationsCommercial' < 0, markerOptions: { iconName: "small_blue"     } }
//      ]
// { where: "ATCT = 'Y'", markerOptions: { iconName: "large_green" } },
// { where: 'OperationsCommercial' > 0, markerOptions: { iconName: "small_yellow"   } } ,
//where: "'Ownership' >= 'PR'"} ,
//	     {where: "'LocationID' = '24C'", markerOptions: { iconName:"small_red"    }}, 
//where: "'Type' = 'AIRPORT'   "} , 

  
//	layer2 = new google.maps.FusionTablesLayer(  {
//	  suppressInfoWindows: true,
//      query: {
//	  select: 'ARPLatitudeS',
//	  from: '1KJMV2bkNkcRvjt0WKdYsj_AqAzTuvimRzCdif1g' ,
//	  where: whereClause} ,                
//	  } );


  
//	layer2.setMap(map);
//	}
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
 zoomChange(){  
this.filterMap();
}
////////////////////////////////////////////////////////////////////////////////////
 filterMap() {
  //alert("filterMap");

// this.layer2.setOptions(  {styles:[                      
//      // {                               				markerOptions:{ iconName:"small_brown"     } } ,
//   //{where: "'Ownership' = 'PR'",  				markerOptions:{ iconName:"small_yellow"}},
//   {where: "'ATCT' = 'Y'",						markerOptions:{ iconName:"small_purple"}},
//   {where: "'OperationsGALocal' <= '111000'",	markerOptions:{ iconName:"small_green"  }},		
//    {where: "'OperationsCommercial' >= '100'",	markerOptions:{ iconName:"small_blue"}},			 
//   {where: "'OperationsCommercial' >= '100111'",	markerOptions:{ iconName:"airports"}}
//    ]} );
 
this.setWhereClause();
// this.layer2.setOptions(  {query:{   
//  select: 'ARPLatitudeS',
//  from: this.tableId //,
  
//  //where: "Type = 'AIRPORT'" //works
//  //where:  'OperationsGALocal' > 1000 //works
//  //where: whereClause	  
// }});
   

// this.layer2.setMap(this.map);
 
 }
////////////////////////////////////////////////////////////////////////////////////
 setWhereClause(){  
  this.OwnershipList =    "'PR' , 'PU'" ;
 //if (map.getZoom() <= 7)   {OwnershipList="'PU'"};
//whereClause = "'Type' = 'AIRPORT' "
//	whereClause = '"'
//	whereClause = whereClause + " 'OperationsGALocal' > 1000 "
//	whereClause = whereClause + '"'
//whereClause = '"'OperationsGALocal' > 1000  "' ;
//if (map.getZoom() <= 7) {
//  whereClause = whereClause + " AND 'OperationsGALocal' > 10000 " ;
//		}
this.whereClause = " 'OperationsGALocal' > 1000  " ; 
//	  alert(whereClause);
// AND 'Ownership' IN (" + OwnershipList  + ')';  
//whereClause = whereClause + " AND 'OperationsGALocal' > '51000' " ;
//whereClause = whereClause + " AND 'OperationsGALocal' > '51000' " ;
}

////////////////////////////////////////////////////////////////////////////////////
 showInfoWin(mouseEvent){  //show airport info from fusion table row
 alert('showInfoWin');
}
////////////////////////////////////////////////////////////////////////////////////
 moleMapSize() {
  // var newMapSize = document.getElementById('map_size_button').value;
   var pageWidth = document.getElementById('page').offsetWidth;
   var mainWidth = document.getElementById('main').offsetWidth;
   var mainTop = document.getElementById('main').style.top;
   //var bodyWidth = document.body.offsetWidth;
   //alert(pageWidth);
   //alert(mainWidth);
   //alert(mainTop);
   //alert(bodyWidth);
  //  if (this.newMapSize == 'Big Map') {
  //      //alert('making map big');
  //      document.getElementById('map_canvas').style.height = '100%';
  //      document.getElementById('map_canvas').style.width = '100%';
  //      document.getElementById('map_canvas').style.top = '0px';
  //      document.getElementById('map_canvas').style.left = '0px';
  //      document.getElementById('map_size_button').innerHTML = 'Small Map';
  //  }
  //  else {
  //      //alert('making map small');
  //      document.getElementById('map_canvas').style.height = '100%';
  //      document.getElementById('map_canvas').style.width = this.mainWidth;
  //      document.getElementById('map_canvas').style.top = '140px';
  //      document.getElementById('map_canvas').style.left = '200px';
  //      //document.getElementById('map_size_button').value = 'Big Map';
  //  }
   
  
}
////////////////////////////////////////////////////////////////////////////////////
 homer(){ 
this.clearRoute();
this.clearHome();
this.fusionFunc = 'newHome';
alert(' Click on an airport to create a new home.');
}
////////////////////////////////////////////////////////////////////////////////////
 writeCookie(){ 
//if (homeIcao.length = 3) {homeIcao = homeIcao + ' '; }
document.cookie =
'moleMapCookie1=' + this.homeIcao + '|' +  this.homeLatLng.lat() + '|' + this.homeLatLng.lng()  
+ '; expires=Wed, 1 Jan 2025 20:47:11 UTC; path=/' ;

}

////////////////////////////////////////////////////////////////////////////////////
 readCookie(){ 
var nameEQ = 'moleMapCookie1' + "=";
var ca = document.cookie.split(';');
//alert (ca[0]);
for(var i=0;i < ca.length;i++) {
 var c = ca[i];
 while (c.charAt(0)==' ') c = c.substring(1,c.length);
 if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
}
return 'no cookie';

}
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
 docReadyGo() {
//alert('readyGo');
// jquery ready .   put your jquery startup stuff here. sorta like onload. maybe do this instead of body onload
// jQuery("#list4").jqGrid({
//  datatype: 'local',
//  colNames: ['From','To', 'Distance','Bearing','City'],
//  colModel :[         {name:'colfrom',sortable:false, width:70},
//                      {name:'colto',  sortable:false, width:70},
//                      {name:'coldist',sortable:false, width:80},
//          {name:'colbear',sortable:false, width:80},
//          {name:'colCity',sortable:false, width:180}						
         
//      ],
//              //pager: '#pager',
//              rowNum:10,                                
//              viewrecords: true,
//              imgpath: 'images',
//              caption: "Route ",
//      toolbar: [true,"top"],
//      hiddengrid: false,
//      hidegrid: true,
//      height:'100%' 
//      });

// jQuery("#list4").jqGrid("setGridParam", {
//  onSelectRow: function(rowid, status) {
//      alert("onSelectRow" + rowid);

//  }
// });

}



// molemap end


// ranKan() {
//   this.mister = this.mister + 1
// }

// //

} // end of export class Map1Component
// /////////////////////////////////////////////////////

// // just an interface for type safety.
// interface ImyMarker {
// 	lat: number;
// 	lng: number;
// 	label?: string;
//   draggable: boolean;
//   iconUrl: object; //bill added these
//   locationId: string;
//   title: string;
//   urlLink1: string;
//   urlLink2: string;
// }

