# PrintHub
This server will host open source 3D print models

# setting up locally
1) go to windows power shell and run:
    ```
	$ Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
    ```
2) download and install ubuntu wsl - https://ubuntu.com/wsl
3) choose username and password
4) installing node:
    ```
	$ sudo apt-get install curl
	$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
	$ sudo apt-get install nodejs
    ```
5) check if node and npm is installed currectly by running:
    ```
	$ node -v
	$ npm -v
    ```
6) install postgresql:
    ```
	$ sudo apt install postgresql postgresql-contrib
    ```
7) start postgres server:
    ```
	$ sudo service postgresql start
    ```
8) connect to postgres user:
    ```
	$ sudo -i -u postgres
    ```
9) access a Postgres prompt:
    ```
	$ psql
    ```
10) create table (run in postgres prompt):
    ```
	$ CREATE TABLE product(id integer PRIMARY KEY, name VARCHAR NOT NULL);
    ```
11) add new product (run in postgres prompt):
    ```
	$ INSERT INTO product(id, name) VALUES (123, 'product name')
    ```
12) cloning repo to wsl:
    ```
	$ git clone https://github.com/roeeyud/PrintHub.git
    ```
13) cd to PrintHub:
    ```
	$ cd PrintHub
    ```
14) install and start:
    ```
	$ npm install
	$ npm start
    ```
