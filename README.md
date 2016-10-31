SchedBuilder is a web app that creates schedules based on preferences (more in General Overview). This was created as a practice project for me to learn angular1.6 before a job while also doing something i was interested in. Therefore, it is very buggy and unpolished - use at your own risk of annoyance. It does work as is, but if you try to break it, it will break.

I will accept pull requests if anyone decides they want to contribute! 

###General Overview
If you don't care on how this works and just want to use it, skip this section.
This is a web app that uses the the list of courses from a specific semester  and your preferences to create an ideal schedule for you. Preferences you can set are:
1. Hours/Days you want to be in class
2. Proffessors you want to take
3. Classes you want to take
3.a. Wanting to take 1 (or 2 or 3) of a group of classes. As in (one of CSXXXX or PSYCYYYY)
4. Amount of credit hours in your schedule

The algorithm used to create schedules is a form of Randomized Hill Climbing I customized for this. it basically goes like this:
1. Start with empty schedule
2. Add random courses until minimum requirements are met (credit hours/courses from groups etc)
3. score schedule
4. Add random courses until minimum requirements are met (credit hours/courses from groups etc)
⋅⋅1. add course
⋅⋅2. remove course
⋅⋅2. change course
5. score new schedules, keep highest valued one and go to 3. Repeat as many times as you want.


Now, on how to use it:
###Instal node modules before trying to use
	In the root director (SchedBuilder/) run 
	```
	npm i
	```

 Note, if you are doing this for Spring 2017, you can skip to the section Running the Server and read from there - but if youre interested in how the project works, you might want to read the sections before it.


### Getting The Course Data
 The way SchedBuilder gets the course lstings is by scraping them from courseoff (cause gatechs api is pretty horrible to use). To get courses for a semester you will first need to update the path in courseData/getCourses.js so that it points to the right semester. It is currently set to Spring 2017. You do it like so:
1. In a browser go to the url soc.courseoff.com/gatech/terms
2. Identify the semester you want (the 'start_date' property is in unix time (milliseconds), i find that converting this helps me determine which i want - I use https://currentmillis.com/ to convert. Also, the newest tends to be on the bottom)
3. Once you've identified the correct semester, copy its 'ident', and replace it in the getCourses.js. It is located in the httpopts object at the top of the file in the string path which is formatted: '/gatech/terms/{IDENT}/majors/'
Now you need to scrape the data by running the following in your terminal from the root directory (SchedBuilder/):
```
node courseData/getCourses.js
```
Note - if you get an error, try again. That happens sometimes.

This has either replaced or generated a new file: courseData/classData.js

### Converting Data
The schedbuilder program doesn't use the data just yet. Next, from the root directory you need to run
```
node courseData/convertData.js
```
This creates courseData/coursesModule.js and SchedBuilder/courses

###Running the Server
To run the server simply run the following from the root directory. 
```
nodejs server.js
```

###How Use the website
####Home Page 
Navigate to localhost:3000 (or whatever port youve changed it to)

You will first see a screen with 3 sections. 

The major section - top left

The Group section - bottom left

the Settings section - right bar.


The major section starts off by showing you all the possible majors. Anything typed in the filter will filter the majors by their names, or the properties of their classes (class names, number, professors etc). 

Once you click on a major, the major section will update to show you the classes within that major. When you click on a class, the settings section will show you a list of settings.

By clicking the Add Course button, the selected course will be added to the group selected in the 'Group' dropdown. You can choose to create a new group for this course by typing in its name at the top text field and clicking add group.
Using this section you can also set the classes priority in relatio to other classes, as well the priorities of any professors you may want. 


By clicking on any of the groups in the group section, it will update to show you the classes in that section. The settings section will update to show you the group settings which are - Max and Min Credit Hours AND Max and Min courses. Setting these will force the algorithm to choose a min or max credit hours/courses from this group.


Now, create group and populate with courses until you have selected all the courses you might want to take. The more you select the better (you can specify how many credit horus after this). When you are done, click "Generate Schedule Layout"


####Schedule Page
On this page you can select the priority for different blocks of different days by selecting the time priority at the bottom (clicking on the never low med or high) and clicking on the time block.

You Also set the preferred amount of Credit Hours you want for your schedule. This is an interval found in the settings section that defaults to 13-15 hours.
By clicking  <---Course Settings you can update the courses youve selected and by clicking Generate Schedule --> the algorithm will try to create 10 possible schedules for you. This may take some time.


####Generated schedules Page
On this page you will see a calendar view of the week based on a potential schedule. Each class SHOULD (but might not be) colored differently, and have text formatted in the following way inside the block "{MAJOR-course number} {professor} {CRN} ". An example of this could be : "ECON - 3110, Besedes, Tibor 20380"

You can navigate to different generated schedules by clicking on the next and previous. 
