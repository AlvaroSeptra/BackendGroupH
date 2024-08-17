#!/bin/sh

# Check if zsh is available
if command -v zsh >/dev/null 2>&1; then
    echo "Using zsh to run the commands..."
    # If zsh is available, run the Docker commands in zsh
    exec zsh -c "
        docker build -t 'docker-intro' -f 'Dockerfile.local' .
        docker run -p 5000:5000 'docker-intro'
    "
else
    # If zsh is not available, fall back to bash
    echo "zsh not found. Using bash instead..."
    exec bash -c "
        docker build -t 'docker-intro' -f 'Dockerfile.local' .
        docker run -p 5000:5000 'docker-intro'
    "
fi  # End of the if block


docker build -t 'docker-ecommerce' -f 'Dockerfile.local' .

docker run -p 5000:5000 'docker-ecommerce'