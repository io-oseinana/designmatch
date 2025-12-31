import {NextResponse} from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const type = searchParams.get('type') || 'desktop';

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
            desktop: { width: 1920, height: 1080 },
            tablet: { width: 768, height: 1024 },
            mobile: { width: 375, height: 812 },
        };

        const { width, height } = viewports[type as keyof typeof viewports] || viewports.desktop;

        await page.setViewport({ width, height });

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

        const imageBuffer = await page.screenshot({ encoding: 'base64' });

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