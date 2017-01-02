create table price_list ( sno int NOT NULL auto_increment , city varchar(30), rate int, hiked_rate int, primary key(sno));

create table report (sno int not null,name varchar(40),p1 int,b1 varchar(1),t1 int,p2 int,b2 varchar(1),t2 int,p3 int,b3 varchar(1),t3 int);
alter table report add foreign key(sno) references price_list(sno);

create table day_limit ( Day varchar(20),batch int(1),location varchar(20),weight int(4), count int(2));