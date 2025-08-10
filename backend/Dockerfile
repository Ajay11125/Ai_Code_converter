# --- Stage 1: Build the application ---
FROM maven:3.9.1-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy source code
COPY pom.xml .
COPY src ./src

# Build the application JAR
RUN mvn clean package -DskipTests

# --- Stage 2: Run time image ---
FROM eclipse-temurin:17-jdk-slim
WORKDIR /app

# Copy JAR from build stage
COPY --from=builder /app/target/*.jar app.jar

# Use PORT env (default 8080)
ENV JAVA_OPTS ""
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
