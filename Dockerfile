# Frontend build
FROM node:18 AS frontend-builder
WORKDIR /app/frontend
COPY Front/ ./
RUN npm install && npm run build

# Backend build
FROM maven:3.9.4-eclipse-temurin-17 AS backend-builder
WORKDIR /app/backend
COPY springproject/demo-1/.mvn/ .mvn
COPY springproject/demo-1/mvnw springproject/demo-1/pom.xml ./
COPY springproject/demo-1/src ./src
RUN ./mvnw clean install -DskipTests

# Final image
FROM openjdk:17-slim
WORKDIR /app
COPY --from=backend-builder /app/backend/target/*.jar app.jar
COPY --from=frontend-builder /app/frontend/dist/ ./frontend/
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "app.jar"]
