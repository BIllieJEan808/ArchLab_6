# Cloned PetClinic Project: Fullstack: Angular + Spring Boot + MySql + Docker

## Preconditions
* Docker CE 20.10.13
* Docker Compose v2.3.3
* Java 11
* Spring Boot 2.6.4
  * spring-boot-starter-data-jpa
  * spring-boot-starter-data-rest
  * mysql
  * lombok
* Angular 13
* Mysql 8
* Maven 3.8.5
* Node v16

## Build steps
1. Clone repository
```
git clone https://github.com/nm-tran/my-petclinic-project.git
cd my-petclinic-project
```

2. Using Docker-Compose
```
docker-compose up
```
3. Or manually start database, backend and frontend services in corresponding directory
   1. Start database service in background with root user and empty password
   ```
   brew services start mysql
   mysql -uroot
   ```
   2. Start backend service
   ```
   mvn spring-boot:run
   ```
   3. Start frontend service
   ```
   ng serve
   ```
4. Open browser on http://localhost:4200
5. URL for Rest API on http://localhost:8080/api

## Disclamer
This project is not to privide complete application, but rather a pet project to try different technologies.



