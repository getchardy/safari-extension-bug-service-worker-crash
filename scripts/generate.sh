#!/bin/sh

echo "Cleaning safari dir"
rm -rf safari

echo "Generating xcodeproj"
yes | xcrun safari-web-extension-converter \
  --app-name "Test App" \
  --project-location safari/Test\ App \
  --bundle-identifier "com.anonyome.safariTestApp" \
  --force \
  --swift \
  --no-open \
  src
