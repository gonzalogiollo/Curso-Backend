import jwt from 'jsonwebtoken';

export default current = async(req,res) =>{
  const cookie = req.cookies['coderCookie']
  const user = jwt.verify(cookie,'tokenSecretJWT');
  if(user)
      return res.send({status:"success",payload:user})
}