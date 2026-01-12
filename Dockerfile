# ===============================
# Build stage
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

# --- Accept build-time env variables (Vite requirement) ---
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_APP_ID

# --- Expose them to Vite during build ---
ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY
ENV VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN
ENV VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID
ENV VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID

# Copy dependency files first (better caching)
COPY package*.json ./

# Install deps
RUN npm ci

# Copy source
COPY . .

# Build the Vite app
RUN npm run build


# ===============================
# Runtime stage
# ===============================
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config (SPA-safe)
COPY nginx.conf /etc/nginx/conf.d

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
