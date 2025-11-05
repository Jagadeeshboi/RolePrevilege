const mongoose=require("mongoose");

const organisationAdminSchema=new mongoose.Schema({
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false, default: "" },
    otp: { type: Number, required: false },
    otpVerified: { type: Boolean, default: false, required: false },
    status: { type: String, default: "Active", required: false },
    name: { type: String, default: "Organisation Admin" },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "roles" }],
    
},
  { timestamps: true }
)

const organisationadmin=mongoose.model("organisationadmin",organisationAdminSchema);


const rolesSchema=new mongoose.Schema({
        roleName: { type: String, required: false, unique: true },
    status: { type: String, default: "Active", required: false },
        modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "modules" }],
    
},
  { timestamps: true })

const roles=mongoose.model("roles",rolesSchema);


const moduleSchema=new mongoose.Schema({
    moduleName: { type: String, required: false, unique: true },
    status: { type: String, default: "Active", required: false },
        priveleages: [{ type: mongoose.Schema.Types.ObjectId, ref: "priveleages" }],
    
},
  { timestamps: true })

const modules=new mongoose.model("modules",moduleSchema);


const privelagesSchema=new mongoose.Schema({
    priveleageName: { type: String, required: false, unique: true },
    status: { type: String, default: "Active", required: false },
         slug: [{ type: mongoose.Schema.Types.ObjectId, ref: "slug" }],

    
},
  { timestamps: true })

const priveleages=new mongoose.model("priveleages",privelagesSchema);




const slugSchema=new mongoose.Schema({
    name: { type: String, required: false, unique: true },
    slugName: { type: String, required: false, unique: true },
    status: [{ type: String, default: "Active", required: false }],
    
},
  { timestamps: true })

const slug=new mongoose.model("slug",slugSchema);



module.exports={organisationadmin,roles,modules,priveleages,slug};

