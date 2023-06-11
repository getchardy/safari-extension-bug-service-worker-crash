![Crash Screenshot](https://github.com/getchardy/safari-extension-bug-service-worker-crash/blob/main/crash.png?raw=true)

## Summary

This sample project reproduces a Safari Manifest 3 Browser Extension Service Worker crash.

See [demo.mp4](demo.mp4) for a screen recording of how to reproduce.

## Bug Details

The service worker will crash, related to the following conditions:

1. The extension is configured with a content script, and user has allowed the access.
1. The user has navigated to an extension page, e.g. `safari-web-extension://<uuid>/index.html`
1. Enough time has elapsed for service worker to be shut down (status = "not loaded")
1. When service work starts up, it will crash, resulting in status = "failed to load". It can take 2 unload/reload cycles for the crash to happen.

## How to reproduce

- Safari 16.4 (18615.1.26.110.1, 17615.1.26.101.10)
- Mac OS 13.3.1
- Xcode 14.1

### Step 1: Generate the Xcode project:

```
> scripts/generate.sh
```

### Step 2: Build the Mac App target:

```
> scripts/build.sh
```

Alternatively, you can build it using Xcode App.

### Step 3: Enable the Extension in Safari:

1. Open Safari
2. Allow Unsigned Extensions
3. Enable the "Test App" Extension in "Safari -> Settings... -> Extensions"

### Step 4: Make the service worker crash:

1. In "Safari -> Settings... -> Extensions -> Test App -> Edit Websites...". Set the value for `apple.com` to "Allow".
2. Open the Popup by clicking on the extension icon in the browser toolbar.
3. Click on the "Open Extension Page" button. This will open the extension's `index.html` page in a new tab. (It doesn't do anything, but is required for the crash to happen.)
4. Perform the following steps 2 times:
   1. Wait 30 seconds
   2. Click "Safari -> Develop -> Web Extension Background Content" and notice that Service Worker status is now "not loaded". (This is expected.)
   3. Open the Popup and click "Send Message" this will trigger the service worker to reload.

(Tip: If you leave the popup open while you wait, the crash will happen after just one unload/reload cycle.)

### Final Result:

The service worker fails to load and a crash error can be observed in Console App when searching for "reason=Crash".

### Expected Result:

The service worker should start back up normally without crashing.
