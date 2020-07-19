##### Hosting
 - Shared Hosting
 - VPS Hosting (virtual private server)
 - Dedicated Server
 - Reseller Hosting
 - Cloud Hosting
 - Static Hosting

`Shared Hosting` \
 - You sharing CPU, disc space and memory with other sites on server.
 - Pretty cheap (aside from static hosting)
 - Used for small websites
 - Most include email, FTP, PHP, DB, Software

`VPS` \
- You still with others on the server, but now you have virtualized, fixed amount of CPU, disc space and memory.
- More secure, more control with ssh, more privileges.
- You can have a few accounts

`Dedicated Server` \
- Your own actual server
- You rent a physical machine
- Full access & privileges
- Harder to manage but very powerful

`Reseller Hosting` \
- Create & manage multiple shared accounts
- Can sell shared accounts to your own customers
- Pretty similar to VPS
- Usually comes with reseller software

`Cloud Hosting` \
- Used for web apps
- Multiple servers work together
- Very scalable and great for large apps
- Not for beginners / harder to manage

`Static Hosting` \
- Super simple
- Upload static site via Git
- Great for static websites
- Free (except extra features)

###### Deploying
`FTP` \
Filezilla - is a nice FTP client and server. You can use client to upload your whole site folder to your hosting server. Default port - 21.
But better to use Git and hooks in your CI/CD.