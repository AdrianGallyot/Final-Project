// Append the Drop down list with all the otu_ids on page load
function init() {
  d3.csv("Data/Countries.csv").then((data) => {
  let dropdown = document.getElementById('selDataset');
  dropdown.length = 0;

  let defaultOption = document.createElement('option');
  defaultOption.text = 'Select';

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;
  let option;
    for (let i = 0; i < data.length; i++) {
      option = document.createElement('option');
      option.text = data[i].country_name;
      option.value = data[i].CountryID;
      dropdown.add(option);
    }
  });
}

function optionChanged(country){

  buildplots(country)
  // BuildBubblePlot()

  d3.csv("Data/Population.csv").then((data) => {
  
  console.log(data);

  // var resultsArray = countries.filter(CountryCity => CountryCity.CountryID == country);

  var filteredData = data.filter(function(d) 
{ 

        if( d["CountryID"] == country)
        { 
            return d;
        }
    })

  console.log(filteredData);

  var PopYears = filteredData.map(function(c){
    return{
      Year: c.Year,
      Population: c.Population
    }
  });

   var Years = [];
   var PopFigures = []

  for (var i = 0; i < filteredData.length ; i++){
      Years.push(PopYears[i].Year);
      console.log(PopYears[i].Year);
     }

  console.log(Years);

  for (var i = 0; i < filteredData.length ; i++){
    PopFigures.push(PopYears[i].Population);
    console.log(PopYears[i].Population);
   }

console.log(PopFigures);

  d3.csv("Data/Countries.csv").then((C) => {

    console.log(C);
  
    // var resultsArray = countries.filter(CountryCity => CountryCity.CountryID == country);
  
    var filteredCountry = C.filter(function(d) 
  { 
  
          if( d["CountryID"] == country)
          { 
              return d;
          } 
  
      });
      console.log(filteredCountry);
  
      var KeyData = filteredCountry.map(function(k){
        return{
          incomeID: k.Income_id,
          RegionID: k.region_id,
          CountryName: k.country_name
        }
      });

      // var Cpopulation = [];

      // for (var i = 0; i < filteredCountry.length ; i++){
      //     Cpopulation.push(KeyData[i].population);
      //     console.log(KeyData[i].population);
      //    }
    
      // console.log(Cpopulation);

      // var CGDP = [];

      // for (var i = 0; i < filteredCountry.length ; i++){
      //     CGDP.push(KeyData[i].gdp);
      //     console.log(KeyData[i].gdp);
      //    }
    
      // console.log(CGDP);

      var RegID = [];

      for (var i = 0; i < filteredCountry.length ; i++){
          RegID.push(KeyData[i].RegionID);
          console.log(KeyData[i].RegionID);
         }
    
      console.log(RegID);

      var IncID = [];

      for (var i = 0; i < filteredCountry.length ; i++){
          IncID.push(KeyData[i].incomeID);
          console.log(KeyData[i].incomeID);
         }
    
      console.log(IncID);

      var c_name = [];

      for (var i = 0; i < filteredCountry.length ; i++){
          c_name.push(KeyData[i].CountryName);
          console.log(KeyData[i].CountryName);
         }
    
      console.log(c_name);

      buildBody(RegID,IncID,c_name);
  });
});
}

function buildBody(RegID,IncID,c_name) {
  var Panel = d3.select("#sample-metadata");
  Panel.html(""); // too Clear Previous metadata
  Panel.append("div").text(`Country Name: ${c_name}`);
  Panel.append("br")

  // Regional Breakdown

  d3.csv("../Data/Region.csv").then((R) => {
    console.log(R);
    var filterRegion = R.filter(function(d) 
      {
          if( d["region_id"] == RegID)
          { 
              return d;
          } 
      });
      console.log(filterRegion);

      var Region_Name = filterRegion.map(function(k){
        return{
          regionName: k.Region
        }
      });
      var RegName = [];

      for (var i = 0; i < Region_Name.length ; i++){
          RegName.push(Region_Name[i].regionName);
          console.log(Region_Name[i].regionName);
         }
    
      console.log(RegName);
      // console.log(Region_Name);
      Panel.append("div").text(`Region: ${RegName}`);
      Panel.append("br")
  });


  // Income Grouping

  d3.csv("Data/IncomeGroup.csv").then((I) => {
    console.log(I);
  
    // var resultsArray = countries.filter(CountryCity => CountryCity.CountryID == country);
  
    var filterIncome = I.filter(function(d) 
  { 
          if( d["IncomeID"] == IncID)
          { 
              return d;
          } 
      });

      console.log(filterIncome);
  
      var Income_Group = filterIncome.map(function(k){
        return{
          IncomeClass: k.Income_Class
        }
      });

      var IncName = [];

      for (var i = 0; i < Income_Group.length ; i++){
          IncName.push(Income_Group[i].IncomeClass);
          console.log(Income_Group[i].IncomeClass);
         }
    
      console.log(IncName);
      Panel.append("div").text(`Income Grouping: ${IncName}`);
      // console.log(Income_Group);
  });
}  // End of build Panel Data Function



