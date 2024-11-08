For this lab I worked closely side by side with the textbook assigned for us to read. I found the summaries of each chapter very helpful as it helped me understand how everything I learned during the chapter combined back together. During the implementation of the encryption I had to reference guides cited below as well as some Azure references on how to setup roles and similar things in the VM.

Data Security:
For my data security I went back into Lab 3 and encrypted the information that I stored in the database. While weather data is not that sensitive, I did that as practice in case I would in the future store login passwords and I would know how to do this. I applied this to the earth weather main description and sub description to verify that it functioned correctly. 
This can be verified by looking at the weather database and earth table seen here:
https://liakht.eastus.cloudapp.azure.com/phpmyadmin/index.php?route=/sql&db=weather&table=earth_weather&pos=0

IAM - Identity and Access Management:
This was partially implemented before where only recognized users can actually access my VM and ssh into it. This was done through sudo adduser command to make sure that only myself, the TAs and the preadded professor would be able to enter. 

In addition, on Azure there is one group DevTest Labs User role which has limited access to verify that everything is provided for. A user without this role are not able to change anything in my VM. As I assigned this role only to myself, then I know it is secured. 

Finally, for IAM I secured it I enabled myself MFA to deter hacks and other unwanted activity on my own account.

Network Security:
I created Network Security Groups to make sure that it is more difficult for unauthorized networks to access. The first part of this was limiting the outgoing code requests to allow only for HTTP and HTTPS. In my code I only send requests to my database or to external APIs on HTTP / HTTPS. In addition, I limited access of the VM to only SSH or RDP. I block all of the other inbound traffic by default.  

Logging and Auditing:
Application Layer Securing: 
In the application layer it is the responsibility of the developer to review and secure coding practices for HTML / CSS / JS / PHP. I looked through all of my code and made sure that there was no possibility of SQL Injection or similar issues.  


Sources:
https://acte.ltd/utils/randomkeygen
https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal-subscription-admin
https://learn.microsoft.com/en-us/azure/ddos-protection/manage-ddos-protection 
https://learn.microsoft.com/en-us/azure/virtual-network/network-security-group-how-it-works 
https://www.isdntek.com/tagbot/encryptor.htm
https://cdnjs.com/libraries/crypto-js 

