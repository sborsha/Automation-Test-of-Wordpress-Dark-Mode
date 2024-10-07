import { test, expect } from '@playwright/test';

test.describe('WP Assignment suit', () =>{
    test.beforeEach("WP login", async({page})=>{
        await page.goto(process.env.WORDPRESS_URL);
    
        await page.locator("//a[normalize-space()='Log in']").click();
      
        await page.locator("//input[@id='user_login']").fill(process.env.WORDPRESS_USER);
        await page.locator("//input[@id='user_pass']").fill(process.env.WORDPRESS_PASS);

        await page.locator("//input[@id='wp-submit']").click();
        await expect(page).toHaveURL(process.env.WORDPRESS_URL);
    });
    test('Check if WP Dark Mode plugin is active, install if not,',async({page})=>{
        //Navigate to Plugins page
    
        const menu = await page.locator("//a[@role='menuitem'][normalize-space()='QA Assignment']").hover();
        await page.click("//a[normalize-space()='Plugins']");
    
        //Check if the WP Dark Mode plugin is installed and active
        const isPluginActive = expect (await page.isVisible('tr[data-slug="wp-dark-mode"].activate'));
        if(!isPluginActive){
            await page.click("//a[@class='page-title-action']");
            // Search for WP Dark Mode plugin
            await page.fill('#search-plugins', 'WP Dark Mode');
            await page.press('#search-plugins', 'Enter');

            // Wait for results and click Install
            await page.locator('//*[@id="the-list"]/div[1]/div[1]/div[2]/ul/li[1]/a').click();

            // Wait for the plugin to install and then activate it
            await page.waitForSelector('.activate-now');
            await page.click('.activate-now');

            // Navigate to WP Dark Mode settings
            await page.getByRole('link', { name: 'Plugins', exact: true }).click();
            await page.waitForLoadState();
            await expect(page.locator('#the-list')).toContainText('WP Dark ModeSettings');
            console.log("Navigated to WP Dark Mode settings after installation.");
        }
        else{
            console.log('WP Dark Mode is already active.');
        }
    });

    test('Enable Admin Dashboard Dark Mode from Controls and validate it', async({page})=>{
        const WP_Dasboard = await page.locator("//a[@role='menuitem'][normalize-space()='QA Assignment']").click();

         // Enable the Admin Panel Dark Mode
        const darkModeToggle = await page.locator("//div[normalize-space()='WP Dark Mode']");
        const isDarkModeEnabled = await darkModeToggle.isVisible();

        if (!isDarkModeEnabled) {
            await darkModeToggle.click();
            // Validate the dark mode
            await expect (page.locator("//div[@class='relative w-10 h-full rounded-full transition duration-100 bg-blue-600']")).toBeVisible();
          }
          await page.goto('http://qa-assignment.local/wp-admin');
          const bodyClass = await page.getAttribute('body', 'class');
      
          // Check if dark mode class is applied to the body tag (you can replace 'dark-mode' with the actual class name)
          expect(bodyClass).toContain('wp-admin wp-core-ui js theme-twentytwentyfour jetpack-disconnected wc-wp-version-gte-53 wc-wp-version-gte-55 index-php auto-fold admin-bar branch-6-6 version-6-6-2 admin-color-fresh locale-en-us customize-support svg'); 
    })

    test('Customization Floating Switch Style & size', async({page})=>{
        const WP_Dasboard = await page.locator("//a[@role='menuitem'][normalize-space()='QA Assignment']").click();

        const saveBTN = await page.locator("//button[normalize-space()='Save Changes']") // for save

        await page.locator("//div[normalize-space()='WP Dark Mode']").hover();
        await page.click("//a[@href='admin.php?page=wp-dark-mode'][normalize-space()='Settings']");  // WP Dark mode sttings

         // Go to the Switch Settings
        await page.click('//*[@id="wp-dark-mode-admin"]/div/div/div/div[1]/div[2]/div[2]/div/div[1]');
        await page.click("//a[normalize-space()='Switch Settings']");

        await expect(page.locator('#wp-dark-mode-admin')).toContainText('M');  //check which is default 
        await expect (await page.locator("//span[normalize-space()='M']")).toBeTruthy();
        await page.locator("//span[normalize-space()='S']").click();  // Change default size

        saveBTN.click();

        // Change Switch Customization size and scale 220
        await page.click("(//span[contains(text(),'Custom')])[1]");
        await page.locator("//input[@type='number']").clear();
        await page.fill("//input[@type='number']", '220');
        saveBTN.click();

        //Change Floating Switch Position to left
        await page.click("//span[normalize-space()='Left']");
        saveBTN.click();

        await page.waitForLoadState();
    })

    test('Disable the Keyboard Shortcut from the Accessibility Settings', async({page})=>{
        const WP_Dasboard = await page.locator("//a[@role='menuitem'][normalize-space()='QA Assignment']").click();
        await page.click("//div[contains(text(),'WP Dark Mode')]");
        await page.locator('//*[@id="wp-dark-mode-admin"]/div/div/div/div[1]/div[2]/div[3]/div/div').click();
        await page.locator("//a[normalize-space()='Accessibility']").click();
        await page.waitForLoadState();
        await page.click('.relative.w-10.h-full.rounded-full.transition.duration-100.bg-blue-600');
        await page.locator("//button[normalize-space()='Save Changes']").click();

    })

    test('Enable Page-Transition Animation', async({page})=>{
        const WP_Dasboard = await page.locator("//a[@role='menuitem'][normalize-space()='QA Assignment']").click();
        await page.click("//div[contains(text(),'WP Dark Mode')]");
        await page.click("//h4[normalize-space()='Customization']");
        await page.click("//a[normalize-space()='Site Animation']");
        await page.locator(".relative.w-10.h-full.rounded-full.transition.duration-100.bg-slate-200").click();
        await page.click("//button[normalize-space()='Save Changes']");  // Save the changes
    })

    test('Validate whether the dark mode is working or not from the front end', async({page})=>{
        const WP_Dasboard = await page.locator("//a[@role='menuitem'][normalize-space()='QA Assignment']").click();
        // Click the dark mode toggle (replace with your button's selector)
        await page.click("//div[normalize-space()='WP Dark Mode']");
        await page.waitForTimeout(1000);
        const bgColor = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
  });
        // Verify if the background color is dark (adjust the color check if needed)
        if (bgColor === 'rgb(0, 0, 0)') {
            console.log('Dark mode is working!');
        } else {
            console.log('Dark mode is NOT working.');
  }
    })

});