function buildplots(country){

// Generate Key Cities Waste Collection Graph
  d3.csv("Data/Population.csv").then((R) => {
    console.log(R);
    var PopFiguresPlot = R.filter(function(d) 
      {
          if( d["CountryID"] == country)
          { 
              return d;
          } 
      });
      console.log(PopFiguresPlot);

      var PopData = PopFiguresPlot.map(function(k){
        return{
          y: parseInt((k.Population/1000000)),
          label: k.Year,
        }
      });
      console.log(PopData);

      var datap = [];

    
      for (var i = 0; i < PopData.length; i++){
          datap.push(PopData[i]);
          console.log(PopData[i]);
         }

         console.log(datap);
    
      var chart = new CanvasJS.Chart("chartContainerPopulationHistory", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title:{
          text: "Historical Population Growth",
          fontSize: 20
        },
        axisY: {
          title: "Population (Millions)",
          fontSize: 10
        },
        axisX: {
          title: "Years",
          fontSize: 10
        },
        data: [{        
          type: "line",  
          showInLegend: false,
          dataPoints: datap
        }]
      });
      chart.render();
  });

  d3.csv("Data/Population_Forecast.csv").then((R) => {
    console.log(R);
    var PopFiguresPlot = R.filter(function(d) 
      {
          if( d["CountryID"] == country)
          { 
              return d;
          } 
      });
      console.log(PopFiguresPlot);

      var PopData = PopFiguresPlot.map(function(k){
        return{
          y: parseInt((k.Population/1000000)),
          label: k.Year,
        }
      });
      console.log(PopData);

      var datap = [];

    
      for (var i = 0; i < PopData.length; i++){
          datap.push(PopData[i]);
          console.log(PopData[i]);
         }

         console.log(datap);
    
      var chart = new CanvasJS.Chart("chartContainerPopulationPredict", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title:{
          text: "Forecasted Population Growth",
          fontSize: 20
        },
        axisY: {
          title: "Population (Millions)",
          fontSize: 10
        },
        axisX: {
          title: "Years",
          fontSize: 10
        },
        data: [{        
          type: "line",  
          showInLegend: false,
          dataPoints: datap
        }]
      });
      chart.render();
  });

// Generate Key Cities Waste Collection Graph
d3.csv("Data/GDP.csv").then((R) => {
  console.log(R);
  var PopFiguresGDP = R.filter(function(d) 
    {
        if( d["CountryID"] == country)
        { 
            return d;
        } 
    });
    console.log(PopFiguresGDP);

    var GDPData = PopFiguresGDP.map(function(k){
      return{
        y: parseInt(k.GDP_Per_Capita),
        label: k.Year,
      }
    });
    console.log(GDPData);

    var dataGDP = [];

  
    for (var i = 0; i < GDPData.length; i++){
        dataGDP.push(GDPData[i]);
        console.log(GDPData[i]);
       }

       console.log(dataGDP);
  
    var chart = new CanvasJS.Chart("chartContainerGDPHistory", {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title:{
        text: "Historical GDP Growth",
        fontSize: 20
      },
      axisY: {
        title: "Gross Domestic Product (GDP) ($USD)",
        fontSize: 10
      },
      axisX: {
        title: "Years",
        fontSize: 10
      },
      data: [{        
        type: "line",  
        showInLegend: false,
        dataPoints: dataGDP
      }]
    });
    chart.render();
});

d3.csv("Data/GDP_Forecast.csv").then((R) => {
  console.log(R);
  var PopFiguresGDP = R.filter(function(d) 
    {
        if( d["CountryID"] == country)
        { 
            return d;
        } 
    });
    console.log(PopFiguresGDP);

    var GDPData = PopFiguresGDP.map(function(k){
      return{
        y: parseInt(k.GDP_Per_Capita),
        label: k.Year,
      }
    });
    console.log(GDPData);

    var datap = [];

  
    for (var i = 0; i < GDPData.length; i++){
        datap.push(GDPData[i]);
        console.log(GDPData[i]);
       }

       console.log(datap);
  
    var chart = new CanvasJS.Chart("chartContainerGDPPredict", {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title:{
        text: "Forecasted GDP Growth",
        fontSize: 20
      },
      axisY: {
        title: "Gross Domestic Product (GDP) ($USD)",
        fontSize: 10
      },
      axisX: {
        title: "Years",
        fontSize: 10
      },
      data: [{        
        type: "line",  
        showInLegend: false,
        dataPoints: datap
      }]
    });
    chart.render();
});


