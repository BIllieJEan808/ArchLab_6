# syntax=docker/dockerfile:1
FROM maven:3.6.0-jdk-11-slim

WORKDIR /app

COPY pom.xml ./
RUN mvn dependency:go-offline

COPY src ./src

CMD ["mvn", "spring-boot:run"]
