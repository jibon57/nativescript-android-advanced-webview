import { Common, srcProperty, AndroidAdvanceWebviewOptions } from './android-advanced-webview.common';
import * as app from "tns-core-modules/application"
declare var im;

const AdvancedWebView = im.delight.android.webview.AdvancedWebView;
const Listener = im.delight.android.webview.AdvancedWebView.Listener;

export class AndroidAdvancedWebview extends Common {
    private _src: string;
    private _webViewClientClass: any;
    private _webChromeClientClass: any;
    private _webViewOptions: AndroidAdvanceWebviewOptions = {
        android: {
            loadHtml: false
        }
    };

    get android() {
        return this.nativeView;
    }
    public createNativeView() {
        const webview = new AdvancedWebView(this._context);
        return webview;
    }

    public setUpWebViewClient(value: any) {
        this._webViewClientClass = value;
    }

    public setUpWebChromeClient(value: any) {
        this._webChromeClientClass = value;
    }

    public setWebviewOptions(options: AndroidAdvanceWebviewOptions) {
        this._webViewOptions = options;
    }

    [srcProperty.setNative](value: string) {
        this._setSrcProperty(value);
    }

    private _setSrcProperty(value: string) {
        this._src = value;
        var ref = new WeakRef(this);
        var t = this;

        this.nativeView.setListener(app.android.foregroundActivity, new Listener({
            get owner() {
                return ref.get();
            },
            onPageStarted: function (url: string, favicon: android.graphics.Bitmap) {
                t.notify({
                    eventName: "started",
                    object: t,
                    url: url,
                    favicon: favicon
                })
            },
            onPageFinished: function (url: string) {
                t.notify({
                    eventName: "finished",
                    object: t,
                    url: url,
                })
            },
            onPageError: function (errorCode: string, description: string, failingUrl: string) {
                t.notify({
                    eventName: "error",
                    object: t,
                    errorCode: errorCode,
                    description: description,
                    failingUrl: failingUrl
                })
            },
            onDownloadRequested: function (url: string, suggestedFilename: string, mimeType: string, contentLength: string, contentDisposition: string, userAgent: string) {
                t.notify({
                    eventName: "downloadRequested",
                    object: t,
                    url: url,
                    suggestedFilename: suggestedFilename,
                    mimeType: mimeType,
                    contentLength: contentLength,
                    contentDisposition: contentDisposition,
                    userAgent: userAgent
                })
            },
            onExternalPageRequest: function (url: string) {
                t.notify({
                    eventName: "externalPageRequest",
                    object: t,
                    url: url,
                })
            }
        }));
        let options = this._webViewOptions.android;

        options.setGeolocationEnabled ? this.nativeView.setGeolocationEnabled(true) : this.nativeView.setGeolocationEnabled(false);

        options.setThirdPartyCookiesEnabled ? this.nativeView.setThirdPartyCookiesEnabled(true) : this.nativeView.setThirdPartyCookiesEnabled(false);

        options.setCookiesEnabled ? this.nativeView.setCookiesEnabled(true) : this.nativeView.setCookiesEnabled(false);

        options.setMixedContentAllowed ? this.nativeView.setMixedContentAllowed(true) : this.nativeView.setMixedContentAllowed(false);

        options.setDesktopMode ? this.nativeView.setDesktopMode(true) : this.nativeView.setDesktopMode(false);

        if (options.addHttpHeader) {
            this.nativeView.addHttpHeader(options.addHttpHeader.request, options.addHttpHeader.value);
        }
        if (options.addPermittedHostname) {
            this.nativeView.addPermittedHostname(options.addPermittedHostname);
        }

        let preventCaching: boolean = true;
        if (!options.preventCaching) {
            preventCaching = false;
        }

        if (this._webViewClientClass) {
            this.nativeView.setWebViewClient(this._webViewClientClass);
        }
        if (this._webChromeClientClass) {
            this.nativeView.setWebChromeClient(this._webChromeClientClass);
        }

        if (options.loadHtml) {
            this.nativeView.loadHtml(value);
        } else {
            this.nativeView.loadUrl(value, preventCaching);
        }

    }

}

