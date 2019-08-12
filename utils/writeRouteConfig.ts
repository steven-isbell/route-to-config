// import fs from 'fs';

function writeRouteConfig(outputLocation: string, data: string) {
  // fs.writeFileSync(outputLocation, data);
  console.log(`File written to ${outputLocation}`, data);
  process.exit(1);
}

export default writeRouteConfig;