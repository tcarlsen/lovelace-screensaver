# :framed_picture: Lovelace Screensaver

> A lovely screensaver for your Home Assistant setup, using images from [Unsplash](https://unsplash.com/). Perfect for a allways on home panel diplay!

## Installation

1. You will need a Access Key from Unsplash for this plugin to work

    - Head over to [Unsplash registration page](https://unsplash.com/join) and fill out the form

    - After you have registered and confirmed your email head over to your [apps](https://unsplash.com/oauth/applications) page and click "New Application". Read and accept all the terms. Give your new app a name *(lovelace-screensaver)*, a description *(small script using unsplash images as a screensaver on home assistant)* and click "Create application"

    - On the next page you will see your "Access Key". Add this to your `secrets.yaml`. Don't have a `secrets.yaml`??? You should! read about it here: [home-assistant.io/docs/configuration/secrets](https://www.home-assistant.io/docs/configuration/secrets/)

2. Your now ready to add the script to your system

    - Go copy  `dist/lovelace-screensaver.js` to `www/custom-lovelace/lovelace-screensaver/`

    - And lastly you need to add the following lines of code to your `ui-lovelace.yaml`

```yaml
resources:
  - url: /local/custom-lovelace/lovelace-screensaver/lovelace-screensaver.js
    type: js

screensaver:
  unsplash_access_key: !secret unsplash_access_key
```

## Configuration

Configuration of this plugin is done via your `ui-lovelace.yaml` in the property `screensaver` you created in the installation:

| property            | description                                                | default |
| ------------------- | ---------------------------------------------------------- | ------- |
| unsplash_access_key | **!required** see installation guide to get your key       | nature  |
| query     | search terms for the type of images you want                         | nature  |
| idle_time | the time in minutes you want the screensaver to wait before starting | 10      |

**Example:**

```yaml
screensaver:
  unsplash_access_key: !secret unsplash_access_key
  query: animals
  idle_time: 5
```

---
<a href="https://www.buymeacoffee.com/tcarlsen" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