// // Generate Key Cities Waste Collection Graph
// d3.csv("CountryWasteDataset.csv").then((R) => {
//   console.log(R);
//   var CountryWaste = R.filter(function(d) 
//     {
//         if( d["CountryID"] == country)
//         { 
//             return d;
//         } 
//     });

//     console.log(CountryWaste);

//     var CWData = CountryWaste.map(function(k){
//       return{
//         y: parseInt(k.Value),
//         label: k.Attribute
//       }
//     });
//     console.log(CWData);

//     var CWdatap = [];

  
//     for (var i = 0; i < CWData.length; i++){
//         CWdatap.push(CWData[i]);
//         console.log(CWData[i]);
//        }

//       //  var output = Object.entries(CountryWaste).map(([key, value]) => ({key,value}));
       
//       //  console.log(output);

//         console.log(CWdatap);
  
//        var chartPie = new CanvasJS.Chart("chartPie", {
//         animationEnabled: true,
//         title: {
//           text: "Waste Material %",
//           fontSize: 20
//         },
//         data: [{
//           type: "pie",
//           indexLabelFontSize: 10,
//           radius: 100,
//           indexLabel: "{label} - {y}",
//           yValueFormatString: "###0.0\"%\"",
//           click: explodePie,
//           dataPoints: CWdatap
//         }]
//       });
//       chartPie.render();
// });

// // Generate Key Cities Waste Collection Graph
// d3.csv("CountryLevelSpecialWaste.csv").then((R) => {
//   console.log(R);
//   var CountrySpecialWaste = R.filter(function(d) 
//     {
//         if( d["CountryID"] == country)
//         { 
//             return d;
//         } 
//     });

//     console.log(CountrySpecialWaste);

//     var CSWData = CountrySpecialWaste.map(function(k){
//       return{
//         y: parseInt(k.Value),
//         label: k.Attribute
//       }
//     });
//     console.log(CSWData);

//     var CSWdatap = [];

  
//     for (var i = 0; i < CSWData.length; i++){
//         CSWdatap.push(CSWData[i]);
//         console.log(CSWData[i]);
//        }

//       //  var output = Object.entries(CountryWaste).map(([key, value]) => ({key,value}));
       
//       //  console.log(output);

//         console.log(CSWdatap);

// var chartBar = new CanvasJS.Chart("chartBar", {
// 	animationEnabled: true,
	
// 	title:{
// 		text:"Waste Category",
//     fontSize:20
// 	},
// 	axisX:{
// 		interval: 1
// 	},
// 	axisY2:{
// 		interlacedColor: "rgb(130, 191, 255,.3)",
// 		gridColor: "rgb(130, 191, 255,.2)",
// 		title: "Tons Per Year"
// 	},
// 	data: [{
// 		type: "bar",
// 		name: "companies",
// 		axisYType: "secondary",
// 		color: "rgb(130, 191, 255)",
// 		dataPoints: CSWdatap
// 	  }]
//   });
//   chartBar.render();
// });


} // End of BuildPlot function

// function BuildBubblePlot(){

//   // Generate Country Population to Waste Bubble Graph
// d3.csv("Countries.csv").then((R) => {
//   console.log(R);
//   var CountryDomWaste = R.filter(function(d) 
//     {
//         if( d["Population"] > 500000)
//         { 
//             return d;
//         } 
//     });

//     console.log(CountryDomWaste);

//     var CDWData = CountryDomWaste.map(function(k){
//       return{
//         y: parseInt(k.TotalDomesticWaste/k.Population),
//         label: k.country_name
//       }
//     });

//     console.log(CDWData);

//     var PopulationWaste = [];

//     for (var i = 0; i < CDWData.length; i++){
//         PopulationWaste.push(CDWData[i]);
//         console.log(CDWData[i]);
//        }

//         console.log(PopulationWaste);

// var chartBarp = new CanvasJS.Chart("chartBarp", {
// 	animationEnabled: true,
	
// 	title:{
// 		text:"World Average Domestic Waste Per Person",
//     fontSize:15
// 	},
// 	// axisX:{
// 	// 	interval: 1,
//   //   fontSize:10
// 	// },
// 	axisY2:{
// 		interlacedColor: "rgb(130, 191, 255,.3)",
// 		gridColor: "rgb(130, 191, 255,.2)",
//     fontSize: 10
// 	},
// 	data: [{
// 		type: "bar",
// 		name: "companies",
// 		axisYType: "secondary",
// 		color: "rgb(130, 191, 255)",
// 		dataPoints: PopulationWaste
// 	  }]
//   });

//   chartBarp.render();

// });


//}


// function explodePie(e) {
// 	for(var i = 0; i < e.dataSeries.dataPoints.length; i++) {
// 		if(i !== e.dataPointIndex)
// 			e.dataSeries.dataPoints[i].exploded = false;
// 	}
// }



init();
