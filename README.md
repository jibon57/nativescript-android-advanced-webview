[![npm](https://img.shields.io/npm/v/nativescript-android-advanced-webview.svg)](https://www.npmjs.com/package/nativescript-android-advanced-webview)
[![npm](https://img.shields.io/npm/dt/nativescript-android-advanced-webview.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-android-advanced-webview)

# NativeScript Android Advanced Webview

This plugin will allow you to use some of advance feature of Android Webview. This plugin is using following library

Android: [Android-AdvancedWebView
](https://github.com/delight-im/Android-AdvancedWebView
)

**Note:** I am not an expert of neigher iOS nor Android. So, please contribute if you think something you can do for better :) 

## Installation


```javascript
tns plugin add nativescript-android-advanced-webview
```

## Usage (Angular)

```javascript
registerElement("AdvanceWebview", () => require("nativescript-android-advanced-webview").AndroidAdvancedWebview);

ngAfterViewInit() {
    let advanceWebview: AndroidAdvancedWebview = this.page.getViewById("webview");

    let optons: AndroidAdvanceWebviewOptions = {
        android: {
            setGeolocationEnabled: false,
            setCookiesEnabled: true,
        }
    }

    advanceWebview.setWebviewOptions(optons);

    advanceWebview.on("started", function (res) {
        console.log("started");
        console.dir(res);
    })
    advanceWebview.on("finished", function (res) {
        console.log("finished");
        console.dir(res);
    })
}
 ```


Advance Configuration for WebViewClient or WebChromeClient class. You will need to implement your own customized override methods. You can do almost everything here :). You can install `tns-platform-declarations` for avoiding typescript error. Please check the demo for more details.

```javascript
advanceWebview.setUpWebViewClient(new MyWebViewTestClient()); //android.webkit.WebViewClient class
advanceWebview.setUpWebChromeClient(new MyWebChromeClient()); //android.webkit.WebChromeClient
```


HTML:
```javascript
<AdvanceWebview id="webview" src="https://google.com"></AdvanceWebview>
```

## API

**Events:** `started, finished, error, downloadRequested, externalPageRequest`

You can get more events by extending WebViewClient or WebChromeClient class like `onReceivedTitle`, `onPermissionRequest` (for allowing microphone) etc. This plugin also has some limitations too. You can check the library repository for more details.

```javascript 
    android?: {
        setGeolocationEnabled?: boolean;
        addHttpHeader?: {
            request: string;
            value: string;
        };
        addPermittedHostname?: string;
        preventCaching?: boolean;
        setThirdPartyCookiesEnabled?: boolean;
        setCookiesEnabled?: boolean;
        setMixedContentAllowed?: boolean;
        setDesktopMode?: boolean;
        loadHtml?: boolean;
    };
```
    Details here: https://github.com/delight-im/Android-AdvancedWebView
## License

MIT
