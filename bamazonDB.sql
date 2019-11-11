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

create table departments(
department_id	int not null auto_increment,
department_name	text(45) not null,
over_head_costs double not null,
primary key(department_id));

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

insert into departments(department_name,over_head_costs) values('Electronics',20000);
insert into departments(department_name,over_head_costs) values('Kitchen',10000);
insert into departments(department_name,over_head_costs) values('Smart Home',50000);
insert into departments(department_name,over_head_costs) values('Womens Clothing',80000);
insert into departments(department_name,over_head_costs) values('Childrens Books',50000);

alter table products add column product_sales double not null default 0.0;

select d.department_id,d.department_name,sum(d.over_head_costs),sum(p.product_sales),sum(p.product_sales) - sum(d.over_head_costs) as total_profit
from products as p, departments as d
where d.department_name = p.department_name
group by d.department_id;

/*
select * from products;
select * from departments;
*/
