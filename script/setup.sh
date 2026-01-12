#!/usr/bin/env bash

set -e

PROJECT_NAME="firebase-auth-app"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

echo "▶ Setting up $PROJECT_NAME"
echo "▶ Project root: $ROOT_DIR"
echo

# ----------------------------
# Helpers
# ----------------------------
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

fatal() {
  echo "❌ $1"
  exit 1
}

success() {
  echo "✅ $1"
}

step() {
  echo
  echo "▶ $1"
}

# ----------------------------
# Checks
# ----------------------------
step "Checking required tools"

command_exists docker || fatal "Docker is required."
command_exists git || fatal "Git is required."

success "Required tools are installed"

# ----------------------------
# Environment setup
# ----------------------------
step "Setting up environment variables"

if [[ ! -f .env ]]; then
  if [[ -f .env.example ]]; then
    cp .env.example .env
    echo "⚠️  .env created from .env.example"
    echo "⚠️  Please update Firebase values before continuing"
    exit 1
  else
    fatal ".env not found and .env.example is missing"
  fi
fi

REQUIRED_VARS=(
  VITE_FIREBASE_API_KEY
  VITE_FIREBASE_AUTH_DOMAIN
  VITE_FIREBASE_PROJECT_ID
  VITE_FIREBASE_APP_ID
)

missing_vars=()

for var in "${REQUIRED_VARS[@]}"; do
  if ! grep -q "^$var=" .env; then
    missing_vars+=("$var")
  fi
done

if [[ ${#missing_vars[@]} -ne 0 ]]; then
  echo "❌ Missing required env variables:"
  for v in "${missing_vars[@]}"; do
    echo "   - $v"
  done
  fatal "Fix .env and rerun setup"
fi

success "Environment variables validated"

# ----------------------------
# Docker build
# ----------------------------
step "Building Docker image"

docker build \
  --build-arg VITE_FIREBASE_API_KEY="$(grep VITE_FIREBASE_API_KEY .env | cut -d= -f2-)" \
  --build-arg VITE_FIREBASE_AUTH_DOMAIN="$(grep VITE_FIREBASE_AUTH_DOMAIN .env | cut -d= -f2-)" \
  --build-arg VITE_FIREBASE_PROJECT_ID="$(grep VITE_FIREBASE_PROJECT_ID .env | cut -d= -f2-)" \
  --build-arg VITE_FIREBASE_APP_ID="$(grep VITE_FIREBASE_APP_ID .env | cut -d= -f2-)" \
  -t "$PROJECT_NAME" .

success "Docker image built"

# ----------------------------
# Run container
# ----------------------------
step "Running app locally"

echo "→ App running at http://localhost:8080"
echo "→ Ctrl+C to stop"

docker run --rm -p 8080:80 "$PROJECT_NAME"
