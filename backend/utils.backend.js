
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const applyAuthMethods = async(schema) => {
  schema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      console.log("🔐 Hashing password for", this.email); 
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
  

  schema.methods.comparePassword = async function (candidatePassword) {
    console.log("Candidate Password" , candidatePassword , "this.password" , this.password)
    let result = await bcrypt.compare(candidatePassword, this.password);
    console.log("result = " , result) 
    return bcrypt.compare(candidatePassword, this.password);
  };

  schema.methods.generateAccessToken = function () {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        isAdmin: this.isAdmin || false, 
      },
      process.env.accessTokenSecret,
      {
        expiresIn: process.env.accessTokenExpiry,
      }
    );
  };
};
