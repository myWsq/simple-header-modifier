<p align="center">
  <img width="160" src="./static/logo.svg"></img>
</p>

<h1 align="center">Simple Header Modifier</h1>

<div align="center">

![Badge](https://img.shields.io/github/v/release/myWsq/simple-header-modifier)
![Badge](https://img.shields.io/badge/Chrome-96%2B-blue?logo=Google-chrome&logoColor=white)
![Badge](https://img.shields.io/github/license/myWsq/simple-header-modifier)

</div>

<p align="center">
A lightweight chrome extension that allows you to easily add custom headers to requests. 
</p>

<div align="center" style="display: flex!important;">
    <img width="400" src="./static/screenshot-1.png"></img>
    <img width="400" src="./static/screenshot-2.png"></img>
</div>

## Install

- [Download](https://github.com/myWsq/simple-header-modifier/releases) the last version zip file and unzip it to a folder.

- Open `chrome://extensions` and turn on the **Developer mode** in top right.

- Click the **Load unpacked extension** button and select the unzipped folder to install it.

- Enjoy it!

## Note 

Simple Header Modifier modified your request headers and get feedback through the [declarativeNetRequest API](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest). However, the [`onRuleMatchedDebug`](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#event-onRuleMatchedDebug) method is only available for unpacked extensions. This is the reason why this extension cannot be installed by store.

## License

MIT License Copyright (c) 2022 Shuaiqi Wang
