"use strict";

var client = {},
    util = require("util"),
    url = require("url");

client.connect = function (args) {

  if (!util.isObject(args)) {
    throw new Error(".connect accepts an object as argument");
  }

  if (typeof args.host !== "string") {
    throw new Error(".connect arguments needs a `host` string property");
  }

  if (typeof args.port !== "number") {
    throw new Error(".connect arguments needs a `port` number property");
  }

  if (typeof args.protocol !== "string") {
    args.protocol = "ws://";
  }

  args.slashes = true;

  console.log(url.format(args));
};

module.exports = client;