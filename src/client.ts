
import { callErrorFromStatus } from "@grpc/grpc-js/build/src/call";
import {port} from "./server"
let grpc = require("@grpc/grpc-js");
let protoLoader = require("@grpc/proto-loader");

const definition = protoLoader.loadSync(__dirname+"/../protofiles/user.proto");
const packages = grpc.loadPackageDefinition(definition);
const userPackage = packages.userPackage;
const client = new userPackage.User(`0.0.0.0:${port}`, grpc.credentials.createInsecure())
const input = {
    oldPassword : "old",
    newPassword : "new",
    confirmPassword : "new"
};

var deadlineExceeded = false;
var timeout_in_seconds = 15;
var timeout = new Date().setSeconds(new Date().getSeconds() + timeout_in_seconds);
var call = client.accountChangePassword(input,{deadline:timeout}, (err:any,res:any)=>{
    if (err){
        console.log(err.code, err.details);
        deadlineExceeded = true;
        return;
    }
    console.log(res?.reply);
    console.log("Response received.");
    return;
});
if (deadlineExceeded){
    call.cancel();
}


`const input1 = {
    newPassword : "new1",
    confirmPassword : "new1"
};

client.accountResetPassword(input1, {deadline:timeout}, (err,res)=>{
    if (err){
        console.log(err);
        return;
    }
    console.log(res?.reply);
    console.log("Response received.")
    return;
})`
