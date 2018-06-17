# video-ticket
## node初学，后台还存在的问题
* 路由问题
* cookie/session
* 返回页面模板
-----
#### 路由问题
* 不用登录也可以访问到登陆后的页面（拦截？？？，cookie/session？？？）
* 页面之间的相互跳转（目前是把所有静态资源文件都放在了public文件夹，页面文件放在view文件夹）
#### cookie/session
* 目前对其功用还不是很清楚
* 登录时的验证拦截？？？
* 保存临时用的数据？？？
#### 返回页面渲染模板
>例：一个剧目的列表，点击进入之后每个页面的结构都是相同的
* 对其具体实现不是很清楚，猜想此功能由后台模板渲染完成
## 数据库的使用情况(mysql)
> 共有5张表
* login（用户表） | id | username | password | rooter |
* video（剧目表）| id | name | type | time | actor | director | brief | img |
* plan（演出计划表）| id | name | house | time | number | price | seat |
* house（演出厅表）| id | housename | seat | number |
* orders（订单表）| id | username | videoname | house | time | number | seat | ticket | price | money |
* create table login (id int primary key auto_increment,username varchar(50) not null,password varchar(50) not null,rooter varchar(20) not null);
* create table video (id int primary key auto_increment,name varchar(30) not null,type varchar(50) not null,time int not null,actor varchar(50) not null,director varchar(50) not null,brief varchar(500) not null,img varchar(50) not null); 
* create table house (id int primary key auto_increment,housename varchar(50) not null,seatnum int not null,seat varchar(500) not null);
* create table plan  (id int primary key auto_increment,name varchar(50) not null,house varchar(50) not null,time date not null,number int not null,price int not null,seat varchar(500) not null);
* create table orders(id int primary key auto_increment,username varchar(30) not null,videoname varchar(30) not null,house varchar(30) not null,time data not null,number int not null,seat varchar(500) not null,ticket int not null,price int not null,money int not null);
