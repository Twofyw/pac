// My manually maintained personal PAC file
// I have two proxies at hand:
// 1. Purchased from rixCloud which has a quota of 40GB (maybe 20GB next year).
// 2. Private DigitalOcean free Droplet from GitHub education pack through kcptun.

var rixcloud = "SOCKS5 127.0.0.1:1086";
var digitalocean = "SOCKS5 127.0.0.1:1085";

// Direct access list in shell expression
var whitelist = [
  ".twofyw.me",
  ".yinxiang.com",
  ".baidu.com",
];

function isWhiteList(url, host) {
  // Add more localhosts in the future
  // How to match ip address?

  if (isPlainHostName(host) || shExpMatch(host, "*.cn")) {
    return true;
  }

  // Skip ip addresses
  if (shExpMatch(host, "[0-9]*.[0-9]*.[0-9]*.[0-9]*")) {
    return true;
  }

  // Search for hosts in the array whitelist
  for (var i = 0; i < whitelist.length; i++) {
    if (dnsDomainIs(host, whitelist[i])) {
      return true;
    }
  }
  return false;
}

function isYouTube(url, host) {
  if (dnsDomainIs(host, ".youtube.com") || shExpMatch(url, "*.googlevideo.com/*")) {
    return true;
  }
}



function FindProxyForURL(url, host) {
  // Skip local hosts and other white lists
  if (isWhiteList(url, host)) {
    return "DIRECT";
  }
  // Watch YouTube with DigitalOcean's (almost) unlimited network usage
  // And all other networking goes through rixCloud
  if (isYouTube(url, host)) {
    return digitalocean;
  } else {
    return rixcloud;
  }
}
