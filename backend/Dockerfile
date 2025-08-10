# Use official OpenJDK image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper & pom.xml first (for caching dependencies)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (this helps with build caching)
RUN ./mvnw dependency:go-offline -B

# Copy the rest of your application
COPY src src

# Package the application
RUN ./mvnw clean package -DskipTests

# Expose port 8080 (Render will override with PORT env var)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "target/codeconverter-0.0.1-SNAPSHOT.jar"]
