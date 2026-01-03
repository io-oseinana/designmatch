import {NextResponse} from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const type = searchParams.get('type') || 'desktop';
    const widthParams = searchParams.get('width');
    const heightParams = searchParams.get('height');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    let browser;

    try {
        // Launch a headless browser to take a screenshot
        if (process.env.NODE_ENV === 'production') {
            // Production (Cloud): Use lightweight Chromium
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
            });
        } else {
            // Local Development: Use full Puppeteer (dynamically imported to avoid bundling in prod)
            const localPuppeteer = await import("puppeteer");
            browser = await localPuppeteer.default.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
        }

        const page = await browser.newPage();

        // Viewport for breakpoints
        const viewports = {
            desktop: { width: 1440, height: 1080 },
            tablet: { width: 768, height: 1024 },
            mobile: { width: 375, height: 812 },
        };

        let { width, height } = viewports[type as keyof typeof viewports] || viewports.desktop;

        if (widthParams) width = parseInt(widthParams, 10);
        if (heightParams) height = parseInt(heightParams, 10);

        await page.setViewport({ width, height });

        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        // Scroll to bottom to trigger lazy loading images
        await page.evaluate(async () => {
            await new Promise<void>((resolve) => {
                let totalHeight = 0;
                const distance = 200; // Scroll distance per step
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100); // Scroll every 100ms
            });
        });

        // Wait a brief moment for images to render after scrolling
        await new Promise(resolve => setTimeout(resolve, 10000 /* 10 seconds wait to avoid some lazy load issues */));

        const imageBuffer = await page.screenshot({ encoding: 'base64', fullPage: true });

        return NextResponse.json({
            image: `data:image/png;base64,${imageBuffer}`
        });

    } catch (error: any) {
        console.error('Screenshot failed:', error);
        return NextResponse.json({ error: error.message || 'Failed to capture screenshot' }, { status: 500 });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}