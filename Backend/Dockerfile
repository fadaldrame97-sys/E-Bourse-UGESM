FROM php:8.3-cli

# Installer les extension PHP pour Lravel et MySQL
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip