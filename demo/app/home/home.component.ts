import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page"
import { AndroidAdvancedWebview, AndroidAdvanceWebviewOptions } from "nativescript-android-advanced-webview";
import { registerElement } from "nativescript-angular";

registerElement("AdvanceWebview", () => AndroidAdvancedWebview);


@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(public page: Page) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    ngAfterViewInit() {
        let advanceWebview: AndroidAdvancedWebview = this.page.getViewById("webview");

        let optons: AndroidAdvanceWebviewOptions = {
            android: {
                setGeolocationEnabled: false,
                setCookiesEnabled: true,
            }
        }

        advanceWebview.setUpWebViewClient(new MyWebViewTestClient());
        advanceWebview.setUpWebChromeClient(new MyWebChromeClient());
        advanceWebview.setWebviewOptions(optons);

        advanceWebview.on("started", function (res) {
            console.log("got start");
            console.dir(res);
        })
        advanceWebview.on("finished", function (res) {
            console.log("got finish");
            console.dir(res);
        })
    }
}

export class MyWebViewTestClient extends android.webkit.WebViewClient {

    constructor() {
        super();
        return global.__native(this);
    }
    public onPageStarted(view: android.webkit.WebView, url: string, favicon: android.graphics.Bitmap): void {
        console.log("onPageStarted: " + url);
    }
    public onPageFinished(view: android.webkit.WebView, url: string): void {
        console.log("onPageFinished");
    }
    public onReceivedError(view: android.webkit.WebView, request, error): void {
        console.log("onReceivedError");
    }
}

export class MyWebChromeClient extends android.webkit.WebChromeClient {

    constructor() {
        super();
        return global.__native(this);
    }

    public onReceivedTitle(view: android.webkit.WebView, title: string): void {
        console.log(title);
    }

    public onPermissionRequest(request: any): void {
        console.log("Permission asked !!");
        request.grant(request.getResources());
    }
}
