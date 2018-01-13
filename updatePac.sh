#!/bin/sh

################################################################################
# Script to update PAC configuration by turning system PAC proxy off and on
################################################################################

networksetup -setautoproxystate Wi-Fi off # This option is undocumented in manpage
networksetup -setautoproxyurl   Wi-Fi "file:///Users/twofywyang/git/pac/proxy.pac"
