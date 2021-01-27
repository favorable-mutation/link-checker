## Link Checker

> DISCLAIMER: This application is currently configured for
> https://pages.github.ccs.neu.edu/jhemann/21SP-CS4400/ ONLY. You will need to
> manually adapt it to your needs in order to use it for any other site.

In order to set this application up to receive GitHub Webhooks on GitHub Pages
deploy events (and have it check your published site for dead links), follow
these steps:

1. Open the repo in your browser
2. Go to `Settings > Hooks > Add Webhook`
3. Enter https://agile-woodland-90288.herokuapp.com/check for the `Payload URL`
4. Switch the `Content Type` to `application/json`
5. Under `Which events would you like to trigger this webhook?` choose `Let me select individual events`
6. Deselect `Pushes` and select `Page Builds`
7. Scroll to the bottom and click `Add Webhook`
