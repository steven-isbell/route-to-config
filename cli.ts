#!/usr/bin/env node

import program, { CommanderStatic } from "commander";
import fs from 'fs';

import { parseRoutes, validateFile, writeRouteConfig } from "./utils";
import { RouteConfig, ValidateFileOutput } from "./@types";
import packageJson from './package.json';
import buildImportList from "./utils/buildImportList";

program
  .version(packageJson.version)
  .option("-S, --source [file]", "The file to convert.")
  .option(
    "-O, --output-file [fileName]",
    "The name of the output file. Defaults to routes.js."
  )
  .option(
    "-P, --output-path [directoryPath]",
    "The output path. Defaults to the directory command was executed in."
  )
  .parse(process.argv);

(function main({ source, outputFile, outputPath }: CommanderStatic): void {
  const actualOutputFile = outputFile || 'routes.js';
  try {
    const { isValid, error }: ValidateFileOutput = validateFile(source);
    if (!isValid) throw new Error(error);
    const parsedFile: string = fs.readFileSync(source, 'utf8');
    const importList: string | undefined = buildImportList(parsedFile);
    const routeConfig: RouteConfig[] = parseRoutes(parsedFile);
    const outputLocation: string = outputPath ? `${outputPath}/${actualOutputFile}`.replace(/\/\//g, '/') : `${process.cwd()}/${actualOutputFile}`;
    const outputData: string = importList ? `${importList}

${JSON.stringify(routeConfig)}` : JSON.stringify(routeConfig);
    writeRouteConfig(outputLocation, outputData);
  } catch (e) {
    console.error(e.message);
    process.exit(2);
  }
})(program);