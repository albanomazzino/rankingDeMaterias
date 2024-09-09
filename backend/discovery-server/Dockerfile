# Use an official Maven image to build the application
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven POM file and the source code into the container
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use an official OpenJDK image to run the application
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar discovery-server.jar

# Copy wait-for-it.sh from the current directory
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Give execute permissions
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Expose the application's port
EXPOSE 8761

# Define the command to run the application with wait-for-it
ENTRYPOINT ["wait-for-it.sh", "config-server:8888", "--timeout=60", "--", "java", "-jar", "discovery-server.jar"]
