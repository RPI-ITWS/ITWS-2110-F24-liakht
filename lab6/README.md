ZAP SCAN: https://liakht.eastus.cloudapp.azure.com/ITWS-2110-F24-liakht/lab6/zap.png

For this lab I spent my first few hours just understanding my website, the 7 factors of UX and the laws of ux website. I worked on analyzing my previous lab5 and then showed how it relates to each factor and the laws that map to it. Netx, I made a note of everything that could be improved. Finally, I spent the remaining of the time actually implementing the changes that I thought of and documented all of my work below. As one of the changes I convert lat and lon to actual names so I had to use another endpoint of the weather API, I added it to my sources list to show what documentation I was reading. 

Useful
My current website is useful to many different kinds of people. As it displays the current weather, it is useful for the regular person who wants to know if they should wear a jacket when they go outside. In addition, for a space enthusiast, it is useful to compare what the weather is like where they live vs what the weather is like when they live in mars. 

Laws: 
Occam's Razor - Keeping the interface simple is very important to the users

To improve the usefulness I added an option for the user to input a custom location with either the city / state name or the exact longitude or latitude. Previously they were only able to default to Troy or their location through geolocation API but this allows them to select any location that they are interested in.

--------------------------------------------------------

Usable
This application is very useable because it is simple and straight to the point. Right away the users location is gathered based on their geolocation information. This makes it easy for them to not even have to type in their location. Once I have their location, I can display the current weather of where they are at side by side with the mars weather. They can easily compare them and understand the actual difference between our two planets. 

Laws:
Hick's Law - As I reduce the number of complex choices, the time to make a decision also reduces
Fitts’s Law: The buttons should be large and easily seen to reduce time to 'aquire a target'
Doherty Threshold: Everything should load under 400ms so the user continues interactions with the website
Jakob’s Law: Since the user spends most of their time on other websites, it is important to keep their expectations the same. 

To improve the useability I changed how I displayed the users select location. Previous I displayed the longitude and latitude which does not help the user much as it is just some numbers. I changed it to the actual location such as Troy, Fairfield or other city names.


--------------------------------------------------------

Findable
At the current state it is simple to find what you are looking for. In the center it shows your location in longitude and latitude and right below it we have the mars and earth weather. Each section has a clear label so the use can find it and understand what the data signifies.

Laws:
Law of Common Region: Grouping earth and mars in seperate regions helps clearly defining data boundries
Law of Proximity: Similarly, all of the data is located closely together inside their boundries
Law of Prägnanz: It is important to display complex information in a simple way since that is the way the user will understand it.

To improve how findeable my application was I restructured the headers and tried to have less text at the header so it was easier to understand what you were looking for. If you wanted to know where you are located then it is much easier with the exact location written out. 

--------------------------------------------------------

Credible
The data on my website is extremely credible as it uses official sources. The first website uses a popular weather API website which provides accurate information and the second API is from NASA, an organization for being one of the table organizations for space exploration.

Laws:
Postel’s Law: This tells myself to be careful about what information I show and send back to the user.
Peak-End Rule: After the user puts in their location and all other information, they will still value their experience mainly by how well they understood the data.

To make the information more credible I added a link to each of the API documentations so the user can understand where the data is coming from. They can access it by pressing "Earth Weather" or "Mars Weather." I made sure they know it is clickable by changing the css to make it underlined and their mouse changes to the clickable icon when hovering over. 

--------------------------------------------------------

Desirable
As of now the website has a clean asthetic but more can be added to make it look more desireable. It provides with the information that they are looking for with simple styling to keep them interested.

Laws:
Aesthetic-Usability Effect: A good visual design improves what the user thinks of the site, suggests improving css.
Law of Similarity: I should maintain similar design for similar objects. The css for earth and mars is largely the same. 

To improve how desirable my website is I modified the css to give it a cleaner and more understanding look. I made the header have less sections and display more accurate information for the user to have a better experience. 

--------------------------------------------------------

Accessible:
The website does not have anything flashing or difficult to read, a narritor tool would easily be able to move between the section titles to allow for a disabled user to read the information.

Laws:
Law of Uniform Connectedness: Consistent labels between earth and mars will allow user to more easily understand my information.
Zeigarnik Effect: If a task does not complete then the person will remember that more than if I put an indicator that it didn't finish.

There was not much to improve for how accessible my website is as it is already uniform and without many issues there. However, I still adjusted the headers to make sure that the headers are more clear for anyone using a narrator tool to understand what section they are on.

--------------------------------------------------------

Valuable:
Goal-Gradient Effect: As the user puts in their location they get closer to reaching their goal of getting the data.
Pareto Principle: The 20% of causes is the user putting in location and the remaining 80% of effects is the displaying of API data.

This application provides the user, myself and the API developers value. The user gains value through looking at information about the weather on both earth and mars. I gain value by providing this service to the users and having the ability to expand further if the website becomes popular enough. Finally, the APIs that I gather information from also gain value. The earth weather website gains value by hoping my website becomes popular enough to have charge me for the API and nasa gains value by educating other people about valuable space information. 

All of my changes overall made this project more valuable. I modified the css, improved credibility, added an exact location display and many more things. These keep the user engaged and provide the user with more value from the website because they have a further improved experience. As a result, this gives me more value by retaining my user for longer and the API also recieves value becacause the users are using it more through my application.

--------------------------------------------------------

Sources:
https://openweathermap.org/api/geocoding-api
https://openweathermap.org/current
https://api.nasa.gov/
https://docs.google.com/presentation/d/1lk-5Uv23Lo-O9Jpa-4M9MeD5b2OdI4QTivua5KorxYM/edit#slide=id.p (Slides)
https://youtu.be/IPdsFaM7HCs (7 Factors of UX video from slides)
https://lawsofux.com/ 