# syntax=docker/dockerfile:1
FROM adoptopenjdk/openjdk11:jre-11.0.6_10-alpine

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src

CMD ["./mvnw", "spring-boot:run"]
