
Getting started with this badge
To get started, you will need to install Wireshark to perform the inspect of the network dump provided.

Getting the PCAP file
In this challenge, you can download the PCAP file using the following link: pcap_02.pcap

This challenge
In this challenge, the file only contains the TCP connection of a user connecting to a server using telnet. Connecting with telnet is insecure as anyone who can see the traffic, or access a packet capture of the connection is able to see the username and password used as well as all the commands that the user executed.

Using Wireshark, you can open the file. Once the file is loaded, you should be able to right-click and select "Follow TCP Stream" as you did in the previous exercise.

The interesting part here is that you should see the difference in color between the data coming sent by the server and the data sent by the client. You should see the server sending a banner (with the version of the Linux Kernel) and a prompt with Login:. Then you should see the response from the client. The server is then asking for the Password. The client provides the password (The key to solve this exercise). Finally, you can see the Debian Message-of-the-Day (MOTD) and the command ran by the user.