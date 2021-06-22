---
title:  "[QuickTips] List your keystore contents"
date:   2018-02-01 17:47:00
category: Development
tags: [quicktips, development, mobile, android, java, keystore, jks]
image: assets/img/09.jpg
background: "#353b48"
---

This is one is a blazing fast tip, did you ever stumble in a .jks (keystore) file from a client while trying to submit to Google Play that precious app you just finished? Well sometimes, or always.... who knows, your client simply does not have the alias name and has a list of possible passwords.

<br/>

<iframe src="https://giphy.com/embed/3og0INyCmHlNylks9O" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/reactionseditor-classic-facepalm-3og0INyCmHlNylks9O">via GIPHY</a></p>

<br/>

One tip that should make things easier is listing aliases inside the .jks, just try the following `keytool -list -keystore keystore_name.jks` in a terminal, something like this will popout

```
Keystore type: JKS
Keystore provider: SUN

Your keystore contains 1 entry

alias name, DAY-MONTH-YEAR, PrivateKeyEntry,
Certificate fingerprint (SHA1): SHA_VALUE
```