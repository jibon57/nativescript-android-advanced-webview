import { Observable } from 'tns-core-modules/data/observable';
import { View, Property } from "tns-core-modules/ui/core/view";

export class Common extends View {
    constructor() {
        super();
    }
}

export const srcProperty = new Property<Common, string>({
    name: 'src',
    defaultValue: ''
});
srcProperty.register(Common);

export interface AndroidAdvanceWebviewOptions {
    android?: {
        setGeolocationEnabled?: boolean;
        addHttpHeader?: {
            request: string;
            value: string
        };
        addPermittedHostname?: string;
        preventCaching?: boolean;
        setThirdPartyCookiesEnabled?: boolean;
        setCookiesEnabled?: boolean;
        setMixedContentAllowed?: boolean;
        setDesktopMode?: boolean;
        loadHtml?: boolean;
    }
}
