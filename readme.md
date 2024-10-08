# Node.js Cluster Application with Monitoring

This project is a Node.js application that uses the cluster module to leverage multiple CPU cores. It includes a Docker configuration for containerization and integrates Prometheus and Grafana for monitoring and visualization.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Docker Commands](#docker-commands)
- [Monitoring](#monitoring)

## Features

- Node.js application running in a clustered environment for improved performance.
- Docker setup for easy deployment and management.
- Prometheus for metrics scraping and monitoring.
- Grafana for visualizing application metrics.

## Prerequisites

- [Docker](https://www.docker.com/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/) for managing multi-container Docker applications.

## Installation

1. Clone the repository:

   ```bash
    git clone <your-repo-url>
    cd <your-project-directory>
   ```
2. Install dependencies (if not using Docker for local development):

    ```bash
    npm install
    ```
## Usage 
To build and run the application using Docker Compose, use the following command:

```bash
    docker-compose up --build
```
This command will:
 - Build the Node.js application.
 - Start the application on port `3000`.
 - Start Prometheus on port `9090`
 - Start Grafana on port `3002`

## Docker Commands
- To stop the services:
```bash 
    docker-compose down
```
- To view logs:
```bash
    docker-compose logs -f
```
## Monitoring
1. Prometheus: Access Prometheus at http://localhost:9090.
    - Ensure your Node.js application exposes metrics at the /metrics endpoint using the prom-client library.

2. Grafana: Access Grafana at http://localhost:3002.
    - Default login is admin / admin.
    - Add Prometheus as a data source to visualize your application metrics.
