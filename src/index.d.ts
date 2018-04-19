import { View, Property } from "tns-core-modules/ui/core/view";
import { Common, AndroidAdvanceWebviewOptions } from './android-advanced-webview.common';

export declare class AndroidAdvancedWebview extends Common {
    private _src;
    private _webViewClientClass;
    private _webChromeClientClass;
    private _webViewOptions;
    readonly android: any;
    createNativeView(): any;
    setUpWebViewClient(value: any): void;
    setUpWebChromeClient(value: any): void;
    setWebviewOptions(options: AndroidAdvanceWebviewOptions): void;
    private _setSrcProperty(value);
}

export declare const srcProperty: Property<Common, string>;
export interface AndroidAdvanceWebviewOptions {
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
}
