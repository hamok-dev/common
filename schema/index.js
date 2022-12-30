import fs from "fs";
import { exec } from 'child_process';

const GEN_OUTPUT = "./gen-out";
const MODELS_PROTO_PATH = "./protos/models.proto";

async function createJavaModels() {
    await new Promise((resolve, reject) => {
        const command = [
            `protoc`,
            `--java_out=${GEN_OUTPUT}`,
            MODELS_PROTO_PATH,
        ].join(" ");
        exec(command, (error, stdout, stderr) => {
            if (error) reject(error);
            else resolve();
        });
    });
    return fs.readFileSync(
        `${GEN_OUTPUT}/io/github/hamok/dev/schema/Models.java`
    )
}

async function createTypescriptModels() {
    await new Promise((resolve, reject) => {
        const command = [
            `PATH=$PATH:$(pwd)/node_modules/.bin`,
            `protoc`,
            // `./node_modules/.bin/protoc-gen-es`,
            `-I . `,
            `--es_out ${GEN_OUTPUT}`,
            `--es_opt target=ts`,
            MODELS_PROTO_PATH
        ].join(" ");
        exec(command, (error, stdout, stderr) => {
            if (error) reject(error);
            else resolve();
        });
    });
    return fs.readFileSync(
        `${GEN_OUTPUT}/protos/models_pb.ts`
    )
}

async function writeToNpmLib(generatedCode) {
    fs.writeFileSync(`../npm-lib/src/Models.ts`, generatedCode);
    const mainPackageText = fs.readFileSync("./package.json");
    const mainPackageJson = JSON.parse(mainPackageText);
    let npmPackageText = fs.readFileSync("../npm-lib/package.json");
    const npmPackageJson = JSON.parse(npmPackageText);
    npmPackageJson["version"] = mainPackageJson["version"];
    npmPackageText = JSON.stringify(npmPackageJson, null, 2);
    fs.writeFileSync("../npm-lib/package.json", npmPackageText);
}

async function writeToJavaLib(generatedCode) {
    fs.writeFileSync(`../java-lib/Models.java`, generatedCode);    
}

async function main() {
    const [javaCode, typescriptCode] = await Promise.all([
        createJavaModels(),
        createTypescriptModels()
    ]);
    await Promise.all([
        writeToJavaLib(javaCode),
        writeToNpmLib(typescriptCode),
    ]);
}

main().then(() => {
    console.info("Done")
    process.exit(0);
}).catch(err => {
    console.error("Error occurred", err);
    process.exit(1);
}).finally(() => {
    
})