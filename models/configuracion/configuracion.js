import mongoose from "mongoose";

const configInit = new mongoose.Schema(
  {
    ledVerde: {
      type: String
    },
    ledAmarillo: {
      type: String
    },
    ledRojo: {
      type: String
    },
    pot1: {
      type: String
    },
    pot2: {
      type: String
    },
    buzzer: {
      type: String
    },
    ultrasonico: { 
      type: String }
  },
  { timestamps: true, versionKey: false  } 
);

const ConfigInit = mongoose.model("ConfigInit", configInit, "ConfigInit");
export default ConfigInit;