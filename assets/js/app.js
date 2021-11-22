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

      buildBody(RegID,c_name,country);
  });
});
}

function buildBody(RegID,c_name,country) {
  var Panel = d3.select("#sample-metadata");
  Panel.html(""); // too Clear Previous metadata
  Panel.append("div").text(`You have selected ${c_name} as your country.`);
  Panel.append("br")

  // Regional Breakdown

  d3.csv("Data/Region.csv").then((R) => {
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
      Panel.append("div").text(`It is located within the ${RegName} region`);
      Panel.append("br")


  });
  
  // Population Forecasting

  d3.csv("Data/Population_forecast.csv").then((I) => {
    console.log(I);
  
    // var resultsArray = countries.filter(CountryCity => CountryCity.CountryID == country);
  
    var filterPop = I.filter(function(d) 
  { 
          if( d["CountryID"] == country && (d["Year"] == 2021 || d["Year"] == 2030))
          { 
              return d;
          } 
      });

      console.log(filterPop);
  
      var Pop_Group = filterPop.map(function(k){
        return{
          Population: k.Population,
          Yrp: k.Year
        }
      });

      var PopCurrent = [];
      var YrpL = [];
      var PopChange = "";

      for (var i = 0; i < Pop_Group.length ; i++){
          PopCurrent.push(Pop_Group [i].Population);
          console.log(Pop_Group [i].Population);
          YrpL.push(Pop_Group [i].Yrp);
          console.log(Pop_Group [i].Yrp);
         }

         if(PopCurrent[0] > PopCurrent[1]) {
           PopChange = "decrease";
         } else if (PopCurrent[0] < PopCurrent[1]) {
           PopChange = "increase"
         } else {PopChange = "remain the same"}

      console.log(PopCurrent);
      console.log(PopChange);

      Panel.append("div").text(`It also currently has an approximate population of ${PopCurrent[0]}
      for the year ${YrpL[0]}, and it is estimated to ${PopChange} to be ${PopCurrent[1]} in the year ${YrpL[1]}.`);
      Panel.append("br")  
  });

  d3.csv("Data/GDP_Forecast.csv").then((I) => {
    console.log(I);
  
    // var resultsArray = countries.filter(CountryCity => CountryCity.CountryID == country);
  
    var filterIncome = I.filter(function(d) 
  { 
          if( d["CountryID"] == country && (d["Year"] == 2021 || d["Year"] == 2030))
          { 
              return d;
          } 
      });

      console.log(filterIncome);
  
      var Income_Group = filterIncome.map(function(k){
        return{
          IncomeClass: k.Income_Level,
          GDP_PerCap: k.GDP_Per_Capita,
          Yr: k.Year
        }
      });

      var IncCls = [];
      var gdpPC = [];
      var YrL = [];
      var IncomeGrpChng = "";

      for (var i = 0; i < Income_Group.length ; i++){
          IncCls.push(Income_Group[i].IncomeClass);
          console.log(Income_Group[i].IncomeClass);
          gdpPC.push(Income_Group[i].GDP_PerCap);
          console.log(Income_Group[i].GDP_PerCap);
          YrL.push(Income_Group[i].Yr);
          console.log(Income_Group[i].Yr);
         }

         if (IncCls[0] == IncCls[1]){
           IncomeGrpChng = "remain as"
         } else {
           IncomeGrpChng = "change to be"
         }

      console.log(IncCls[0]);
      console.log(gdpPC);
      console.log(YrL);
      console.log(IncomeGrpChng);

      Panel.append("div").text(`Its income group is currently listed as being a ${IncCls[0]} nation, with a current GDP Per capita of ${gdpPC[0]} $USD for the year ${YrL[0]}`);
      Panel.append("br")
      Panel.append("div").text(`It is estimated that by the year ${YrL[1]} that the income group will ${IncomeGrpChng} a ${IncCls[1]} nation, 
      with an estimed GDP Per capita of ${gdpPC[1]} $USD`);
      Panel.append("br")
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
// Population Forecast Plot
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
          y: parseInt((k.Population/1000000)),  // Divide by a million to better suit the Plot axis
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
} // End of BuildPlot function

init();  // Load Country list into Drop down
