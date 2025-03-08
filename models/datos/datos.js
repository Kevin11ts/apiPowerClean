import mongoose from "mongoose";

const data = new mongoose.Schema(
    {
      sensor: {
        type: String
      },
      unidad:
      {
          type:String
      },
      valor:{
          type: String
      }
    },
    {
      timestamps: true, 
      versionKey: false 
    }
  );
  
  const Data = mongoose.model("Data", data, "Data");
  
  export default Data; 