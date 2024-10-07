# WordPress Dark Mode Plugin Automation Test Suite

This project contains an automated test suite for verifying the functionality of the WP Dark Mode plugin on a WordPress site using Playwright.

## Requirements

- Node.js
- Playwright
- WordPress site with admin access

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sborsha/Safia-Khatun_QA_WPPOOL-Assignment.git

## Test Cases
1. Log in to your WordPress site.
2. Check whether the “WP Dark Mode” Plugin is Active or not.
3. If Active, navigate to the WP Dark Mode & continue. Otherwise, Install the Plugin and Activate it.
4. Enable Admin Dashboard Dark Mode from Controls → Admin Panel Dark Mode.
5. Validate whether the dark mode is working or not on the Admin Dashboard.
6. Navigate to the WP Dark Mode.
7. From Customization → Switch Settings → Change the “Floating Switch Style” from the default selections (Select any one from the available options, except the default selected one).
8. From Customization → Switch Settings → Switch Customization - Select Custom Switch size & Scale it to 220.
9. From Customization → Switch Settings - Change the Floating Switch Position (Left).
10. Disable the Keyboard Shortcut from the Accessibility Settings.
11. From Customization → Site Animation → “Enable Page-Transition Animation” & change the Animation Effect from the default selections.
12. Validate whether the dark mode is working or not from the front end.
