// basic
export import _ = require("lodash");
export import bluebird = require("bluebird");
export import child = require("child_process");
export import path = require("path");

// helpers
export import Ajv = require("ajv");
export import Collections = require("typescript-collections");
export import S = require("string");
export import colors = require("colors");
export import crypto = require("crypto");
export import cryptoJS = require("crypto-js");
export import express = require("express");
export import ibantools = require("ibantools");
export import moment = require("moment");
export import ms = require("milliseconds");
export import request = require("request");
export import util = require("util");
export import uuid = require("node-uuid");
export import validatePolish = require("validate-polish");
export import validator = require("validator");
export import winston = require("winston");
export import yargs = require("yargs");

// definitions
export import i18n = require("i18n");
export import SocketIO = require("socket.io");

// service libraries
export import nodemailer = require("nodemailer");

// no-ts libraries
/* tslint:disable:no-var-requires */
export const PrettyError = require("pretty-error");
export const SMSAPI = require("smsapi");
export const CircularJSON = require("circular-json");
export const CliTable = require("cli-table2");

// json data
export const packagejson = require("../../package.json");
/* tslint:enable */

// promisified libraries
export import jsonwebtokenL = require("jsonwebtoken");
export const jsonwebtokenLib = jsonwebtokenL;
export const jsonwebtoken = bluebird.promisifyAll(jsonwebtokenL);

import * as fsL from "fs";
export const fsLib = fsL;
export const fs = bluebird.promisifyAll(fsL);

import * as soapL from "soap";
export const soapLib = soapL;
export const soap = bluebird.promisifyAll(soapL);

// configs
export * from "../config";

// libraries
export * from "../lib";

// commons
export * from "../common";

// interfaces
export * from "../interfaces";

// game abstract classes and class interfaces
export * from "../classes";

// game model classes
export * from "../game";

// services
export * from "../services";
