# Define paths
source_directory="/production/web/icode-example/frontend/1"
destination_directory="/production/web/icode-example/frontend"
old_directory="/production/web/icode-example/frontend/old"
dist="/production/web/icode-example/frontend/1/dist"

# Step 1: Enter source directory and run npm run build
cd "$source_directory" || { echo "Failed to change directory."; exit 1; }
npm run build || { echo "npm run build failed."; exit 1; }

# Step 2: Move index.html, vite.svg, and assets directory to old directory
if [ -d "$old_directory" ]; then
    rm -rf "$old_directory"/* || { echo "Failed to delete contents of old directory."; exit 1; }
    echo "Contents of old directory deleted successfully."
    mv "$destination_directory"/index.html "$destination_directory"/vite.svg "$destination_directory"/assets "$old_directory" || { echo "Failed to move files to old directory."; exit 1; }
    echo "index.html, vite.svg, and assets directory moved to $old_directory."
else
    echo "Old directory not found."
    exit 1
fi

# Step 3: Move contents of dist directory to destination directory
if [ -d "$dist" ]; then
    mv "$dist"/* "$destination_directory" || { echo "Failed to move contents of dist directory."; exit 1; }
    echo "Contents of dist directory moved to $destination_directory."
else
    echo "dist directory not found."
    exit 1
fi

echo "Build completed successfully."