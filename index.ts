import program, { CommanderStatic } from "commander";
import fs from 'fs';
import validateFile from "./utils/validateFile";
import { ValidateFile } from "./@types";

program
  .version("0.0.1")
  .option("-s, --source [file]", "The file to convert.")
  .option(
    "-n, --output-file [fileName]",
    "The name of the output file. Defaults to routes.js."
  )
  .option(
    "-p, --path",
    "The output path. Defaults to the directory command was executed in."
  )
  .parse(process.argv);

export default function main({ source, outputHelp }: CommanderStatic): void {
  try {
    const { isValid, error }: ValidateFile = validateFile(source);
    if(!isValid) throw new Error(error);
  } catch (e) {
    console.error(e.message);
    outputHelp();
    process.exit(2);
  }
}
