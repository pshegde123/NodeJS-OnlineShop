drop database if exists bamazon;
create database bamazon;
use bamazon;
create table products(
item_id int not null auto_increment,
product_name text(45) not null,
department_name text(45) not null,
price double not null,
stock_quantity int not null,
primary key(item_id));

insert into products(PRODUCT_NAME,DEPARTMENT_NAME,PRICE,STOCK_QUANTITY) values('Fire TV Stick','Electronics','39.99','1000');
insert into products(PRODUCT_NAME,DEPARTMENT_NAME,PRICE,STOCK_QUANTITY) values('Roku Express','Electronics','29.00','1000');
insert into products(PRODUCT_NAME,DEPARTMENT_NAME,PRICE,STOCK_QUANTITY) values('Air Fryer','Kitchen','61.00','200');
insert into products(PRODUCT_NAME,DEPARTMENT_NAME,PRICE,STOCK_QUANTITY) values('Dinnerware','Kitchen','21.00','150');
insert into products(PRODUCT_NAME,DEPARTMENT_NAME,PRICE,STOCK_QUANTITY) values('Corelle Dinnerware','Kitchen','76.00','500');
insert into products(PRODUCT_NAME,DEPARTMENT_NAME,PRICE,STOCK_QUANTITY) values('Winter Jacket','Womens Clothing','135.00','500');
insert into products(PRODUCT_NAME,DEPARTMENT_NAME,PRICE,STOCK_QUANTITY) values('Turtleneck Sweater','Womens Clothing','36.00','2000');
insert into products(PRODUCT_NAME,DEPARTMENT_NAME,PRICE,STOCK_QUANTITY) values('Amelia Bedelia','Childrens Books','10.98','5000');
insert into products(PRODUCT_NAME,DEPARTMENT_NAME,PRICE,STOCK_QUANTITY) values('Sonos Beam','Smart Home','399.00','300');
insert into products(PRODUCT_NAME,DEPARTMENT_NAME,PRICE,STOCK_QUANTITY) values('Smart Light','Smart Home','26.79','300');

/*select * from products;*/