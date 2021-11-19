Population and GDP Prediction

***Machine Learning Component***

This project will aim to use established datasets for both population and GDP per capita.

The scope of the datasets will be for the last 20-50 years and aim to predict 10 years into the future and output a generated data file with population and GDP per capita figure based on a linear regression model.

This will be done using a python / Pandas file to read in data from data files, loop through a list of countries and Years to then create a predict of population and GDP per capita into two new dataframes and output these lists as CSVs

***PostGresSql***

Based on the files above will be combined into a PostGresSql database, and outputted into a .sql file as a database source.


***Bootstrap Webpage***

This web page will present the user with a drop down list of countries to filter the displays.

Once the country is selected this will trigger a number of visual elements (via a JS script) 

This will include:

- A present primary data about the selected country. (Region, Lat Long, Current Income Grouping)

- The first two visuals will display population figure for the last 20-50 years and the next 10 years based on the ML model above

- The Net two visuals will display GDP per capita for the last 20 years and the next 10 years based on the ML models above.

***Deployment***

This web page will be launched either through Heroku or Git Hub Page based on testing.