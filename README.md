SchedBuilder is a web app that creates schedules based on preferences (more in General Overview). This was created as a practice project for me to learn angular1.6 before a job while also doing something i was interested in. Therefore, it is very buggy and unpolished - use at your own risk of annoyance. It does work, though.
I will accept pull requests if anyone decides they want to contribute! 

###General Overview
If you don't care on how this works and just want to use it, skip this section.
This is a web app that uses the the list of courses from a specific semester  and your preferences to create an ideal schedule for you. Preferences you can set are:
1. Hours/Days you want to be in class
2. Proffessors you want to take
3. Classes you want to take
3. ..a. Wanting to take 1 (or 2 or 3) of a group of classes. As in one of (CSXXXX or PSYCYYYY)
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
If you don't have nodejs/npm installed, download and install it: https://nodejs.org/en/ 
Then after downloading/cloning the repo run this in the root directory (SchedBuilder/) 
```
npm i
```


### Getting The Course Data
This section applies to changing the course data which is only necessary if you want to use this for a semester other than the current one (Spring 2017) or a different scool (it's currently set to Georgia Tech). You can skip it otherwise.

The way SchedBuilder gets the course lstings is by scraping them from courseoff (cause gatechs api is pretty horrible to use). To get courses for a semester you will first need to update the path in courseData/getCourses.js in the httpopts object so that it points to the right semester. It is currently set to Spring 2017. You do it like so:
1. In a browser go to the url soc.courseoff.com/gatech/terms
2. Identify the semester you want, the 'start_date' property is in unix time milliseconds, i find that converting this helps me determine which semester i want - I use https://currentmillis.com/ to convert. Also, the newest semester tends to be on the bottom)
3. Once you've identified the correct semester, copy its 'ident' proerty, and replace it in the getCourses.js path which is located in the httpopts object at the top of the file, the string is formatted: '/gatech/terms/{IDENT}/majors/'

If you all you wanted to do was change the semester, you are ready to scrape the data. If you wanted to change schools, you will need to find the correct courseoff url for your schools data (or provide your own data).

Now you need to scrape by running the following in your terminal from the root directory (SchedBuilder/):
```
node courseData/getCourses.js
```
Note - if you get an error, try again. That happens sometimes.

This has either replaced or generated a new file: courseData/classData.js

### Converting Data
The schedbuilder program can't use the data just yet. Next, from the root directory you need to run
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
By clicking  <---Course Settings you can update the courses youve selected and by clicking Generate Schedule --> the algorithm will try to create 10 possible schedules for you. This may take some time. You can look at the servers log (in the terminal) for progress reports.


####Generated schedules Page
On this page you will see a calendar view of the week based on a potential schedule. Each class SHOULD (but might not be) colored differently, and have text formatted in the following way inside the block "{MAJOR-course number} {professor} {CRN} ". An example of this could be : "ECON - 3110, Besedes, Tibor 20380"

You can navigate to different generated schedules by clicking on the next and previous. 
