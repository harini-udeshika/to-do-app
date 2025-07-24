# Build stage
FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

# Copy gradle files first for better caching
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Make gradlew executable
RUN chmod +x gradlew

# Download dependencies (this layer will be cached if dependencies don't change)
RUN ./gradlew dependencies --no-daemon

# Copy source code
COPY src src

# Build the application
RUN ./gradlew build -x test --no-daemon

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the built JAR file from build stage
COPY --from=build /app/build/libs/*.jar todo-backend.jar

EXPOSE 4000

ENTRYPOINT ["java", "-jar", "todo-backend.jar"]
