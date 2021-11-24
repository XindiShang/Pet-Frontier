# Pet-Frontier 宠物前线
PetFrontier is a website where users can create and review petshops. In order to review or create a petshop, you must have an account. This project was the petshop version of Yelp.

宠物前线是一个用户分享及点评宠物店的网站，创建店铺或发布评价需要登录。该项目是一个仿大众点评的网站。
## Getting Started 开始
Following instructions you will get a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. Also, you can visit the link to see the live demo.

点击链接下载代码之后，请根据以下提示安装依赖包。你也可以点击观看已部署在heroku上的live演示。
## Prerequisites 条件
* Account in MongoDB (For storing the user data) https://www.mongodb.com *MongoDB账号 (储存用户数据)
* Account in Cloudinay (For uploading files and images) https://cloudinary.com *Cloudinay账号 (上传图片)
* Account in Amap (For using map features) https://lbs.amap.com/ *高德地图开放平台账号 (地图功能展示)
* Account in QQMail (For sending password reset emails) https://mail.qq.com/ *QQ邮箱账号 (发送密码重置邮件)
## Installing 安装
* In order to run the code you must have the following dependencies first. *运行代码之前请安装依赖包
  * async, cloudinary, connect-flash, connect-mongo, cors, dotenv, ejs, ejs-mate, express, express-mongo-sanitize, express-session, helmet, joi, method-override, moment, mongoose, mongoose-paginate-v2, multer, multer-storage-cloudinary, node-fetch, nodemailer, passport, passport-local, passport-local-mongoose, sanitize-html
* To run the app *运行代码
```
  * npm init
    * npm install "whichever is not present" --save eg. npm install express body-parser dotenv --save
    * node app.js 
```
## Technologies Used 核心技术
* Front End: HTML, CSS, Bootstrap
* Back End: NodeJS, NPM, ExpressJS, REST, PassportJS, MongoDB
## Project Module 核心模块
* Petshop -  Create Petshop, Read Petshop, Update Petshop, Delete Petshop *创建、查看、修改、删除宠物店
* Review -  Create Review, Read Review, Delete Review *创建、查看、删除评价
* User - Sign up, Login, Reset Password, Update Profile *用户注册、登录、密码重置、个人主页
  * User With Admin Code - can update or delete other users' petshops and reviews *管理员权限：可修改、删除一切内容
  * User Without Admin Code - can only update or delete their own petshops and reviews * 非管理员权限：只可修改、删除个人创建的内容
## Constraint 限制
* No create, update and delete option without login in to website. *登录后才可以创建、修改、更新内容
## Live Demo 展示
* Please visit this <a href="https://pet-frontier.herokuapp.com/" target="_blank">[heroku link]</a> *点击链接查看网页展示
* You can also view the demo video on <a href="https://www.bilibili.com/video/BV1Mq4y1r7yB/" target="_blank">[Bilibili link]</a> *点击链接查看B站视频演示
## ScreenShot 截图
<p float="left">
<img alt="Demo_1" src="https://github.com/XindiShang/assets/blob/0c53e693cf21a5ae81a6ea5d8940fa72416b03c1/pf_demo1.jpg" width="400">
<img alt="Demo_2" src="https://github.com/XindiShang/assets/blob/0c53e693cf21a5ae81a6ea5d8940fa72416b03c1/pf_demo2.jpg" width="400">
</p>

## Author 作者
* Xindi Shang
## Future Scope 待改进
* Sort petshops by location/rating *增加筛选条件
* Add image upload constraints *增加图片上传限制

