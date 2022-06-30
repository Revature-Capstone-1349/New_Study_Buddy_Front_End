## Steps to Run the Study-Buddy

---

#### *Make sure you have the following installed on your local machine.*
- IntelliJ IDEA by JetBrains
- Microsoft Visual Studio Code
- Node.js

---

## Steps


* Go to our github and select the corresponding counter part for this project.

 --- 
<br> 
  
* [Study_Buddy_Backend](https://github.com/Revature-Capstone-1349/Study_Buddy_Backend)

  
<br>

* [New_Study_Buddy_Front_End](https://github.com/Revature-Capstone-1349/New_Study_Buddy_Front_End)

---

<br>

* Open the respository to each of the urls of our project, select the <strong>green "Code button"</strong> where the drop down arrow is.  Ensure that the <strong>https is selected</strong> inside this drop down box and click on the icon with with two files to the right. Github will populate "copied".

---
<br>

* Locate the <strong>zip folder</strong> and extract the directory you want for the project. 

---
<br>

* Once you have both respository extracted, open the the command prompt/terminal in the <strong>"New_Study_Buddy_Front_End" folder</strong>.
  
---  
<br>

* Download the <strong>node.js</strong> using <strong>"npm install"</strong>.

---

<br>

* While the node.js is installing, open your IntelliJ and look for the <strong>"Study_Buddy_Backend"</strong> folder and open up the <strong>"Study_Buddy_Backend"</strong> project inside that folder.

---

<br>

* Once you open this, give it a moment to check for the dependency,

---

<br>

* While we wait, open your command prompt/terminal and enter your MySQL database. Create a database called <strong>"Study_Buddy"</strong> then close the terminal once you are done.

---

<br>
  
* Next in your <strong>IntelliJ</strong> go to the "src" folder and right click on the "main" folder directory and create a new directory call "resources".

---

<br>

*  Once you make the directory, create a file called <strong>"application.properties"</strong> and populate it with the following:
  
***

```
spring.datasource.url=jdbc:mysql://localhost:3306/Study_Buddy
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL8Dialect
```

***

<br>
* Once that is completed, run the main program in the <strong>"StudyBuddyBackendApplication.java"</strong>, make sure everything is running correctly, then go back to the terminal where you were downloading node.js.
  
---

<br>
* Once that download is complete, run the following script <strong>"ng s -o"</strong>, if the website does not open for you, open a browser tab and type <strong>"http://localhost:4200".</strong>

---

This will run the server.


