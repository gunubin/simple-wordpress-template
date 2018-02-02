#!/bin/bash

if [ -f wp-config.php ]; then
    echo >&2 "wp-config.php is already present. Database will not be overridden and files are kept as is."

else

    source env

    : ${WP_VERSION:=${WP_VERSION:-4.9.2}}
    : ${WP_DOMAIN:=${WP_DOMAIN:-localhost}}
    : ${WP_URL:=${WP_URL:-http://localhost}}
    : ${WP_LOCALE:=${WP_LOCALE:-ja_JP}}
    : ${WP_SITE_TITLE:=${WP_SITE_TITLE:-WordPress for development}}
    : ${WP_ADMIN_USER:=${WP_ADMIN_USER:-admin}}
    : ${WP_ADMIN_PASSWORD:=${WP_ADMIN_PASSWORD:-admin}}
    : ${WP_ADMIN_EMAIL:=${WP_ADMIN_EMAIL:-kato@shanord.com}}

    : ${WP_DB_HOST:=${WP_DB_HOST:-localhost}}
    : ${WP_DB_NAME:=${WP_DB_NAME:-wordpress}}
    : ${WP_DB_USER:=${WP_DB_USER:-root}}
    : ${WP_DB_PASSWORD:=${WP_DB_PASSWORD:-root}}

    wp core --allow-root config \
        --dbhost="$WP_DB_HOST" \
        --dbname="$WP_DB_NAME" \
        --dbuser="$WP_DB_USER" \
        --dbpass="$WP_DB_PASSWORD" \
        --locale="$WP_LOCALE" \
        --extra-php <<PHP
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
PHP

    wp db --allow-root create

    # Install WordPress.
    wp core --allow-root install \
       --url="${WP_URL}" \
       --title="${WP_SITE_TITLE}" \
       --admin_user="${WP_ADMIN_USER}" \
       --admin_password="${WP_ADMIN_PASSWORD}" \
       --admin_email="${WP_ADMIN_EMAIL}" \
       --skip-email

       wp plugin --allow-root install wordpress-importer --activate

       # Add domain to hosts file. Required for Boot2Docker.
       echo "127.0.0.1 ${WP_DOMAIN}" >> /etc/hosts

   echo >&2 "Access the WordPress admin panel here ${WP_URL}"
fi

exec "$@"
