# Use the Nginx image as the base image
FROM nginx:alpine

# Copy the built Angular application to the Nginx HTML directory
ARG APP

COPY dist/apps/${APP}/browser /usr/share/nginx/html

COPY apps/${APP}/nginx.conf /etc/nginx/conf.d/default.conf


# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
