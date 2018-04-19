import { View, Property } from "tns-core-modules/ui/core/view";

export declare class Common extends View {
    constructor();
}
export declare class AndroidAdvancedWebview extends Common {
    setUpWebViewClient?(value: any): void;
    setUpWebChromeClient?(value: any): void;
    setWebviewOptions?(options: AndroidAdvanceWebviewOptions): void;
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
