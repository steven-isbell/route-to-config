#!/usr/bin/env node

import program, { CommanderStatic } from "commander";
import fs from 'fs';

import { parseRoutes, validateFile, writeRouteConfig } from "./utils";
import { RouteConfig, ValidateFileOutput } from "./@types";

program
  .version("0.0.1")
  .option("-S, --source [file]", "The file to convert.")
  .option(
    "-N, --output-file [fileName]",
    "The name of the output file. Defaults to routes.js."
  )
  .option(
    "-P, --output-path",
    "The output path. Defaults to the directory command was executed in."
  )
  .parse(process.argv);

(function main({ source, outputHelp, outputFile, outputPath }: CommanderStatic): void {
  try {
    const { isValid, error }: ValidateFileOutput = validateFile(source);
    if (!isValid) throw new Error(error);
    const parsedFile: string = fs.readFileSync(source, 'utf8');
    const routeConfig: RouteConfig[] = parseRoutes(parsedFile);
    const outputLocation: string = outputPath ? `${outputPath}${outputFile}` : `${__dirname}${outputFile}`;
    writeRouteConfig(outputLocation, JSON.stringify(routeConfig));
  } catch (e) {
    console.error(e.message);
    outputHelp();
    process.exit(2);
  }
})(program);

/**
 * @todo Add Readme with examples
 */
