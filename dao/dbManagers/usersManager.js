import userModel from '../models/userModel.js';

export default class Users {
	getAll = async () => {
			const users = await userModel.find().lean();
			return users;
		};
	getByEmail = async (email) => {
		const user = await userModel.findOne({ email }).lean();
		return user;
	};
  createUser = async (user) => {
    const result = await userModel.create(user);
    return result;
  };
  updateOne = async (email, user) => {
    const result = await userModel.updateOne({ email }, user);
    return result;
  };

  updateUserRole = async (uid, role) => {
    const user = await userModel.findOneAndUpdate(
      { _id: uid },
      { $set: { role: role } },
      { new: true }
    ).lean();
  
    if (!user) throw new Error("User not found");
  
    if (role === "PREMIUM") {
      const requiredDocuments = ["identification", "account_state", "address"];
      const hasRequiredDocuments = requiredDocuments.every(doc => user.documents.includes(doc));
      
      if (!hasRequiredDocuments) {
        throw new Error("The user must have the identification, account_state, and address documents");
      }
    }
  
    return user;
  };
  
  updateUserDocument = async (uid, files) => {
    const http = "http://localhost:8080";
    console.log('entra update user document')
    const user = await userModel.findOne({ _id: uid }).lean();
    if (!user) throw new Error("User not found");
  
    const documents = user.documents ? [...user.documents] : [];
    
    if (files.profile) {
      user.profile = `${http}/src/public/img/profiles/${files.profile[0].filename}`;
    }
  
    const updateDocument = (name, path) => {
      console.log('entra update document')
      const index = documents.findIndex(doc => doc.name === name);
      console.log(index)
      const documentData = {
        name: name,
        reference: path,
      };
      if (index !== -1) {
        documents[index] = documentData;
      } else {
        documents.push(documentData);
      }
    };
  
    if (files.identification) {
      const path = `${http}/src/public/img/documents/${files.identification[0].filename}`;
      updateDocument("identification", path);
    }
  
    if (files.account_state) {
      const path = `${http}/src/public/img/documents/${files.account_state[0].filename}`;
      updateDocument("account_state", path);
    }
  
    if (files.address) {
      const path = `${http}/src/public/img/documents/${files.address[0].filename}`;
      updateDocument("address", path);
    }
  
    const result = await userModel.updateOne({ _id: uid }, { $set: { documents: documents } });
    console.log(result)
    return result;
  };
  
}