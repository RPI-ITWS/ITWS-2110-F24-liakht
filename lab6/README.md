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

TO DO

--------------------------------------------------------

Findable
At the current state it is simple to find what you are looking for. In the center it shows your location in longitude and latitude and right below it we have the mars and earth weather. Each section has a clear label so the use can find it and understand what the data signifies.

Laws:
Law of Common Region: Grouping earth and mars in seperate regions helps clearly defining data boundries
Law of Proximity: Similarly, all of the data is located closely together inside their boundries
Law of Prägnanz: It is important to display complex information in a simple way since that is the way the user will understand it.

To Do: Longitude and latitude to city / name


Credible
The data on my website is extremely credible as it uses official sources. The first website uses a popular weather API website which provides accurate information and the second API is from NASA, an organization for being one of the table organizations for space exploration.

Laws:
Postel’s Law: This tells myself to be careful about what information I show and send back to the user.
Peak-End Rule: After the user puts in their location and all other information, they will still value their experience mainly by how well they understood the data.

To Do: Added where data came from

Desirable
As of now the website has a clean asthetic but more can be added to make it look more desireable. It provides with the information that they are looking for with simple styling to keep them interested.

Laws:
Aesthetic-Usability Effect: A good visual design improves what the user thinks of the site, suggests improving css.
Law of Similarity: I should maintain similar design for similar objects. The css for earth and mars is largely the same. 

To Do: Emphasize nasa and improve css

Accessible:
The website does not have anything flashing or difficult to read, a narritor tool would easily be able to move between the section titles to allow for a disabled user to read the information.

Laws:
Law of Uniform Connectedness: Consistent labels between earth and mars will allow user to more easily understand my information.
Zeigarnik Effect: If a task does not complete then the person will remember that more than if I put an indicator that it didn't finish.

To Do: Change coloring around


Valuable:
Goal-Gradient Effect: As the user puts in their location they get closer to reaching their goal of getting the data.
Pareto Principle: The 20% of causes is the user putting in location and the remaining 80% of effects is the displaying of API data.

This application provides the user, myself and the API developers value. The user gains value through looking at information about the weather on both earth and mars. I gain value by providing this service to the users and having the ability to expand further if the website becomes popular enough. Finally, the APIs that I gather information from also gain value. The earth weather website gains value by hoping my website becomes popular enough to have charge me for the API and nasa gains value by educating other people about valuable space information. 



Sources:
https://openweathermap.org/api/geocoding-api 