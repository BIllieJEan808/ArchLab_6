FROM php:8.2-apache

# Установка зависимостей
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && a2enmod rewrite headers

# Копирование конфига Apache
COPY ./apache-config.conf /etc/apache2/sites-available/000-default.conf

# Копирование файлов проекта
COPY ./front /var/www/html
COPY ./back /var/www/back

# Настройка прав
RUN chown -R www-data:www-data /var/www \
    && find /var/www -type d -exec chmod 755 {} \; \
    && find /var/www -type f -exec chmod 644 {} \;

EXPOSE 80