from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:4173")
    page.wait_for_timeout(1000)

    # Click on website input
    inputs = page.locator("input").all()
    print("Found inputs:", len(inputs))
    for i, inp in enumerate(inputs):
        print(f"Input {i}: placeholder={inp.get_attribute('placeholder')}, type={inp.get_attribute('type')}")

    buttons = page.locator("button").all()
    print("Found buttons:", len(buttons))
    for b in buttons[:10]:
        print("Button text:", b.inner_text().strip())

    page.locator("form input").first.fill("https://example.com")
    page.wait_for_timeout(500)
    page.locator("form button[type='submit']").click()
    page.wait_for_timeout(1000)

    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
